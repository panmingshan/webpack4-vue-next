const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./common.config.js");

function getPath(pathStr) {
    return path.resolve(__dirname, pathStr);
}


module.exports = merge(common,{
    devtool : "cheap-module-eval-source-map",
    devServer: {
        contentBase: getPath("../build"),
        host: "localhost", 
        port: "3000",
        // open: true,
        hot: true,
        // hotOnly : true
    },
    // 文件体积过大的提示
    performance: {
        // hints: "warning"
    },
    module: {
        // noParse : /jquery/,
        rules: [
            {
                use: ["vue-style-loader", "css-loader", "postcss-loader", "less-loader"],
                test: /\.(css|less)$/,
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV" : JSON.stringify("development1"),
            "dev" : true
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
})