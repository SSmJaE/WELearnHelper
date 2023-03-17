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


# 根据metadata修改生成userscript的header
# 这个直接让vite-plugin-monkey来做
