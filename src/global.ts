interface Message {
    info: string;
    type: string;
}

export interface Setting {
    userAccount?: string;
    userPoints?: number;
    autoCopy?: boolean;
    autoSlide?: boolean;
    [propName: string]: any;
}

// export class Global {
//     static messages: Message[] = [];
//     static USER_SETTINGS: Setting = {};
// }
//todo 通过定义一个export default的类，是不是既可以保留const(普通对象内部无法const)，又可以重新赋值property(顶层导出变量会readonly, 无法重新赋值)?
//todo 普通对象内部确实无法const，不过可以在这个对象的interface中readonly，但是这样要声明两次，不如直接class配合static一步到位
//todo 导出class，绑定到vue的data中，并不能响应式(自动同步变量)，而object的导出可以，那就object吧
//todo 直接new一个Vue实例作为event bus也是可以的，但是不想被框架绑架
interface buffer {
    messages: Message[];
    USER_SETTINGS: Setting;
    collapse: boolean;
    showExamQueryButton: boolean;
    [propName: string]: any;
}

export let Global: buffer = {
    messages: [],
    USER_SETTINGS: {},
    collapse: true,
    showExamQueryButton: false,
};

// *--------------------以下为常量
export let BASE_URL: string | null;
export let DEBUG_MODE: boolean;

if (process.env.NODE_ENV === "development") {
    BASE_URL = "http://localhost:8000/api/welearn";
    DEBUG_MODE = true;
} else {
    // BASE_URL = "http://localhost:8000/api/welearn";
    BASE_URL = "http://47.97.90.127/api/welearn";
    DEBUG_MODE = false;
}

export const VERSION = "0.8.0";
export const QUERY_INTERVAL = 3000; //单位ms
