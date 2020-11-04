import { autoRefresh } from "./main";

//切换页面的按钮在外部，而不是在iframe内
if (
    location.href.includes("https://course.sflep.com/student/StudyCourse.aspx?") ||
    location.href.includes("https://course.sflep.com/Course/TryCourse.aspx?")
) {
    autoRefresh();
}
