import { Global } from "@src/global";
import { hackPlaySound } from "./utils";

if (location.href.includes("https://courseappserver.sflep.com/2019/test/")) {
    Global.showExamQueryButton = true;

    if (Global.USER_SETTINGS.infiniteListening) {
        window.addEventListener(
            "load",
            () => {
                setTimeout(() => {
                    hackPlaySound();
                }, 3000);
            },
            false,
        );
    }
}

if (location.href.includes("https://courseappserver.sflep.com/2019/student/course_info.aspx?")) {
    Global.showExamUploadButton = true;
}
