import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import monkey, { cdn } from "vite-plugin-monkey";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname),
            "@src": path.resolve(__dirname, "src"),
            "@api": path.resolve(__dirname, "src/api"),
            "@components": path.resolve(__dirname, "src/views/components"),
            "@views": path.resolve(__dirname, "src/views"),
            "@store": path.resolve(__dirname, "src/store"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@static": path.resolve(__dirname, "src/static"),
        },
    },
    plugins: [
        react(),
        monkey({
            entry: "src/index.tsx",
            userscript: {
                icon: "https://vitejs.dev/logo.svg",
                namespace: "npm/vite-plugin-monkey",
                match: [
                    "https://www.google.com/",
                    "https://www.baidu.com/",
                    "https://course.sflep.com/*",
                    "https://welearn.sflep.com/*",
                    "https://courseappserver.sflep.com/*",
                    "https://centercourseware.sflep.com/*",
                ],
            },
            build: {
                externalGlobals: {
                    react: cdn.jsdelivr("React", "umd/react.production.min.js"),
                    "react-dom": cdn.jsdelivr("ReactDOM", "umd/react-dom.production.min.js"),
                },
            },
        }),
    ],
});
