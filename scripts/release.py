import os
import re
import shutil

for file_ in os.listdir('dist'):
    if re.search(r"WELearnHelper\d+\.\d+\.\d+\.user.js", file_):
        absolutePath = os.path.join("dist", file_)
        latestName = re.sub(r"\d+\.\d+\.\d+", ".latest", file_)
        targetPath = os.path.join("build", latestName)
        shutil.copy(absolutePath, targetPath)
