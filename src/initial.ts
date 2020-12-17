import { DEBUG_MODE } from "./global";
import Swal from "sweetalert2";

//用户协议
if (/\.sflep\.com/.test(location.href)) {
    if (!DEBUG_MODE) {
        let status = eval(GM_getValue("acceptAgreement", "false"));

        if (!status) {
            Swal.fire({
                title: "使用须知",
                width: 700,
                html: `
                <div style="text-align: left;">
                    <li>本脚本仅供个人学习交流使用，勿用于任何违法与商业行为</li>
                    <li>本脚本完全开源免费，基于GPL3.0，欢迎一起<a href="https://github.com/SSmJaE/WELearnHelper" target="_blank">开发</a></li>
                    <li>因使用本脚本造成的任何问题，均由使用者本人承担</li>
                    <li>反馈问题请带截图 + 题目链接 + 具体描述</li>
                </div>
                `,
                icon: "warning",
                confirmButtonText: "接受",
                allowOutsideClick: false,
                showCancelButton: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "使用提示",
                        width: 700,
                        html: `
                        <div style="text-align: left;">
                            <li>此处仅包含部分使用方法，详情请自行阅读安装页面</li>
                            <li>点击齿轮进行功能设定</li>
                            <li>左键按住“WELearn Helper”方可拖动悬浮窗</li>
                            <li>双击“WELearn Helper”展开悬浮窗</li>
                        </div>
                        `,
                        icon: "info",
                    });

                    GM_setValue("acceptAgreement", "true");
                }
            });
        }
    }
}
