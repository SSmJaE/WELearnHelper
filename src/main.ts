import "@assets/iconfont/iconfont.css";

//设置应该是最先导入的，有很多功能都是基于设置动态变化的
import { Global, DEBUG_MODE } from "./global";
import { controlCenter, setDefaultValues, mergeSettings } from "./settings";

(async () => {
    //每次启动都会初始化USER_SETTINGS，所以需要先集成所有设置，因为是根据设置设定前者的默认值
    const { pluginSettings } = await import("./plugins/index");
    mergeSettings(controlCenter, pluginSettings);

    await new Promise((resolve) => {
        if (!DEBUG_MODE) {
            Global.USER_SETTINGS = JSON.parse(GM_getValue("USER_SETTINGS", "{}"));
            setDefaultValues(controlCenter);
        }
        resolve();
    });

    //应用所有插件的初始化执行
    import("@plugins/initial");
})();

//应用全局初始化
import "./initial";

import Vue from "vue";

//注册vue水波纹效果
import Ripple from "vue-ripple-directive";
Vue.directive("ripple", Ripple);

import { makeDraggable } from "./utils/common";

import Panel from "./views/panel.vue";
import Setting from "./views/setting.vue";

if (
    DEBUG_MODE ||
    location.href.includes("centercourseware.sflep.com") || //练习答题页面
    location.href.includes("courseappserver.sflep.com/2019/test/") || //考试答题页面
    location.href.includes("courseappserver.sflep.com/2019/student/course_info.aspx?") //基准页面
) {
    if (!document.querySelector("#welearn-helper")) {
        //这部分相当于创建了一个原生页面
        let container = document.createElement("div");
        container.innerHTML = `
        <div id="welearn-helper">
            <div id="container-title">WELearn Helper</div>
            <div id="container-panel"></div>
        </div>
        <div id="container-setting-base"></div>
        `;
        document.body.appendChild(container);

        const title = document.querySelector("#container-title") as HTMLElement;
        title.addEventListener(
            "dblclick",
            () => {
                Global.collapse = true;
            },
            false,
        );

        //应用拖动
        makeDraggable(title, <HTMLElement>document.querySelector("#welearn-helper"));

        new Vue(Panel).$mount("#welearn-helper #container-panel");
        new Vue(Setting).$mount("#container-setting-base");
    }
}
