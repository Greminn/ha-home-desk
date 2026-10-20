"""Static checks on websocket_api.py that keep a new command from quietly opening something up. No Home Assistant needed.

1. Every websocket command is admin-only unless it is on the short list of commands a household user may use.
2. Every schema field has a size limit: no bare `str` and no bare list, only the bounded helpers (_SHORT, _TITLE, _LONG, _items).
3. A handler that catches every exception never sends the raw exception text to the browser.

Run:  python3 -I tests/test_security.py
"""
import ast
from pathlib import Path

SOURCE = Path(__file__).resolve().parents[1] / "custom_components" / "home_desk" / "websocket_api.py"

# What a household (non-admin) user may call, and why. The handlers themselves narrow it further: `list` returns only the
# caller's own tickets, and `create` drops the priority and most labels. Everything else needs require_admin.
OPEN_TO_HOUSEHOLD = {
    "home_desk/list": "their own tickets only",
    "home_desk/create": "raise a ticket (the report form); priority and most labels are stripped",
    "home_desk/labels": "the report form offers the labels a household user may pick",
    "home_desk/categories": "read-only; the report form can show the categories",
}


def _decorators(fn):
    return [ast.unparse(d) for d in fn.decorator_list]


def _command_type(fn):
    """The "home_desk/..." name from the websocket_command schema, or None."""
    for d in fn.decorator_list:
        if "websocket_command" not in ast.unparse(d) or not isinstance(d, ast.Call):
            continue
        for node in ast.walk(d.args[0]):
            if isinstance(node, ast.Dict):
                for key, value in zip(node.keys, node.values):
                    if isinstance(key, ast.Call) and ast.unparse(key) in ('vol.Required("type")', "vol.Required('type')"):
                        return value.value
    return None


def _commands(tree):
    return [n for n in tree.body if isinstance(n, (ast.AsyncFunctionDef, ast.FunctionDef)) and _command_type(n)]


def main():
    tree = ast.parse(SOURCE.read_text())
    commands = _commands(tree)
    assert len(commands) >= 25, f"found only {len(commands)} websocket commands: has the decorator form changed?"

    # ---- 1. admin gating
    open_found = set()
    for fn in commands:
        kind = _command_type(fn)
        admin = any("require_admin" in d for d in _decorators(fn))
        if kind in OPEN_TO_HOUSEHOLD:
            open_found.add(kind)
            assert not admin, f"{kind} is on the household list but is admin-only: update OPEN_TO_HOUSEHOLD"
        else:
            assert admin, f"{kind} ({fn.name}) can be called by any logged-in user: add @websocket_api.require_admin, or add it to OPEN_TO_HOUSEHOLD with a reason"
    assert open_found == set(OPEN_TO_HOUSEHOLD), f"listed as open but not found: {set(OPEN_TO_HOUSEHOLD) - open_found}"
    print(f"admin gating ok ({len(commands)} commands, {len(open_found)} open to households)")

    # ---- 2. every schema field has a size limit
    for fn in commands:
        for d in fn.decorator_list:
            if not (isinstance(d, ast.Call) and "websocket_command" in ast.unparse(d)):
                continue
            for node in ast.walk(d.args[0]):
                if isinstance(node, ast.Dict):
                    for key, value in zip(node.keys, node.values):
                        field = ast.unparse(key)
                        if 'Required("type")' in field:
                            continue
                        assert not (isinstance(value, ast.Name) and value.id == "str"), f"{_command_type(fn)}: {field} is a bare str: use _SHORT, _TITLE or _LONG"
                        assert not isinstance(value, ast.List), f"{_command_type(fn)}: {field} is an unbounded list: use _items(...)"
                        if isinstance(value, ast.Call) and ast.unparse(value.func) == "vol.Any":
                            assert not any(isinstance(a, ast.Name) and a.id == "str" for a in value.args), f"{_command_type(fn)}: {field} allows a bare str"
    print("schema limits ok")

    # ---- 3. no raw exception text to the browser
    for fn in commands:
        for node in ast.walk(fn):
            if isinstance(node, ast.ExceptHandler) and isinstance(node.type, ast.Name) and node.type.id == "Exception":
                body = "\n".join(ast.unparse(s) for s in node.body)
                assert f"str({node.name})" not in body, f"{fn.name}: a catch-all handler sends the raw error to the browser: use _client_error"
    print("error messages ok")
    print("ALL OK")


main()
