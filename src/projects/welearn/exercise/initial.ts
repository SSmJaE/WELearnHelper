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

    // 页面刷新时，会自动销毁，所以这里不主动处理也没啥问题
    setInterval(watcher, 200);
    initialCourseCatalog();
}
