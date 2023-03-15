import styled from "@emotion/styled";

export const MenuButton = styled.div<{ disabled?: boolean }>(
    {
        fontSize: 24,
        fontFamily: "华文新魏",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    ({ theme, disabled }) => ({
        // color: theme.colors.active,
        "&:hover": {
            transform: disabled ? undefined : "scale(1.2) rotate(30deg)",
            transition: disabled ? undefined : "transform 500ms",
        },
    }),
);
