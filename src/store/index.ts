import { proxy, subscribe, useSnapshot } from "valtio";
import { devtools } from "valtio/utils";

import logger, { IRecord } from "../utils/logger";
import { setValue } from "../utils/polyfill";
import { IWELearnSettings, SectionSetting } from "../utils/setting";
import { ICommonSettings } from "../utils/setting/common";

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

    userSettings = {} as IWELearnSettings & ICommonSettings;
    sectionSettings: SectionSetting<IWELearnSettings & ICommonSettings>[] = [];

    /** 因为subscribe了这个key，如果直接替换(=)，会导致subscribe失效 */
    setUserSettings(userSettings: Partial<IWELearnSettings & ICommonSettings>) {
        for (const [key, value] of Object.entries(userSettings || {})) {
            // @ts-ignore
            this.userSettings[key] = value;
        }
    }

    /**
     * 通过集成了所有插件设置的设置中心，设置USER_SETTINGS的默认值
     */
    setDefaultValues() {
        for (const section of this.sectionSettings) {
            for (const generic of section.settings) {
                if (this.userSettings[generic.id] === undefined) {
                    // @ts-ignore
                    this.userSettings[generic.id] = generic.default;
                }
            }
        }
    }

    /** 恢复默认值 */
    resetDefaultValues() {
        for (const section of this.sectionSettings) {
            for (const generic of section.settings) {
                // @ts-ignore
                this.userSettings[generic.id] = generic.default;
            }
        }
    }

    logs: IRecord[] = [];
    clearLogs(remain?: number) {
        if (remain) {
            this.logs = this.logs.slice(0, remain);
        } else {
            this.logs = [];
        }
    }
    getRecordById(id: string) {
        return this.logs.find((record) => record.id === id);
    }
    // 不知道是不是因为是proxy，所以这个方法不起作用
    // updateRecord(record: Pick<IRecord, "id"> & Partial<IRecord>) {
    //     const index = this.logs.findIndex((log) => log.id === record.id);
    //     if (index !== -1) {
    //         logger.debug("in updateRecord", record)

    //         this.logs[index] = { ...this.logs[index], ...record };
    //     }
    // }
}

export const store = proxy(new Store());

export const useStore = () => useSnapshot(store);

devtools(store, {
    name: "store",
});

subscribe(store.userSettings, async () => {
    await setValue("userSettings", store.userSettings);
    logger.debug("userSettings已持久化");
});

export const CONSTANT = {
    QUERY_INTERVAL: 2000,
    DEBUG_MODE: false,
} as const;
