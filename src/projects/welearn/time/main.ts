// import Swal from "sweetalert2";
import { DEBUG_MODE, store } from "@src/store";
import { getValue, setValue } from "@utils/polyfill";

let time = Date.now();
let buffer = time;
function generateRandomInterval() {
    let rate = 1;
    const { randomRefresh, refreshIntervalMin, refreshIntervalMax } = store.userSettings;

    if (randomRefresh) {
        rate = Math.random();
        let currentRate = refreshIntervalMin / refreshIntervalMax;
        if (rate < currentRate) rate = currentRate;
    }

    if (DEBUG_MODE) {
        console.log(refreshIntervalMax * rate * 60 * 1000);
        console.log(Date.now() - buffer);
        console.log(Date.now() - time);
        buffer = Date.now();
    }

    return rate;
}

function nextChapter() {
    const topWindow = top as Window;

    const jumpButtons =
        topWindow.document.querySelectorAll<HTMLLinkElement>('a[onclick^="SelectSCO"]');
    const currentButton = topWindow.document.querySelector("li.courseware_current a");
    // const currentNext = topWindow.document.querySelector(
    //     '[href="javascript:NextSCO();"]',
    // ) as HTMLLinkElement;

    if (currentButton == jumpButtons[jumpButtons.length - 1]) {
        if (store.userSettings.loopRefresh) {
            jumpButtons[1].click(); //跳到开头，并跳过可能的课程说明页
        }
    } else {
        // currentNext.click();
        NextSCO();
    }
}

async function notify() {
    let status = await getValue("hasInformed", false);
    if (!status) {
        // Swal.fire({
        //     title: "挂机(时长)提示",
        //     text: "如果将浏览器置于后台，不一定能自动切换页面",
        //     icon: "info",
        //     confirmButtonText: "了解",
        // });
        await setValue("hasInformed", true);
    }
}

function recur() {
    setTimeout(() => {
        nextChapter();
        recur();
    }, store.userSettings.refreshIntervalMax * generateRandomInterval() * 60 * 1000);
}

export async function autoRefresh() {
    if (store.userSettings.autoRefresh) {
        recur();
        notify();
    }
}
