import { store } from "@src/store";
import logger from "@utils/logger";

/**
 * 替换原生的playSound函数，以实现无限播放听力
 */
export function hackPlaySound() {
    ((unsafeWindow || window) as any).PlaySound = (src: string, id: string) => {
        //clearTimeout(bufferingTimer);

        // var remainCount = 3;
        // if (paperAnswer && paperAnswer[id]) {
        //     try {
        //         remainCount = parseInt(paperAnswer[id].value);
        //     } catch (e) {}
        // }

        // if (remainCount <= 0) return;

        if (soundPlayer) {
            soundPlayer.stop();
            try {
                jwplayer("soundplayer").remove();
            } catch (e) {}
        }
        // SetCurrentSoundInfo();

        currentSoundId = id;
        const soundfile = testEnv.resPath + "sound/" + src;

        soundPlayer = jwplayer("soundplayer").setup({
            flashplayer: "script/jwplayer.flash.swf?c=" + Math.random(),
            file: soundfile,
            height: 0,
            width: 0,
            primary: "html5",
        });
        soundPlayer.play();

        // soundPlayer.onBufferFull(function () {
        //     SetCurrentSoundInfo();
        // });

        // $("#btnPlay_" + currentSoundId).html(
        //     '<span class=" fa fa-play-circle play_symble">正在加载</span>',
        // );
        // $("#btnPlay_" + currentSoundId).addClass("loading");

        // remainCount--;
        // autoSaveSound(currentSoundId, remainCount);

        //if (remainCount <= 0)
        //    sp.attr("href", "javascript:void(0);");
    };
}
