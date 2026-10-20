"""Fail if the version is not the same everywhere it is written: the integration manifest, the panel's package.json and the
committed build info. Run from anywhere:  python3 tools/check_versions.py"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
places = {
    "custom_components/home_desk/manifest.json": json.loads((ROOT / "custom_components/home_desk/manifest.json").read_text())["version"],
    "frontend/package.json": json.loads((ROOT / "frontend/package.json").read_text())["version"],
    "custom_components/home_desk/www/home-desk-panel.build.json": json.loads((ROOT / "custom_components/home_desk/www/home-desk-panel.build.json").read_text())["version"],
}
for where, version in places.items():
    print(f"{version:>14}  {where}")
if len(set(places.values())) != 1:
    sys.exit("The versions disagree: set them all to the same value (and rebuild the panel).")
print("versions agree")
