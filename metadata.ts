export default {
    apiServer: "http://47.100.166.53/api/welearn",
    projects: {
        welearn: {
            title: "随行课堂网课助手",
            version: "1.0.0",
            matches: [
                "*://course.sflep.com/*",
                "*://welearn.sflep.com/*",
                "*://courseappserver.sflep.com/*",
                "*://centercourseware.sflep.com/*",
            ],
        },
        tsinghua: {
            title: "清华社网课助手",
            version: "0.1.0",
            matches: [],
        },
    },
};
