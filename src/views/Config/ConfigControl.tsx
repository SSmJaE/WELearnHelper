import { useDebounceFn } from "ahooks";
import { useEffect, useState } from "react";

import { animated, config, useSpring } from "@react-spring/web";

import { store, useStore } from "../../store";
import { GenericSetting } from "../../utils/setting";
import Switch from "../components/Switch";

export function ConfigControl({
    genericSetting: { id, valueType, readonly },
}: {
    genericSetting: GenericSetting;
}) {
    const [statusText, setStatusText] = useState("");

    const [spring, api] = useSpring<{ right: string }>(() => ({
        config: {
            ...config.wobbly,
        },
    }));

    const { userSettings } = useStore();

    const value = userSettings[id as keyof typeof userSettings];

    const [localValue, setLocalValue] = useState(value);

    const { run: onChangeDebounced } = useDebounceFn(
        (newValue: any) => {
            if (newValue === value) return;

            store.userSettings[id as keyof typeof userSettings] = newValue;
            setStatusText("保存成功");

            setTimeout(() => {
                setStatusText("");
            }, 1000);
        },
        {
            wait: 1000,
        },
    );

    useEffect(() => {
        api.start({
            right: statusText ? "0%" : "-100%",
        });
    }, [statusText]);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    useEffect(() => {
        onChangeDebounced(localValue);
    }, [localValue]);

    let element: JSX.Element;

    switch (valueType) {
        case "string":
            element = (
                <textarea
                    value={localValue as string}
                    onBlur={(e) => setLocalValue(e.target.value)}
                    onChange={(e) => setLocalValue(e.target.value)}
                    disabled={readonly}
                    style={{
                        resize: "none",
                    }}
                ></textarea>
            );

            break;
        case "number":
            element = (
                <input
                    type={"number"}
                    value={localValue as number}
                    onBlur={(e) => setLocalValue(e.target.value)}
                    onChange={(e) => setLocalValue(e.target.value)}
                    style={{
                        width: 60,
                        textAlign: "center",
                    }}
                    disabled={readonly}
                ></input>
            );

            break;
        case "boolean":
            element = (
                <Switch
                    height={22}
                    checked={localValue as boolean}
                    onChange={setLocalValue}
                    disabled={readonly}
                />
            );

            break;
    }

    return (
        <div
            style={{
                lineHeight: "normal",
                display: "flex",
                alignItems: "center",
                position: "relative",
            }}
        >
            <animated.div
                style={{
                    position: "relative",
                    marginRight: 4,
                    ...spring,
                }}
            >
                {statusText}
            </animated.div>
            <div
                style={{
                    maxWidth: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {element}
            </div>
        </div>
    );
}
