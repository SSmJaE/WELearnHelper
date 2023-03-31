import { memo, useEffect, useState } from "react";

import metadata from "@/metadata.json";
import logger from "@/src/utils/logger";
import { getValue } from "@/src/utils/polyfill";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import GithubOne from "@icon-park/react/es/icons/GithubOne";

import Button from "../../components/Button";
import { InfoRecordContainer } from "../records/Info";

const ScaleIt = styled.div({
    "&:hover": {
        transform: "scale(1.2)",
        transition: "transform 500ms",
        cursor: "pointer",
    },
});

export const About = memo(function () {
    const theme = useTheme();

    const [versionInfo, setVersionInfo] = useState<string[]>([]);

    useEffect(() => {
        getValue<string[]>("VERSION_INFO", []).then((messages) => {
            setVersionInfo(messages);

            logger.debug("成功设置about页面的版本信息");
        });
    }, []);

    return (
        <div
            style={{
                // border: "2px solid black",
                width: 380,
                color: "black",
                // height: 300,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%",
                    margin: "8px 0px",
                }}
            >
                <ScaleIt>
                    <GithubOne theme="filled" size="24" fill={theme.colors.active} />
                </ScaleIt>

                <Button disabled>使用引导</Button>
            </div>

            <div>
                版本 <span style={{ marginLeft: 24 }}>{metadata.projects.welearn.version}</span>
            </div>

            <div
                style={{
                    margin: "8px 0px",
                }}
            >
                Made with ❤️ by
                <ScaleIt
                    style={{
                        display: "inline-block",
                        color: theme.colors.active,
                        fontSize: 20,
                        marginLeft: 8,
                    }}
                    onClick={() => {
                        window.open("https://github.com/SSmJaE", "_blank");
                    }}
                >
                    SSmJaE
                </ScaleIt>
            </div>

            <div
                style={{
                    width: "100%",
                    borderTop: "2px solid black",
                    marginTop: 8,
                }}
            >
                {versionInfo.length !== 0 &&
                    versionInfo.map((message) => (
                        <InfoRecordContainer
                            style={{
                                display: "block",
                                marginBottom: 4,
                            }}
                            dangerouslySetInnerHTML={{
                                __html: `${message}`,
                            }}
                        />
                    ))}
            </div>
        </div>
    );
});
