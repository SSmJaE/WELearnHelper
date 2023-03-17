import styled from "@emotion/styled";

export const MenuBar = styled.div(
    {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        userSelect: "none",
        padding: "8px 8px",
        position: "relative",
        height: 50,
        fontFamily: "华文新魏",
    },
    ({ isDragging }: { isDragging: boolean }) => ({
        cursor: isDragging ? "grabbing" : "grab",
    }),
);
