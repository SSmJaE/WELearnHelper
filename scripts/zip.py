"""
自动压缩dist中，打包chrome扩展版时生成的文件
"""

import json
import os
from zipfile import ZipFile, ZIP_DEFLATED

VERSION: str
with open("package.json", "r", encoding="utf8") as f:
    PACKAGE = json.load(f)
    VERSION = PACKAGE["version"]


with ZipFile(f"./dist/WELearnHelper{VERSION}.crx.zip", "w", ZIP_DEFLATED) as zf:
    for file_ in os.listdir("dist"):
        if not file_.endswith(".zip"):
            path = os.path.join("dist", file_)
            zf.write(path, file_)

