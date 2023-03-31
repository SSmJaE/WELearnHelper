import { useState } from "react";

import { IInfoRecord } from "@/src/utils/logger";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { animated } from "@react-spring/web";

import { InlineTag, useSlideIn } from "../../components/InlineTag";
import Button from "../../components/Button";

export const InfoRecordContainer = styled(animated.span)(
    {
        lineHeight: "24px",
        position: "relative",
    },
    ({ theme }) => ({
        a: {
            color: theme.colors.active,
            fontStyle: "italic",
            backgroundColor: theme.colors.activeSecondary,
            borderRadius: 4,
            padding: "0px 4px",
        },
        "a:hover": {
            // borderBottom: `${theme.colors.active} 2px solid`,
            pointer: "cursor",
            // transform: "scale(1.1)",
            // transition: "transform 500ms",
        },
    }),
);

/** 对其中的link，做一点美化处理(比如淡蓝色背景，深蓝色下划线) */
export function InfoRecord({ record }: { record: IInfoRecord }) {
    const spring = useSlideIn();
    const theme = useTheme();

    const [isHover, setHover] = useState(false);

    return (
        <div
            style={{
                position: "relative",
                lineHeight: "normal",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <InlineTag
                style={{
                    backgroundColor: theme.colors.active,
                    color: "white",
                    ...spring,
                }}
            >
                提示
            </InlineTag>

            <InfoRecordContainer
                style={{
                    ...spring,
                }}
                dangerouslySetInnerHTML={{
                    __html: `${record.content}`,
                }}
            />

            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    display: isHover ? "flex" : "none",
                }}
            >
                {/* hover时，显示在最后一行的最右边 */}
                {record.action &&
                    record.action.map(({ children, ...restProps }, index) => (
                        <Button key={index} {...restProps}>
                            {children}
                        </Button>
                    ))}
            </div>
        </div>
    );
}
