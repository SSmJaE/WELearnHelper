import styled from "@emotion/styled";
import { useState } from "react";

const SwitchLabel = styled.label<{ width: number; height: number }>`
    /* 限定label标签属性，也就是checkbox的包装器 */

    position: relative;
    display: inline-block;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border-radius: 38px;
    /* vertical-align: middle; */

    /* 不显示checkbox本身，通过点击外部的label实现点击input的效果 */
    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* 未选中，滑条效果 */
    #slider {
        position: absolute;
        z-index: 11;
        /* cursor: pointer; */
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: 0.4s;
        border-radius: 38px;
        background-color: rgb(234, 234, 234);
    }

    #switch {
        position: absolute;
        z-index: 12;
        height: ${(props) => props.height - 2}px;
        width: ${(props) => props.height - 2}px;
        left: 1px;
        bottom: 1px;
        background-color: white;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 0 rgba(0, 0, 0, 0.08);
        border-radius: 50%;
        border-radius: 38px;
    }

    /* 未选中，点击时滑条效果 */
    input:not(:checked):active ~ #slider {
        background-color: rgb(187, 187, 187);
    }

    /* 未选中，点击时滑块效果 */
    /* input:active + #switch {
        animation-name: widen_to_right;
        animation-duration: 0.4s;
        animation-fill-mode: forwards;
    } */

    /* 滑块点击右移效果 */
    input:checked + #switch {
        animation-name: slide_to_right;
        animation-duration: 0.2s;
        animation-fill-mode: forwards;
    }

    /* 选中时，滑条效果 */
    input:checked ~ #slider {
        background-color: ${(props) => props.theme.colors.active};
    }

    /* 已选中，点击时滑块效果 */
    /* input:checked:active + #switch {
        animation-name: widen_to_left;
        animation-duration: 0.4s;
        animation-fill-mode: forwards;
    } */

    /* 滑块点击左移效果 */
    input:not(:checked):not(:active) + #switch {
        animation-name: slide_to_left;
        animation-duration: 0.2s;
        animation-fill-mode: forwards;
    }

    @keyframes widen_to_right {
        0% {
            left: 1px;
            width: ${(props) => props.height}px;
        }

        100% {
            left: 1px;
            width: ${(props) => ((props.height - 2) / 2) * 3}px;
        }
    }

    @keyframes slide_to_right {
        0% {
            left: 1px;
            width: ${(props) => ((props.height - 2) / 2) * 3}px;
        }

        100% {
            /* + 1是因为，滑块的直径是height-2，要达到right : 1的效果，就是左起 直径+1 */
            left: ${(props) => props.height + 1}px;
            width: ${(props) => props.height - 2}px;
        }
    }

    @keyframes widen_to_left {
        0% {
            left: ${(props) => props.height + 1}px;
            width: ${(props) => props.height - 2}px;
        }

        100% {
            left: ${(props) => props.width - 1 - ((props.height - 2) / 2) * 3}px;
            width: ${(props) => ((props.height - 2) / 2) * 3}px;
        }
    }

    @keyframes slide_to_left {
        0% {
            left: ${(props) => props.width - 1 - ((props.height - 2) / 2) * 3}px;
            width: ${(props) => ((props.height - 2) / 2) * 3}px;
        }

        100% {
            left: 1px;
            width: ${(props) => props.height - 2}px;
        }
    }
`;

export default function Switch({
    // checked = false,
    // onChange = () => {},
    disabled = false,
    // width = 50,
    height = 25,
    id = "",
}: {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    // width?: number;
    height?: number;
    id?: string;
}) {
    const [checked, setChecked] = useState(false);

    return (
        <SwitchLabel className="my-switch" width={height * 2} height={height}>
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={(e) => {
                    // onChange(e.target.checked);
                    setChecked(e.target.checked);
                }}
                disabled={disabled}
            />
            <span id="switch"></span>
            <span id="slider"></span>
        </SwitchLabel>
    );
}
