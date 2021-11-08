import path from "path";

import webpack, { Configuration } from "webpack";
import VueLoaderPlugin from "vue-loader/lib/plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import rules from "./webpack.rules";

const config: Configuration = {
    entry: {
        main: "./src/main.ts",
        inject: "./src/inject.ts",
        content: "./src/content.ts",
        background: "./src/background.ts",
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: `[name].js`,
    },
    module: {
        rules: rules,
    },
    plugins: [
        // 使用webpack打包vue文件，必须需要这个插件
        new VueLoaderPlugin(),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
        new CopyPlugin({
            patterns: [
                { from: "manifest.json", to: "" },
                { from: "assets/icon.png", to: "" },
            ],
        }),
        new webpack.EnvironmentPlugin({
            CRX: true,
            LITE: false,
        }),
    ],
    resolve: {
        //import的时候，可以不用写扩展名
        extensions: [".ts", ".js", ".vue", ".json"],
        alias: {
            "@src": path.resolve(__dirname, "./src/"),
            "@utils": path.resolve(__dirname, "./src/utils/"),
            "@assets": path.resolve(__dirname, "./assets/"),
            "@plugins": path.resolve(__dirname, "./src/plugins/"),
        },
    },
};

export default config;
