import "@src/projects/welearn/initial";
import "@icon-park/react/styles/index.css";

import React from "react";
import { createRoot } from "react-dom/client";

import logger from "./utils/logger";
import { initialUserSettings } from "./utils/setting";
import App from "./views/App";

const EXTENSION_ID = "eocs-helper";

const availableUrls = [
    ".sflep.com/student/course_info.aspx?", //基准页面
    "centercourseware.sflep.com", //练习答题页面，子页面
    ".sflep.com/test/", //考试答题页面
];

function initialize() {
    // 有时可能练习页面会嵌套一个iframe，所以需要判断一下，避免同时出现两个实例
    let isAvailable = false;
    for (const url of availableUrls) {
        if (location.href.includes(url)) {
            isAvailable = true;
            break;
        }
    }

    if (!isAvailable) {
        logger.debug("not in eocs page");
        return;
    }

    // 这个是有时候，页面并没有整体刷新，只是替换了页面的内容，比如基于angular的情况；
    // 但是会再次触发脚本，所以需要判断一下
    if (document.querySelector(`#${EXTENSION_ID}`)) {
        logger.debug("already initialized");
        return;
    }

    createRoot(
        (() => {
            const app = document.createElement("div");
            app.id = EXTENSION_ID;
            document.body.append(app);
            return app;
        })(),
    ).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
}

(async function () {
    await initialUserSettings();
    initialize();
})();
