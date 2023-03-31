""" 根据metadata修改manifest.json """


import json
import os
import shutil

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
    manifest["action"]["default_title"] = PROJECT["name"]
    manifest["content_scripts"][0]["matches"] = PROJECT["matches"]
    manifest["host_permissions"] = [
        *map(lambda host: f"*://{host}/*", PROJECT["connect"]),
        *PROJECT["matches"],
    ]

    manifest["content_security_policy"]["extension_pages"] = (
        "default-src 'self'; " + # chrome强制要求，edge不需要
        "script-src 'self'; " +
        f"connect-src {' '.join(map(lambda host: 'http://'+host, PROJECT['connect']))};"
    )


    with open("scripts/manifest.json", "w", encoding="utf-8") as f2:
        f2.write(json.dumps(manifest, indent=4, ensure_ascii=False))

shutil.copyfile("scripts/manifest.json", "dist/manifest.json")
shutil.copyfile(f"static/{PLATFORM}.png", "dist/icon.png")
