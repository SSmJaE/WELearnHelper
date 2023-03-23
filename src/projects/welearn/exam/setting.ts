import { SectionSetting } from "@utils/setting";

export interface IWELearnExamSettings {
    infiniteListening: boolean;
}

export const WELearnExamSettings: SectionSetting<IWELearnExamSettings>[] = [
    // {
    //     title: "考试",
    //     settings: [
    //         {
    //             id: "infiniteListening",
    //             name: "无限听力",
    //             default: true,
    //             valueType: "boolean",
    //             description: "允许无限次播放听力音频",
    //         },
    //     ],
    // },
];
