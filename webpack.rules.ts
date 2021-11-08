import { RuleSetRule } from "webpack";

const rules: RuleSetRule[] = [
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
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
        ],
        exclude: /node_modules/,
    },
    {
        test: /\.(post)?css$/,
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
];

export default rules;
