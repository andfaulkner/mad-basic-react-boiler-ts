import webpack from 'webpack';
import path from 'path';
import {path as rootPath} from 'app-root-path';
import {isProduction} from 'env-var-helpers';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';

import Fiber from 'fibers';

import {copyFileSync} from 'fs';

copyFileSync(
    path.join(rootPath, `app/client/index.html`),
    path.join(rootPath, `build/client/index.html`)
);

const config: webpack.Configuration = {
    entry: path.join(rootPath, `app/client/client-root.tsx`),

    context: path.resolve(rootPath, `app`),

    output: {
        path: path.join(rootPath, `/build/client`),
        filename: `index.js`,
    },

    mode: (isProduction ? `production` : `development`) as webpack.Configuration['mode'],

    resolve: {
        extensions: [`.ts`, `.tsx`, `.js`, `.jsx`],
        modules: [path.join(rootPath, `/app`), `node_modules`],
    },

    devtool: `cheap-module-source-map`,

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: `awesome-typescript-loader`,
            },
            {
                test: /\.s?css?$/,
                use: [
                    {
                        loader: `style-loader`,
                    },
                    {
                        loader: `css-loader`,
                        options: {
                            modules: true,
                            localIdentName: `[path][name]__[local]--[hash:base64:5]`,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: `sass-loader`,
                        options: {
                            implementation: require(`dart-sass`),
                            fiber: Fiber,
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            /**
             * Template file, relative to [ROOT]/app
             */
            template: `client/index.html`,
            /**
             * If true, minify output
             */
            minify: isProduction && null,
            /**
             * Values to inject into template
             */
            vals: {
                title: `Default title!`,
            },
        }),
        new Dotenv({
            safe: true,
            path: `./env/.env`,
        }),
    ],
};

export default config;
