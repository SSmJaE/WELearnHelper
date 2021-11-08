export * as actions from "./actions";

// export class Global {
//     static messages: Message[] = [];
//     static USER_SETTINGS: Setting = {};
// }
// 通过定义一个export default的类，是不是既可以保留const(普通对象内部无法const)，又可以重新赋值property(顶层导出变量会readonly, 无法重新赋值)?
// 普通对象内部确实无法const，不过可以在这个对象的interface中readonly，但是这样要声明两次，不如直接class配合static一步到位
// 导出class，绑定到vue的data中，并不能响应式(自动同步变量)，而object的导出可以，那就object吧
// 直接new一个Vue实例作为event bus也是可以的，但是不想被框架绑架


interface GlobalState {
    /**所有要展示的消息*/
    messages: Message[];
    /**所有全局设置*/
    USER_SETTINGS: UserSettings;
    /**悬浮窗的折叠控制*/
    collapse: boolean;
    /**是否显示与考试相关的按钮*/
    showExamQueryButton: boolean;
    /**是否显示上传答案按钮*/
    showExamUploadButton: boolean;
    // [propName: string]: any;
}

export let store: GlobalState = {
    messages: [],
    USER_SETTINGS: {} as UserSettings,
    collapse: false,
    showExamQueryButton: false,
    showExamUploadButton: false,
};

// *--------------------以下为常量
export let BASE_URL: string | null;
export let DEBUG_MODE: boolean;

if (process.env.NODE_ENV === "development") {
    BASE_URL = "http://localhost:53212/api/welearn";
    // BASE_URL = "http://47.100.166.53/api/unipus";
    DEBUG_MODE = true;
} else {
    BASE_URL = "http://47.100.166.53/api/welearn";
    DEBUG_MODE = false;
}

import * as PACKAGE from "../../package.json";

export const VERSION = PACKAGE.version;
export const QUERY_INTERVAL = 3000; //单位ms
