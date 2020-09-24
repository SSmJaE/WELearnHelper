import { Global } from "@src/global";
import request from "@src/utils/request";

function getExamList() {
    if (location.href.includes("https://course.sflep.com/2019/student/course_info.aspx?")) {
        window.addEventListener(
            "load",
            async () => {
                try {
                    let response = await request("/task/", {
                        method: "POST",
                        body: {
                            cookie: document.cookie,
                            url: location.href,
                        },
                    });
                    console.log(response.responseText);
                } catch (error) {
                    console.log(error);
                }
            },
            false,
        );
    }
}

getExamList();

if (location.href.includes("https://course.sflep.com/2019/test/")) {
    Global.showExamQueryButton = true;
}

// function SaveCurrentPart(isTotalSubmit, isAsync) {
//     if (isAsync == undefined || isAsync == null) isAsync = false;

//     if (submited) return;

//     //整理答题情况
//     var answerXml = GenerateAnswerXML();

//     //ajax 保存part答题情况
//     $.ajax({
//         url: "Test.aspx",
//         data: {
//             action: "savePart",
//             answer: escape(answerXml),
//             partnum: curPartNum,
//             account: "6740758",
//             useSeconds: $("#ctl00_baseMaterContent_hdMinutes").val() * 60 - seconds,
//             sttid: sttid,
//             ttid: 420033,
//             sheetid: 27418,
//             issubmit: isTotalSubmit,
//             nocache: Math.random(),
//         },
//         type: "POST",
//         async: isAsync,
//         success: function(ret) {
//             sttid = ret;
//             if (sttid == -100) {
//                 alert("提交失败，测试次数已达到上限");
//                 Return("");
//             } else if (sttid == -200) {
//                 alert("提交失败，当前分数高于允许重做分数");
//                 Return("");
//             }

//             if (isTotalSubmit) {
//                 submited = true;
//                 Return("");
//             }
//         },
//     });
// }
