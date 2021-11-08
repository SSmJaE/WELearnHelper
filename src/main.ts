//导入iconfont
import "@assets/iconfont/iconfont.css";

import { initialUserSettings } from "@utils/settings";
//先初始化USER_SETTINGS，再应用所有插件的初始化(依赖USER_SETTINGS)
initialUserSettings().then(() => import("@plugins/initial"));

//应用全局初始化(全局初始化不依赖USER_SETTINGS)
import "@src/initial";

//创建窗口
import "@utils/container";
