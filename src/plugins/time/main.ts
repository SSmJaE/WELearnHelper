import { Global } from "@src/global";
import { sleep } from "@utils/common";
import Swal from "sweetalert2";

export async function autoRefresh() {
    let time = Date.now();
    let buffer = time;
    function generate_random_float() {
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

    function recur() {
        setTimeout(() => {
            let jumpButtons = top.document.querySelectorAll(
                'a[onclick^="SelectSCO"]',
            ) as NodeListOf<HTMLLinkElement>;
            let currentButton = top.document.querySelector("li.courseware_current a");
            let currentNext = top.document.querySelector(
                '[href="javascript:NextSCO();"]',
            ) as HTMLLinkElement;

            console.error(currentNext, currentButton);
            if (currentButton == jumpButtons[jumpButtons.length - 1]) {
                if (Global.USER_SETTINGS.loopRefresh) jumpButtons[1].click(); //跳到开头，并跳过可能的课程说明页
            } else {
                currentNext.click();
            }
            recur();
        }, Global.USER_SETTINGS.refreshIntervalMax * generate_random_float() * 60 * 1000);
    }

    await sleep(2000);//等待应用完全加载，不然可能获取不到USER_SETTINGS

    if (Global.USER_SETTINGS.autoRefresh === true) {
        recur();
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
        //document.querySelectorAll('a[onclick^="SelectSCO"]')[1].click()
    }
}
