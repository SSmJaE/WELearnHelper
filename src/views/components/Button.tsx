import styled from "@emotion/styled";
import { useState } from "react";

const ButtonContainer = styled.span<{ disabled: boolean }>(
    {
        display: "inline-block",
        padding: "0px 4px",
        /* height: 20px; */
        // font-size: 20px,
        userSelect: "none",

        boxShadow:
            "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
        borderRadius: 4,
        marginLeft: 4,
        border: "1px solid transparent",
        lineHeight: "normal",
        // height: 24,
        // line-height: normal,
        fontFamily: "华文新魏",
    },
    ({ theme, disabled }) => ({
        "&:hover": {
            // opacity: 0.5,
            // border: disabled ? "1px solid transparent" : "1px solid black",
            // backgroundColor
            // filter: "brightness(0.9)",
            // 统一UI风格
            backgroundColor: disabled ? "white" : theme.colors.active,
            color: disabled ? "grey" : "white",
        },
        backgroundColor: "white",
        color: disabled ? "grey" : "black",
    }),
);

export default function Button({
    onClick,
    children,
    disabled,
    style,
    onMouseEnter,
    onMouseLeave,
}: {
    onClick?: () => void;
    children: React.ReactNode;
    disabled?: boolean;
    style?: React.CSSProperties;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}) {
    return (
        <ButtonContainer
            onClick={onClick}
            disabled={!!disabled}
            style={{
                ...style,
                cursor: disabled ? "not-allowed" : "pointer",
                // opacity: disabled ? 0.5 : 1,
                // filter: disabled ? "brightness(0.5)" : "brightness(1)",
                // backgroundColor: disabled ? "lightgray" : "white",
                // backgroundColor: "white",
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </ButtonContainer>
    );
}
