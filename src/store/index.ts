import { proxy, useSnapshot } from "valtio";
import { IWELearnExamSettings } from "../projects/welearn/exam/setting";
import { IRecord } from "../utils/logger";
import { IWELearnSettings, SectionSetting } from "../utils/setting";
import { ICommonSettings } from "../utils/setting/common";
// import { ICommonSettings } from "./utils/setting/common";
import { devtools } from "valtio/utils";

class Store {
    visibility = {
        log: true,
        config: false,
        floating: false,
    };
    setVisibility(key: keyof typeof this.visibility, value: boolean) {
        this.visibility[key] = value;
    }
    position = {
        floating: {
            x: 0,
            y: 0,
        },
        log: {
            x: 0,
            y: 0,
        },
    };
    setPosition(key: keyof typeof this.position, value: any) {
        this.position[key] = value;
    }

    tabIndex: number = 0;
    setTabIndex(index: number) {
        this.tabIndex = index;
    }

    userSettings: Partial<IWELearnSettings & ICommonSettings> = {};
    sectionSettings: SectionSetting<IWELearnSettings & ICommonSettings>[] = [];

    /**
     * 通过集成了所有插件设置的设置中心，设置USER_SETTINGS的默认值
     */
    setDefaultValues() {
        for (const section of this.sectionSettings) {
            for (const generic of section.settings) {
                if (this.userSettings[generic.id] === undefined) {
                    this.userSettings[generic.id] = generic.default as any;
                }
            }
        }
    }

    /** 恢复默认值 */
    resetDefaultValues() {
        for (const section of this.sectionSettings) {
            for (const generic of section.settings) {
                this.userSettings[generic.id] = generic.default as any;
            }
        }
    }

    logs: IRecord[] = [];
    clearLogs() {
        this.logs = [];
    }
}

export const store = proxy(new Store());

devtools(store, {
    name: "store",
});

export const useStore = () => useSnapshot(store);

export const QUERY_INTERVAL = 2000;
export const DEBUG_MODE = false;
