import { SectionSetting } from "@/src/utils/setting";

export interface IWELearnTimeSettings {
    autoRefresh: boolean;
    loopRefresh: boolean;
    randomRefresh: boolean;
    refreshIntervalMin: number;
    refreshIntervalMax: number;
}

export const WELearnTimeSettings: SectionSetting<IWELearnTimeSettings>[] = [
    {
        title: "时长相关",
        settings: [
            {
                id: "autoRefresh",
                name: "自动挂机",
                // type: "switch",
                default: false,
                valueType: "boolean",
                description: "是否定时切换下一页，仅用于刷时长",
            },
            {
                id: "loopRefresh",
                name: "循环挂机",
                // type: "switch",
                default: false,
                valueType: "boolean",
                description: "一遍刷完，是否跳转到开头；自动跳过封锁章节",
            },
            {
                id: "randomRefresh",
                name: "随机延时",
                // type: "switch",
                default: false,
                valueType: "boolean",
                description: "关闭将以上限为切换时长，开启将取上下限区间内随机时长",
            },
            {
                id: "refreshIntervalMin",
                name: "切换下限",
                default: 5,
                valueType: "number",
                description: "单位分钟；we learn允许一个页面最多挂30分钟，所以不要大于30",
            },
            {
                id: "refreshIntervalMax",
                name: "切换上限",
                default: 10,
                valueType: "number",
                description: "单位分钟",
            },
        ],
    },
];
