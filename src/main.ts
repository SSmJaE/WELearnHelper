import "@assets/iconfont/iconfont.css";

//设置应该是最先导入的，有很多功能都是基于设置动态变化的
import { Global, DEBUG_MODE } from "./global";
import { controlCenter, setDefaultValues } from "./settings";

if (!DEBUG_MODE) {
    Global.USER_SETTINGS = JSON.parse(GM_getValue("USER_SETTINGS", "{}"));
    setDefaultValues(controlCenter);
}

import "./initial";

import { makeDraggable } from "./utils/common";

import Vue from "vue";

import Ripple from "vue-ripple-directive";
Vue.directive("ripple", Ripple);

import Panel from "./panel.vue";
import Setting from "./setting.vue";

if (
    location.href.includes("centercourseware.sflep.com") || //练习答题页面
    location.href.includes("course.sflep.com/2019/test/") //考试答题页面
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
