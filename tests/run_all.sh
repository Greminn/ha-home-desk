#!/bin/bash
# Run every test suite and say plainly if any failed (piping a test into `tail` hides its exit code).
# Needs python3 and uv. No Home Assistant install and no private data.
cd "$(dirname "$0")/.." || exit 1
fail=0
run() { out=$("$@" 2>&1); code=$?; echo "$code  ${*: -1}  -> $(echo "$out" | tail -1 | cut -c1-60)"; [ $code -ne 0 ] && { fail=1; echo "$out" | tail -15; }; }
run python3 -I tests/test_storage.py
run python3 -I tests/test_matching.py
run uv run --with pyyaml python tests/test_agent.py
run uv run --with voluptuous python tests/test_api.py
run uv run --with "mcp<2" python tests/test_mcp.py
run uv run --with aiohttp python tests/test_attachments.py
run python3 -I tests/test_runner.py
run python3 -I tests/test_backup.py
run python3 -I tests/test_security.py
echo "fail=$fail"
exit $fail
