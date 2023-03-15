import logger from "@/src/utils/logger";
import { store } from "@store";
import { determineCourseType, initialCourseCatalog } from "./main";

if (location.href.includes("centercourseware.sflep.com")) {
    let bufferUrl = "";

    function watcher() {
        let currentUrl = location.href;
        logger.debug(currentUrl);

        if (currentUrl != bufferUrl) {
            store.clearLogs();
            determineCourseType(currentUrl);
        }
        bufferUrl = currentUrl;
    }

    setInterval(watcher, 200);
    initialCourseCatalog();
}
