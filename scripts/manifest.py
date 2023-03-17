""" 根据metadata修改manifest.json """


import json
import os

from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

PLATFORM = os.getenv("COMPILE_PLATFORM", "welearn")


META: dict

with open("metadata.json", "r", encoding="utf-8") as f:
    META = json.load(f)


PROJECT = META["projects"][PLATFORM]

with open("scripts/manifest.template.json", "r", encoding="utf-8") as f:
    manifest = json.load(f)
    manifest["version"] = PROJECT["version"]
    manifest["name"] = PROJECT["name"]
    manifest["description"] = PROJECT["description"]
    manifest["homepage_url"] = META["homepage"]
    manifest["browser_action"]["default_title"] = PROJECT["name"]
    manifest["content_scripts"][0]["matches"] = PROJECT["matches"]
    manifest["permissions"] = [
        "storage",
        *map(lambda host: f"*://{host}/*", PROJECT["connect"]),
        *PROJECT["matches"],
    ]

    with open("dist/manifest.json", "w", encoding="utf-8") as f2:
        f2.write(json.dumps(manifest, indent=4, ensure_ascii=False))
