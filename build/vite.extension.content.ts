import { defineConfig } from "vite";

import { extensionConfig, generateBuildOptions } from "./vite.common";

export default defineConfig({
    ...extensionConfig,
    build: generateBuildOptions({
        fileName: "content",
        filePath: "src/utils/polyfill/extension/content.ts",
    }),
});
