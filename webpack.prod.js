const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizer = require("css-minimizer-webpack-plugin");
const Terser = require("terser-webpack-plugin");

module.exports = {
    mode: 'production',
    output:{
        clean: true,
        filename:'main.[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use:[MiniCssExtract.loader, 'css-loader']
            },
            //usar para el futuro  asset modules 
            {
                test: /\.(png|jpe?g|gif)$/i,
                use:[{
                    loader: 'file-loader'
                }]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },
    optimization: {
        minimizer:[
            new CssMinimizer(),
            new Terser(),
        ]
    },
    devServer:{
        port: 8080,
        open: {
            app:{
                name: 'chrome'
            }
        }
    },
    plugins: [
        new HtmlWebPack({
            title: 'Mi Webpack App',
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtract({
            //[name].[fullhash].css - Cambia el nombre en formato hash
            //al agregar fullhash el reload no sirve
            filename: '[name][fullhash].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns:[
                {from: "src/assets/", to: "assets/"}
            ]
        })
    ]
}