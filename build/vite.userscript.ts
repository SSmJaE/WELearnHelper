import dotenv from "dotenv";
import { defineConfig } from "vite";
import monkey, { cdn } from "vite-plugin-monkey";

import react from "@vitejs/plugin-react";

import metadata from "../metadata.json";
import { commonConfig } from "./vite.common";
import visualizer from "rollup-plugin-visualizer";

dotenv.config(); // load env vars from .env

// console.log(process.env);

const project = metadata.projects[process.env.COMPILE_PLATFORM as "welearn" | "tsinghua"];

// https://vitejs.dev/config/
export default defineConfig({
    ...commonConfig,
    define: {
        "process.env.COMPILE_PLATFORM": JSON.stringify(process.env.COMPILE_PLATFORM),
        "process.env.CRX": false,
    },
    plugins: [
        react(),
        monkey({
            entry: "src/index.tsx",
            userscript: {
                name: project.name,
                icon: "https://vitejs.dev/logo.svg",
                namespace: project.namespace,
                match: [...project.matches],
                description: project.description,
                connect: [...project.connect],
                homepage: metadata.homepage,
                "run-at": "document-end",
                version: project.version,
            },
            server: { mountGmApi: true },
            build: {
                externalGlobals: {
                    react: cdn.jsdelivr("React", "umd/react.production.min.js"),
                    "react-dom": cdn.jsdelivr("ReactDOM", "umd/react-dom.production.min.js"),
                },
                fileName: `WELearnHelper${metadata.projects.welearn.version}.user.js`,
            },
        }),
        // visualizer(),
    ],
});
