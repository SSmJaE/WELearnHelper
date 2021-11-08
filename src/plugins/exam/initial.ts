import { store } from "@src/store";
import { Requests } from "@src/utils/requests";
import { getAnswers, isFinished } from "..";
import { hackPlaySound } from "./utils";

if (location.href.includes(".sflep.com/test/")) {
    store.showExamQueryButton = true;

    setTimeout(() => {
        if (isFinished()) {
            getAnswers();
        } else {
            if (store.USER_SETTINGS.infiniteListening) {
                hackPlaySound();
            }
        }
    }, 5000);
}

if (location.href.includes(".sflep.com/student/course_info.aspx?")) {
    store.showExamUploadButton = true;

    Requests.upload();
}
