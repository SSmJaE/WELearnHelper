import { useRef, useState } from "react";
import {
    useHover,
    useFloating,
    useInteractions,
    flip,
    offset,
    shift,
    FloatingArrow,
    arrow,
    Placement,
    FloatingPortal,
} from "@floating-ui/react";
import { useTheme } from "@emotion/react";

export default function PopOver({
    children,
    content,
    placement = "top-start",
    disabled = false,
    offsetPixel = 8,
    backgroundColor = "rgba(104, 101, 101, 0.89)",
}: {
    children: React.ReactNode;
    content: React.ReactNode;
    placement?: Placement;
    disabled?: boolean;
    offsetPixel?: number;
    backgroundColor?: string;
}) {
    const theme = useTheme();

    const [isOpen, setIsOpen] = useState(false);

    const arrowRef = useRef(null);
    const { x, y, strategy, refs, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement,
        middleware: [
            offset(offsetPixel),
            flip(),
            shift(),
            arrow({
                element: arrowRef,
            }),
        ],
    });

    const hover = useHover(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

    return (
        <>
            <div
                key={`PopOver-content-${content}`}
                ref={refs.setReference}
                {...getReferenceProps()}
            >
                {children}
            </div>
            {/* 确保即使父容器overflow hidden时，popover也能正常显示，通过直接挂在在body上 */}
            <FloatingPortal>
                {isOpen && !disabled && (
                    <div
                        key={`PopOver-tooltip-${content}`}
                        ref={refs.setFloating}
                        style={{
                            position: strategy,
                            top: y ?? 0,
                            left: x ?? 0,
                            backgroundColor,
                            // backgroundColor: theme.colors.secondary,
                            width: "max-content",
                            color: "white",
                            borderRadius: 4,
                            fontSize: 20,
                            padding: 8,
                            zIndex: 9999,
                            fontFamily: "华文新魏",
                            lineHeight: "normal",
                        }}
                        {...getFloatingProps()}
                    >
                        <FloatingArrow
                            ref={arrowRef}
                            context={context}
                            fill={"rgba(104, 101, 101, 0.89)"}
                        />
                        {content}
                    </div>
                )}
            </FloatingPortal>
        </>
    );
}
