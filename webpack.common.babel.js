//webpack使用的是node的commonJs导包语法
import path from "path";
import VueLoaderPlugin from "vue-loader/lib/plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

// const path = require("path");
// const VueLoaderPlugin = require("vue-loader/lib/plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

export default {
    entry: "./src/main.ts",
    output: {
        //__dirname即当前文件所在目录的路径，此处是根目录
        path: path.resolve(__dirname, "./dist"),
        filename: "WElearnHelper.js",
    },
    module: {
        rules: [
            //webpack本身就可以识别js文件，所以不需要额外定义规则
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                use: [
                    "babel-loader",
                    {
                        loader: "ts-loader",
                        // options: {
                        //     appendTsSuffixTo: [/\.vue$/],
                        // },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                    "postcss-loader",
                ],
            },
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/i,
                use: [
                    {
                        loader: "url-loader",
                        // options: {
                        //     limit: 8192,
                        // },
                    },
                ],
            },
            {
                test: /\.vue$/,
                use: "vue-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        // 使用webpack打包vue文件，必须需要这个插件
        new VueLoaderPlugin(),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            title: "Output Management",
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
