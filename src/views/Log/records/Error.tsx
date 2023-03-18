import { IErrorRecord } from "@/src/utils/logger";
import { useTheme } from "@emotion/react";
import { animated } from "@react-spring/web";

import { InlineTag, useSlideIn } from "../../components/InlineTag";

export function ErrorRecord({ record }: { record: IErrorRecord }) {
    const spring = useSlideIn();
    const theme = useTheme();

    return (
        <div
            style={{
                position: "relative",
                lineHeight: "24px",
            }}
        >
            <InlineTag
                style={{
                    backgroundColor: theme.colors.error,
                    color: "white",
                    ...spring,
                }}
            >
                异常
            </InlineTag>

            <animated.span
                style={{
                    lineHeight: "24px",
                    position: "relative",
                    ...spring,
                }}
            >
                {record.content.message}
            </animated.span>
        </div>
    );
}
