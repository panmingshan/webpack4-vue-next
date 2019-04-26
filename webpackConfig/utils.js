const path = require("path");
const happyPack = require("happypack");
const Os = require("os");
const HtmlPlugin = require("html-webpack-plugin");
const fs = require("fs");
// ---------公用的方法-----------------
function resolve(...argus) {
    return path.resolve.apply(null, [__dirname, ...argus])
}

function getHappy(id, loaders) {
    return new happyPack({
        id: id,
        threadPool: happyThreadPool,
        loaders: loaders
    })
}

function getHtmlWebpackPlugin(config = {}) {
    return new HtmlPlugin({
        template: resolve("../src/template/template.html"),
        filename: config.filename,
        title: config.title,
        minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
        },
        externals : config.externals,
        chunks: config.chunks,
        hash: isDev?true:false
    })
}
    
function getEntryAndHtmlWebpackPluginObj(dir){
    let list = fs.readdirSync(resolve(dir)),_config;
    if(fs.existsSync(resolve("../src/views/config.json")))_config = JSON.parse(fs.readFileSync(resolve("../src/views/config.json"),"utf8"));

    let entrys = {},htmlWebpackPlugins = [];
    _config = _config || {};
    let externals = [
        "https://code.jquery.com/jquery-3.1.0.js",
        "https://cdn.bootcss.com/vue/2.6.10/vue.js"
    ]

    list.forEach(item => {

        if( /\.json$/.test(item))return;

        let filename = item.replace(/\.\w+$/,'');
        let filedir = resolve(dir,item)
        let {[filename] : {htmlWebpackConfig} = {}} = _config;

        entrys[filename] = filedir;
        let chunks = [filename,"commons","vendor"]
        htmlWebpackPlugins.push(getHtmlWebpackPlugin({filename : `${filename}.html`,externals,chunks,...htmlWebpackConfig}))
    });

    return {entrys, htmlWebpackPlugins}
}


// _----------------公用的变量--------------
const happyThreadPool = happyPack.ThreadPool({
    size: Os.cpus().length
});

const isDev = process.env.NODE_ENV !== "production";
const version = new Date().getTime();

module.exports = {
    resolve,
    getHappy,
    isDev,
    version,
    getHtmlWebpackPlugin,
    getEntryAndHtmlWebpackPluginObj
}