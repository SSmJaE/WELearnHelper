// 在此处注册(直接调用)各个插件中，app初始化时要执行的函数
import "./exam/initial";
import "./exercise/initial";
import "./time/initial";

import { WELearnAPI } from "@/src/api/welearn";

WELearnAPI.checkVersion();
