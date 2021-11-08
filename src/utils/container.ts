import Vue from "vue";

//注册vue水波纹效果
import Ripple from "vue-ripple-directive";
Vue.directive("ripple", Ripple);

import { store } from "@src/store";
import { makeDraggable } from "@utils/common";

import Panel from "@src/views/Panel.vue";
import Setting from "@src/views/Setting.vue";

if (
    location.href.includes("centercourseware.sflep.com") || //练习答题页面，子页面
    location.href.includes(".sflep.com/test/") || //考试答题页面
    location.href.includes(".sflep.com/student/course_info.aspx?") //基准页面
) {
    //避免重复创建悬浮窗，先检测页面上是否已存在
    if (!document.querySelector("#welearn-helper")) {
        //这部分相当于创建了一个原生页面
        let container = document.createElement("div");
        container.innerHTML = `
        <div id="welearn-helper">
            <div id="container-title">WELearn Helper</div>
            <div id="container-panel"></div>
        </div>
        <div id="helper-setting">
            <div id="container-setting-title">设置面板</div>
            <hr />
            <div id="container-setting-base"></div>
        </div>
    `;
        document.body.appendChild(container);

        //实现双击展开
        const title = document.querySelector("#container-title") as HTMLElement;
        title.addEventListener(
            "dblclick",
            () => {
                store.collapse = true;
            },
            false,
        );

        //挂载实例
        new Vue(Panel).$mount("#welearn-helper #container-panel");
        new Vue(Setting).$mount("#container-setting-base");

        //应用拖动
        makeDraggable(title, document.querySelector("#welearn-helper") as HTMLElement);
        makeDraggable(
            document.querySelector("#container-setting-title") as HTMLElement,
            document.querySelector("#helper-setting") as HTMLElement,
        );
    }
}
