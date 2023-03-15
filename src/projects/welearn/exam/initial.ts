import { store } from "@src/store";
import { WELearnAPI } from "@api/welearn";
import { getAnswers, isFinished } from "./parser";
import { hackPlaySound } from "./utils";

if (location.href.includes(".sflep.com/test/")) {
    // store.showExamQueryButton = true;

    setTimeout(() => {
        if (isFinished()) {
            getAnswers();
        } else {
            if (store.userSettings.infiniteListening) {
                hackPlaySound();
            }
        }
    }, 5000);
}

if (location.href.includes(".sflep.com/student/course_info.aspx?")) {
    // store.showExamUploadButton = true;

    WELearnAPI.upload();
}
