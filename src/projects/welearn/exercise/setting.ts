import { SectionSetting } from "@utils/setting";

export interface IWELearnExerciseSettings {
    showReference: boolean;
    autoSolve: boolean;
    solveInterval: number;
    defaultBlankAnswer: string;
}

export const WELearnExerciseSettings: SectionSetting<IWELearnExerciseSettings>[] = [
    {
        title: "练习",
        settings: [
            {
                id: "showReference",
                name: "显示参考",
                default: true,
                valueType: "boolean",
                description: "是否显示听力、口语参考(适用视听说)",
            },
            {
                id: "autoSolve",
                name: "自动答题",
                default: false,
                valueType: "boolean",
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
