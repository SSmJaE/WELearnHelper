//此处导出所有插件的设置选项
import examSettings from "./exam/setting";
import exerciseSettings from "./exercise/setting";
import timeSettings from "./time/setting";
export let pluginSettings = [...examSettings, ...exerciseSettings, ...timeSettings];

//在此处暴露需要让上级访问的接口
export * from "./exam/parser";
export * from "./exam/requests";
