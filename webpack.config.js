const HtmlWebPack = require('html-webpack-plugin');
const { loader } = require('mini-css-extract-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    output:{
        clean: true
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
            }
        ]
    },
    optimization: {

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
            filename: '[main].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns:[
                {from: "src/assets/", to: "assets/"}
            ]
        })
    ]
}