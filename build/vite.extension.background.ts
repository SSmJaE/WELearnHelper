import { defineConfig } from "vite";

import { extensionConfig, generateBuildOptions } from "./vite.common";

export default defineConfig({
    ...extensionConfig,
    build: generateBuildOptions({
        fileName: "background",
        filePath: "src/utils/polyfill/extension/background.ts",
    }),
});
