import { clearMessage } from "@src/store/actions";
import { determineCourseType, initialCourseCatalog } from "./main";

if (location.href.includes("centercourseware.sflep.com")) {
    let bufferUrl = "";

    function watcher() {
        let currentUrl = location.href;
        console.log(currentUrl);

        if (currentUrl != bufferUrl) {
            clearMessage();
            determineCourseType(currentUrl);
        }
        bufferUrl = currentUrl;
    }

    setInterval(watcher, 2000);
    initialCourseCatalog();
}
