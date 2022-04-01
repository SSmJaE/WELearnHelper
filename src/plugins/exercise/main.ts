import { store } from "@src/store";
import { sleep } from "@src/utils/common";
import { addMessage } from "@src/store/actions";

import { MANIFEST, DATA_SOLUTION, ET, READING, APP, UNSOLVED } from "./courses";

import { parseEt } from "./et/parser";
import { solveEt } from "./et/solver";

import { parseManifest } from "./manifest/parser";
import { solveManifest } from "./manifest/solver";
import { parseWordTest } from "./wordTest/parser";

import { parseDataSolution } from "./dataSolution/parser";
import { solveDataSolution } from "./dataSolution/solver";

import { parseReading } from "./reading/parser";
import { Requests } from "@src/utils/requests";

export async function initialCourseCatalog() {
    const catalog = await Requests.getCourseCatalog();

    // 通过perSession装饰器，无法实现客制化的，请求结束后的响应
    // 比如，不用perSession装饰器的话，可以直接把这段逻辑写在getCourseCatalog这个请求里
    // 但是现在，
    // 1.要将合并catalog的逻辑和网络请求的逻辑分开；
    // 2.perSession装饰器必须要返回值，配合requestErrorHandler装饰器使用
    // 所以想要同时实现这两点的话，需要在此处手动判断catalog的返回值是否有效
    // 不想在此处判断的话，就将此处进行的操作，放在getCourseCatalog中即可

    console.log({ catalog });
    if (catalog === undefined) return;

    const { dataSolution, et, manifest, reading, app } = catalog;

    MANIFEST.concat(manifest);
    DATA_SOLUTION.concat(dataSolution);
    ET.concat(et);
    READING.concat(reading);
    APP.concat(app);

    console.log({
        MANIFEST,
        DATA_SOLUTION,
        ET,
        READING,
        APP,
    });
}

const PARSER = new DOMParser();

async function queryData(answerUrl: string) {
    const response = await fetch(answerUrl);
    const text = await response.text();

    let htmlDom = PARSER.parseFromString(text, "text/html");
    // if (DEBUG_MODE)
    console.log(htmlDom);
    return htmlDom;
}

async function queryManifest(manifestUrl: string, identifier: string, courseInfo: string) {
    const response = await fetch(manifestUrl);
    const text = await response.text();

    let selector = `resource[identifier="${identifier}"] file`;
    let resource = PARSER.parseFromString(text, "text/html")!
        .querySelector(selector)!
        .getAttribute("href");
    let answerUrl = `https://centercourseware.sflep.com/${courseInfo}/${resource}`;
    return queryData(answerUrl);
}

async function outputAnswers(answers: Answer[]) {
    let bufferTag = "";
    for (const answer of answers) {
        if (store.USER_SETTINGS.autoSolve) {
            await sleep(store.USER_SETTINGS.solveInterval);
        }

        addMessage(`${String(answer.index).padStart(2, "0")}、${answer.text}`);

        const currentTag = answer.element.tagName;
        if (bufferTag !== "" && currentTag !== bufferTag) {
            addMessage("", "hr");
            bufferTag = currentTag;
        }
    }
}

export async function determineCourseType(iframeUrl: string) {
    let courseInfo = /com\/(.*?)\//.exec(iframeUrl)![1];
    courseInfo = decodeURI(courseInfo);
    console.log(courseInfo);

    let identifier: string | undefined = undefined;
    try {
        identifier = /#(.*)\?/.exec(iframeUrl)![1];
    } catch (error) {}

    let manifestUrl = `https://centercourseware.sflep.com/${courseInfo}/resource/manifest.xml`;
    let answerUrl = `https://centercourseware.sflep.com/${courseInfo}/data${identifier}.html`;
    let dom: Document;
    let answers: Answer[] = [];

    if (MANIFEST.includes(courseInfo)) {
        //需要查询名单
        dom = await queryManifest(manifestUrl, identifier as string, courseInfo);

        answers = parseManifest(dom);
        if (document.querySelector('div[id^="word"]')) parseWordTest();

        if (store.USER_SETTINGS.autoSolve) solveManifest(answers);
    } else if (ET.includes(courseInfo)) {
        dom = await queryData(answerUrl);

        answers = parseEt(dom);
        if (store.USER_SETTINGS.autoSolve) solveEt(answers);
    } else if (DATA_SOLUTION.includes(courseInfo)) {
        //直接在原始页面查找
        setTimeout(() => {
            answers = parseDataSolution();

            console.log(answers);
            outputAnswers(answers);

            if (store.USER_SETTINGS.autoSolve) solveDataSolution(answers);
        }, 2000);
    } else if (READING.includes(courseInfo)) {
        let answerUrl =
            location.href.split("&")[0].replace("web.html?courseurl=", "data/") + ".xml";
        dom = await queryData(answerUrl);
        answers = parseReading(dom);
    } else {
        addMessage(`未适配的课程类型，请在Github反馈`, "info");
        addMessage(`注意页面上是否有二维码，且注明需在app中使用，这种题型只能用app`, "info");
        addMessage(`${courseInfo}`, "info");
        console.log("未处理的课程类型");
        console.log(courseInfo);
        console.log(identifier);
        // add_to_container("", document.querySelectorAll(".daan"));
        // add_to_container("", document.querySelectorAll(".tianking .tl_daan"));
    }

    console.log(answers);
    outputAnswers(answers);
}
