//PlaySound使用的全局变量
// var resPath = "https://courseres.sflep.com/Test/";
// var soundfile = "";
// var bufferingTimer: any;

import { store } from "@src/store";
import { addMessage } from "@src/store/actions";

/**
 * 替换原生的playSound函数，以实现无限播放听力
 */
export function hackPlaySound() {
    /*答卷过程中调用的方法*/
    (unsafeWindow as any).PlaySound = (src: string, id: string) => {
        var count = $("#hdPlay_" + id).val();
        if (count <= 0) return;

        if (soundfile == "") {
            soundfile = resPath + "ItemRes/sound/" + src;
            createSoundPlayer();
        } else {
            soundfile = resPath + "ItemRes/sound/" + src;
            jwplayer("soundplayer").load([{ file: soundfile }]);
        }
        // jwplayer("soundplayer").onPlaylistComplete(function() {
        //     jwplayer("soundplayer").load([{ file: "" }]);
        // });
        jwplayer("soundplayer").onBufferFull(function() {
            clearTimeout(bufferingTimer);

            var sp = $("#btnPlay_" + id);

            sp.html('<span class=" fa fa-play-circle play_symble">' + "无限" + "次播放机会</span>");
            //以下为原生调用
            // if (sp.length > 0) {
            //     var count = $("#hdPlay_" + id).val();
            //     if (count > 0) count--;

            //     //sp.val('播放（' + count + '次机会）');

            //     $("#hdPlay_" + id).val(count);
            //     if (count == 0) {
            //         //$('#btnPlay_' + id).attr("disabled", "disabled");
            //         $("#btnPlay_" + id).attr("href", "javascript:void(0);");
            //     }

            //     // SaveCurrentPart(false, true); //异步保存，实时更新听力次数
            // }

            sp.removeClass("loading");
        });

        $("#btnPlay_" + id).val("正在加载");
        bufferingTimer = setTimeout("PlayerExpireCheck('" + id + "', 0)", 1000);
        $("#btnPlay_" + id).addClass("loading");

        jwplayer("soundplayer").play();
    };
}

export function parseResponse(json: QuestionResponse) {
    console.log(json);

    let status = "";
    switch (json.status) {
        case 0:
            status = "新增收录题目，未收录答案";
            break;
        case 1:
            status = "新增收录题目，且收录答案";
            addMessage(status, "info");
            addMessage(`用户${store.USER_SETTINGS.userAccount}积分+1`, "info");
            break;
        case 2:
            status = "服务器已有题目，新增答案";
            addMessage(status, "info");
            addMessage(`用户${store.USER_SETTINGS.userAccount}积分+1`, "info");
            break;
        case 3:
            status = "服务器已有答案，返回答案";
            break;
        case 4:
            status = "服务器已有题目，没有答案";
            break;
        case 5:
            status = "服务器没有题目，没有答案";
            break;
        case 6:
            status = "没有标答，返回最可能答案";
            break;
    }
    // addMessage(status, "info");

    let answer = json.answer;
    switch (json.status) {
        case 3:
            addMessage(answer as string, "success");
            break;
        case 4:
        //fallthrough
        case 5:
            addMessage("尚未收录答案", "error");
            break;
        case 6:
            for (let [option, possibility] of Object.entries(<string>answer)) {
                addMessage(`${possibility} ${option}`, "success");
            }
    }

    if (store.messages)
        if (store.messages[store.messages.length - 1].info)
            //前一条消息为空不添加
            addMessage("", "hr");
}
