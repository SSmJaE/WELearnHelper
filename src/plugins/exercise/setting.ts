const SETTINGS: SectionSetting[] = [
    {
        title: "练习",
        display: true,
        settings: [
            {
                id: "showReference",
                name: "显示参考",
                type: "switch",
                default: true,
                description: "是否显示听力、口语参考(适用视听说)",
            },
            {
                id: "autoSolve",
                name: "自动答题",
                type: "switch",
                default: false,
                description: "自动答题开关",
            },
            {
                id: "solveInterval",
                name: "答题间隔",
                default: 1000,
                valueType: "number",
                description: "单位毫秒；自动答题间隔",
            },
            {
                id: "defaultBlankAnswer",
                name: "默认填空",
                default: "Default answer.",
                valueType: "string",
                description: "填空题没有固定|正确答案时，填入的默认值",
            },
        ],
    },
];

export default SETTINGS;
