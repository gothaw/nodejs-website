const mode = process.env.NODE_ENV || 'development';

const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const optimization = {
    minimizer: [
        new TerserPlugin()
    ]
};

const entry = {
    'index': [
        './public/src/scss/style.scss'
    ]
};

const _module = {
    rules: [
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        url: false
                    }
                },
                "postcss-loader",
                "sass-loader"
            ]
        }
    ]
};

const output = {
    filename: 'bundle.js',
    path: __dirname + '/dist/'
};

const plugins = [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
        filename: "../public/dist/css/main.css"
    }),
    new webpack.LoaderOptionsPlugin({
        options:{
            postcss: [
                autoprefixer()
            ]
        }
    })
];

module.exports = {
    optimization,
    entry,
    mode,
    module: _module,
    output,
    plugins
};