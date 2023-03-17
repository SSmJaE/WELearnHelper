import json
import os

from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

PLATFORM = os.getenv("COMPILE_PLATFORM", "welearn")


META: dict

with open("metadata.json", "r", encoding="utf-8") as f:
    META = json.load(f)


PROJECT = META["projects"][PLATFORM]

# print(PROJECT)

# 根据metadata修改package.json

PACKAGE: dict

with open("package.json", "r", encoding="utf-8") as f:
    package = json.load(f)


with open("package.json", "w", encoding="utf-8") as f:
    package["version"] = PROJECT["version"]
    json.dump(package, f, indent=4, ensure_ascii=False)


# 根据metadata修改manifest.json

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

# 根据metadata修改生成userscript的header
# 这个直接让vite-plugin-monkey来做
