import { CONSTANT, store } from "@src/store";
import { sleep } from "@utils";
// import {  } from "@src/store/actions";

import logger from "@utils/logger";

import { MANIFEST, DATA_SOLUTION, ET, READING, APP, UNSOLVED } from "./courses";

import { parseEt } from "./et/parser";
import { solveEt } from "./et/solver";

import { parseManifest } from "./manifest/parser";
import { solveManifest } from "./manifest/solver";
import { parseWordTest } from "./wordTest/parser";

import { parseDataSolution } from "./dataSolution/parser";
import { solveDataSolution } from "./dataSolution/solver";

import { parseReading } from "./reading/parser";
import { WELearnAPI } from "@api/welearn";

export async function initialCourseCatalog() {
    const catalog = await WELearnAPI.getCourseCatalog();

    // 通过perSession装饰器，无法实现客制化的，请求结束后的响应
    // 比如，不用perSession装饰器的话，可以直接把这段逻辑写在getCourseCatalog这个请求里
    // 但是现在，
    // 1.要将合并catalog的逻辑和网络请求的逻辑分开；
    // 2.perSession装饰器必须要返回值，配合requestErrorHandler装饰器使用
    // 所以想要同时实现这两点的话，需要在此处手动判断catalog的返回值是否有效
    // 不想在此处判断的话，就将此处进行的操作，放在getCourseCatalog中即可

    logger.debug({ catalog });
    if (catalog === undefined) return;

    const { dataSolution, et, manifest, reading, app } = catalog;

    MANIFEST.push(...manifest);
    DATA_SOLUTION.push(...dataSolution);
    ET.push(...et);
    READING.push(...reading);
    APP.push(...app);

    logger.debug({
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
    logger.debug(htmlDom);
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

export interface Answer {
    text: string;
    type: string;
    element: HTMLElement;
    index: number;
    [prop: string]: any;
}

async function outputAnswers(answers: Answer[]) {
    let bufferTag = "";
    for (const answer of answers) {
        if (store.userSettings.autoSolve) {
            // await sleep(store.userSettings.solveInterval);
        }

        logger.question({
            content: {
                order: `${String(answer.index).padStart(2, "0")}`,
                info: {
                    content: "标答",
                },
                answerText: answer.text,
                raw: {
                    element: answer.element,
                },
                solve: {
                    couldSolve: true,
                    hasSolved: true,
                    solveThis: async () => {
                        logger.debug("solve this");
                    },
                },
            },
        });

        const currentTag = answer.element.tagName;
        if (bufferTag !== "" && currentTag !== bufferTag) {
            logger.hr();
            bufferTag = currentTag;
        }

        await sleep(CONSTANT.QUERY_INTERVAL);
    }
}

export async function determineCourseType(iframeUrl: string) {
    let courseInfo = /com\/(.*?)\//.exec(iframeUrl)![1];
    courseInfo = decodeURI(courseInfo);
    logger.debug(courseInfo);

    let identifier: string | undefined = undefined;
    try {
        identifier = /#(.*)\?/.exec(iframeUrl)![1];
    } catch (error) {}

    let manifestUrl = `https://centercourseware.sflep.com/${courseInfo}/resource/manifest.xml`;
    let answerUrl = `https://centercourseware.sflep.com/${courseInfo}/data${identifier}.html`;
    let dom: Document;
    let answers: Answer[] = [];

    let hasAnswer = false;

    if (MANIFEST.includes(courseInfo)) {
        //需要查询名单
        dom = await queryManifest(manifestUrl, identifier as string, courseInfo);

        answers = parseManifest(dom);
        if (document.querySelector('div[id^="word"]')) parseWordTest();

        if (store.userSettings.autoSolve) solveManifest(answers);
    } else if (ET.includes(courseInfo)) {
        dom = await queryData(answerUrl);

        answers = parseEt(dom);
        if (store.userSettings.autoSolve) solveEt(answers);
    } else if (DATA_SOLUTION.includes(courseInfo)) {
        //直接在原始页面查找
        setTimeout(() => {
            answers = parseDataSolution();

            logger.debug(answers);

            if (answers.length) {
                outputAnswers(answers);
                if (store.userSettings.autoSolve) solveDataSolution(answers);
            } else {
                // 两种情况(同步 + 此处的timeout)都没有答案
                if (!hasAnswer) {
                    logger.info({ content: "此页面已适配，无答案" });
                }
            }
        }, 2000);
    } else if (READING.includes(courseInfo)) {
        let answerUrl =
            location.href.split("&")[0].replace("web.html?courseurl=", "data/") + ".xml";
        dom = await queryData(answerUrl);
        answers = parseReading(dom);
    } else {
        logger.info({ content: `未适配的课程类型，请在Github反馈` });
        logger.info({ content: `${courseInfo}` });
        logger.info({ content: `注意页面上是否有二维码，且注明需在app中使用，这种题型只能用app` });
        logger.debug("未处理的课程类型");
        logger.debug(courseInfo);
        logger.debug(identifier);
        // add_to_container("", document.querySelectorAll(".daan"));
        // add_to_container("", document.querySelectorAll(".tianking .tl_daan"));
    }

    logger.debug(answers);

    if (answers.length) {
        hasAnswer = true;
        outputAnswers(answers);
    }
}
