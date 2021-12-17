/**这种页面上直接就有答案了，id=hd里面，也就是identifier类型*/
const MANIFEST = [
    "https://centercourseware.sflep.com/new century college english secedition integration 2/unit_01/course/texta.html#c09175d4-f281-488f-83fe-87c6bcf2a2b6?nocache=0.6378400703106109",
    "new century college english secedition integration 1", //新世纪大学英语系列教材（第二版）综合教程第一册
    "new century college english secedition integration 2", //新世纪大学英语系列教材（第二版）综合教程第二册
    "new century college english secedition integration 3", //新世纪大学英语系列教材（第二版）综合教程第三册
    "new century college english secedition integration 4", //新世纪大学英语系列教材（第二版）综合教程第四册
    "https://centercourseware.sflep.com/an integrated skills course (2nd edition) 2 for vocational college english/unit_02/course/listening.html#f248a182-7d3b-4112-86e8-8fca2706c690?nocache=0.3470470678074564",
    "an integrated skills course (2nd edition) 1 for vocational college english", //新标准高职实用综合教程（第2版）第一册
    "an integrated skills course (2nd edition) 2 for vocational college english", //新标准高职实用综合教程（第2版）第二册
    "an integrated skills course (2nd edition) 3 for vocational college english", //新标准高职实用综合教程（第2版）第三册
    "an integrated skills course (2nd edition) 4 for vocational college english", //新标准高职实用综合教程（第2版）第四册
    "https://centercourseware.sflep.com/an integrated skills course 2/unit_07/course/comprehension.html#e2f3d085-ca82-4d79-b31a-1bfe83529d88?nocache=0.5703432807157427",
    "an integrated skills course 1", //新标准高职公共英语系列教材：实用综合教程（精编版）上
    "an integrated skills course 2", //新标准高职公共英语系列教材：实用综合教程（精编版）下
];

/**直接在原始页面上query就可以*/
const DATA_SOLUTION = [
    "https://centercourseware.sflep.com/new progressive college english integrated course 3/unit_01/main10.html?3-1-6&nocache=0.8570993802491391",
    "new progressive college english integrated course 1", //全新版大学进阶英语：综合1
    "new progressive college english integrated course 2", //全新版大学进阶英语：综合2
    "new progressive college english integrated course 3", //全新版大学进阶英语：综合3
    "new progressive college english integrated course 4", //全新版大学进阶英语：综合4
    "//centercourseware.sflep.com/new progressive college english integrated course 1-sz/unit_01/main6.html?1-1-6&nocache=0.08870107701951402",
    "new progressive college english integrated course 1-sz",
    "https://centercourseware.sflep.com/new target college english integrated course 2/unit_05/main.html?2-5-10&nocache=0.7739324146362139",
    "new target college english integrated course 1", //新目标大学英语《综合教程》 第一册；这个是所有页面混杂在一个大页面里的那个
    "new target college english integrated course 2", //新目标大学英语《综合教程》 第二册
    "new target college english integrated course 3", //新目标大学英语《综合教程》 第三册
    "new target college english integrated course 4", //新目标大学英语《综合教程》 第四册
];

/**et类型(url中包含data)理论上可以直接在原始页面上找(Demcorazy就是这么做的)，不过也可以统一通过ajax请求获取*/
const ET = [
    "https://centercourseware.sflep.com/inspire%202/data/1/2-1-2.html",
    "inspire 1", //全新版大学进阶英语：视听说教程1
    "inspire 2", //全新版大学进阶英语：视听说教程2
    "inspire 3", //全新版大学进阶英语：视听说教程3
    "inspire 4", //全新版大学进阶英语：视听说教程4
    "https://centercourseware.sflep.com/New College English Viewing Listening Speaking 3/index.html#/1/1-1-1?nocache=0.2182374709016317",
    "New College English Viewing Listening Speaking 1", //全新版大学英语《视听说教程》1
    "New College English Viewing Listening Speaking 2", //全新版大学英语《视听说教程》2
    "New College English Viewing Listening Speaking 3", //全新版大学英语《视听说教程》3
    "New College English Viewing Listening Speaking 4", //全新版大学英语《视听说教程》4
    "https://centercourseware.sflep.com/New Target College English Video Course 1/index.html#/u1/TO/1-1?nocache=0.2502474772719703", //新目标大学英语视听说教程1
    "New Target College English Video Course 1", //新目标大学英语视听说教程1
    "New Target College English Video Course 2", //新目标大学英语视听说教程2
    "New Target College English Video Course 3", //新目标大学英语视听说教程3
    "New Target College English Video Course 4", //新目标大学英语视听说教程4
    "https://centercourseware.sflep.com/new century college english video thirdedition 1/index.html#/2/1-1-1?nocache=0.3053014048019431",
    "new century college english video thirdedition 1", //新世纪大学英语系列教材（第二版）视听说教程（3rd Edition）1
    "new century college english video thirdedition 2", //新世纪大学英语系列教材（第二版）视听说教程（3rd Edition）2
    "new century college english video thirdedition 3", //新世纪大学英语系列教材（第二版）视听说教程（3rd Edition）3
    "new century college english video thirdedition 4", //新世纪大学英语系列教材（第二版）视听说教程（3rd Edition）4
];

/**泛读课程需要courseInfo和identifier(和et一样)，但是答案是dataSolution那种返回value的*/
const READING = [
    "https://centercourseware.sflep.com/new century extensive reading course for english majors 2/web.html?courseurl=210_01_05_01&nocache=0.2702018071769088",
    "new century extensive reading course for english majors 1", //新世纪英语专业（修订版）泛读教程（第2版）第一册
    "new century extensive reading course for english majors 2", //新世纪英语专业（修订版）泛读教程（第2版）第二册
    "new century extensive reading course for english majors 3", //新世纪英语专业（修订版）泛读教程（第2版）第三册
    "new century extensive reading course for english majors 4", //新世纪英语专业（修订版）泛读教程（第2版）第四册
];

/**必须在手机上做的*/
const APP = [
    "https://centercourseware.sflep.com/Progressive English for Vocational Colleges Integrated Course 2/unit_01/main2.html?2-1-w1&nocache=0.2290241426227977",
    "Progressive English for Vocational Colleges Integrated Course 2", //高职国际进阶英语综合教程2
    "https://centercourseware.sflep.com/Progressive English for Vocational Colleges A Viewing Listening and Speaking Course 2/unit_01/main2.html?2-1-la_1&nocache=0.450784809471354",
    "Progressive English for Vocational Colleges A Viewing Listening and Speaking Course 2", //高职国际进阶英语视听说教程2
    "https://centercourseware.sflep.com/A Viewing Listening and Speaking Course 2/unit_01/main8.html?2-1-7&nocache=0.8280064535686702",
    "A Viewing Listening and Speaking Course 2", //新标准高职公共英语系列教材 实用视听说教程（精编版）
];

//todo (坐等提pr)新世纪大学英语第二版(快速阅读，新世纪写作)
const UNSOLVED = [
    "https://centercourseware.sflep.com/college english skills news report listening/index.html#/2/4-2?nocache=0.7860960277619209",
    "college english skills news report listening", //todo 外教社数字系列还有两本
    "https://centercourseware.sflep.com/listening and speaking course (2nd ed) 3 for vocational college english/unit8/pak22.html?nocache=0.10199328940787433",
    "listening and speaking course (2nd ed) 1 for vocational college english", //新标准高职公共英语系列教材：实用听说教程（第二版）第三册
    "listening and speaking course (2nd ed) 2 for vocational college english", //新标准高职公共英语系列教材：实用听说教程（第二版）第三册
    "listening and speaking course (2nd ed) 3 for vocational college english", //新标准高职公共英语系列教材：实用听说教程（第二版）第三册
    "listening and speaking course (2nd ed) 4 for vocational college english", //新标准高职公共英语系列教材：实用听说教程（第二版）第三册
];

// * -----------------------------------------------------------------------------------------------------------------------------

import { store } from "@src/store";
import { sleep } from "@src/utils/common";
import { addMessage } from "@src/store/actions";

import { parseEt } from "./et/parser";
import { solveEt } from "./et/solver";

import { parseManifest } from "./manifest/parser";
import { solveManifest } from "./manifest/solver";
import { parseWordTest } from "./wordTest/parser";

import { parseDataSolution } from "./dataSolution/parser";
import { solveDataSolution } from "./dataSolution/solver";

import { parseReading } from "./reading/parser";

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
        console.log("未处理的课程类型");
        console.log(courseInfo);
        console.log(identifier);
        // add_to_container("", document.querySelectorAll(".daan"));
        // add_to_container("", document.querySelectorAll(".tianking .tl_daan"));
    }

    console.log(answers);
    outputAnswers(answers);
}
