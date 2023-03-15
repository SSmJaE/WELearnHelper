import { useTheme } from "@emotion/react";

import { GenericSetting } from "../../utils/setting";
import { ConfigControl } from "./ConfigControl";
import { ConfigItem } from "./index";

export function ConfigSection({ settings }: { settings: readonly GenericSetting[] }) {
    const theme = useTheme();

    return (
        <>
            {settings.map((setting, index) => {
                return (
                    <ConfigItem
                        key={`${String(setting.id)}-${setting.name}`}
                        style={{
                            marginTop: index === 0 ? 0 : 8,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 20,
                                marginBottom: 8,
                                height: 40,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                lineHeight: "normal",
                            }}
                        >
                            {setting.name}

                            <div
                                style={{
                                    maxHeight: 40,
                                    display: "flex",
                                    alignItems: "center",
                                    lineHeight: "normal",
                                }}
                            >
                                <ConfigControl genericSetting={setting} />
                            </div>
                        </div>
                        <div
                            style={{
                                fontSize: 16,
                                // color: theme.colors.secondary,
                                color: "rgb(161, 156, 156)",
                                lineHeight: "normal",
                            }}
                        >
                            {setting.description}
                        </div>
                    </ConfigItem>
                );
            })}
        </>
    );
}
