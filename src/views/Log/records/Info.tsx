import { IInfoRecord } from "@/src/utils/logger";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { animated } from "@react-spring/web";
import { InlineTag, useSlideIn } from "../../components/InlineTag";

const InfoRecordContainer = styled(animated.span)(
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
        },
    }),
);

/** 对其中的link，做一点美化处理(比如淡蓝色背景，深蓝色下划线) */
export function InfoRecord({ record }: { record: IInfoRecord }) {
    const spring = useSlideIn();
    const theme = useTheme();

    return (
        <div
            style={{
                position: "relative",
                lineHeight: "normal",
            }}
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
        </div>
    );
}
