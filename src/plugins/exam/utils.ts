//PlaySound使用的全局变量
// var resPath = "https://courseres.sflep.com/Test/";
// var soundfile = "";
// var bufferingTimer: any;

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
