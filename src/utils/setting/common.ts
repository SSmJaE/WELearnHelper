import { SectionSetting } from ".";

export interface ICommonSettings {
    userAccount: string;
    userPoints: number;
    autoSlide: boolean;
    enableTyping: boolean;
}

export const commonSettings: SectionSetting<ICommonSettings>[] = [
    {
        title: "用户",
        settings: [
            {
                id: "userAccount",
                name: "身份令牌",
                default: "default",
                valueType: "string",
                description: "随意设定，累计每个人贡献的题目数量",
            },
            {
                id: "userPoints",
                name: "累计积分",
                type: "readonly",
                default: 0,
                valueType: "number",
                description: "上传答案获取，暂无用处",
            },
            // {
            //     //离线模式应该不是让用户手动选择的，而是连接服务器失败之后自动操作的，作为备用方案
            //     id: "targetApi",
            //     name: "接口选择",
            //     type: "selection",
            //     default: 1,
            //     description: "默认使用哪个查题接口",
            // },
        ],
    },
    {
        title: "UI相关",
        settings: [
            {
                id: "autoSlide",
                name: "自动下滑",
                default: true,
                valueType: "boolean",
                description: "有新消息时，窗口是否自动下滑到新消息处",
            },
            {
                id: "enableTyping",
                name: "打字效果",
                default: true,
                valueType: "boolean",
                description:
                    "如果电脑配置比较低，启用打字效果时，可能会出现打字动画自身的卡顿" +
                    "或者打字动画导致的整个页面的卡顿；这种情况下，建议关闭",
            },
        ],
    },
];
