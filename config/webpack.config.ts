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
            // Handle loading TSX files
            {
                test: /\.tsx?$/,
                use: `awesome-typescript-loader`,
            },

            // Handle loading SCSS files
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

            // Handle image and font files
            {
                test: /\.(jpe?g|(gif)|(png)|(svg)|(bmp)|(tiff)|(ico)|(woff)|(woff2)|(eot)|(ttf)|(otf))$/,
                use: ['file-loader'],
            },
        ],
    },

    plugins: [
        /**
         * Automatically build an HTML file to display
         */
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

        /**
         * Load files in config/env/.env
         * Fail if all variables in config/env/.env-example aren't set in .env
         */
        new Dotenv({
            safe: path.join(rootPath, `config/env/.env.example`) as any,
            path: path.join(`./config/env/.env`),
        }),
    ],
};

export default config;
