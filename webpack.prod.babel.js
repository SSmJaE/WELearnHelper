import { merge } from "webpack-merge";
import common from "./webpack.common.babel.js";

export default merge(common, {
    mode: "production",
    // devtool: "source-map",
});
