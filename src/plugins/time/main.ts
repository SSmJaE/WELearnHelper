import Swal from "sweetalert2";
import { Global } from "@src/global";

let time = Date.now();
let buffer = time;
function generateRandomInterval() {
    let rate = 1;
    if (Global.USER_SETTINGS.randomRefresh) {
        rate = Math.random();
        let currentRate =
            Global.USER_SETTINGS.refreshIntervalMin / Global.USER_SETTINGS.refreshIntervalMax;
        if (rate < currentRate) rate = currentRate;
    }

    if (Global.USER_SETTINGS.debugMode) {
        console.log(Global.USER_SETTINGS.refreshIntervalMax * rate * 60 * 1000);
        console.log(Date.now() - buffer);
        console.log(Date.now() - time);
        buffer = Date.now();
    }

    return rate;
}

function nextChapter() {
    const jumpButtons = top.document.querySelectorAll('a[onclick^="SelectSCO"]') as NodeListOf<
        HTMLLinkElement
    >;
    const currentButton = top.document.querySelector("li.courseware_current a");
    const currentNext = top.document.querySelector(
        '[href="javascript:NextSCO();"]',
    ) as HTMLLinkElement;

    if (currentButton == jumpButtons[jumpButtons.length - 1]) {
        if (Global.USER_SETTINGS.loopRefresh) jumpButtons[1].click(); //跳到开头，并跳过可能的课程说明页
    } else {
        currentNext.click();
    }
}

function notify() {
    let status = eval(GM_getValue("hasInformed", "false"));
    if (!status) {
        Swal.fire({
            title: "挂机提示",
            text: "如果后台显示，不一定能自动切换页面",
            icon: "info",
            confirmButtonText: "了解",
        });
        GM_setValue("hasInformed", true);
    }
}

function recur() {
    setTimeout(() => {
        nextChapter();
        recur();
    }, Global.USER_SETTINGS.refreshIntervalMax * generateRandomInterval() * 60 * 1000);
}

export async function autoRefresh() {
    if (Global.USER_SETTINGS.autoRefresh) {
        recur();
        notify();
    }
}
