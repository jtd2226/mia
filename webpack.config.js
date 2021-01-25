const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack")

const finalPath = path.resolve(__dirname, "build");

module.exports = env => ({
    mode: "development",
    entry: ["babel-polyfill", "./src/js/index.js"],
    output: {
        path: finalPath,
        filename: "app.js",
    },
    resolve: {
        alias: {
            img: path.resolve(__dirname, "src/img"),
            js: path.resolve(__dirname, "src/js"),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "img",
                        },
                    },
                ],
            },
            {
                test: /\.(ogg|mp3|wav|mp4|mov|mpe?g)$/i,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]",
                    outputPath: "media",
                },
            },
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: ["raw-loader", "glslify-loader"],
            },
        ],
    },
    plugins: [
        new CopyPlugin([
            { from: "./src/app.css", to: finalPath, force: true },
            { from: "./src/index.html", to: finalPath, force: true },
            {
                from: "./src/img",
                to: path.join(finalPath, "/img"),
                force: true,
            },
        ]),
        new MiniCssExtractPlugin({
            filename: "app.css",
        }),
        new BrowserSyncPlugin({
            host: "localhost",
            port: 5000,
            server: { baseDir: "./build" },
        }),
        new webpack.EnvironmentPlugin(['YT_API_KEY'])
    ],
});
