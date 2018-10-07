import webpack from 'webpack';
import path from 'path';
import {path as rootPath} from 'app-root-path';
import {isProduction} from 'env-var-helpers';

// const path = require('path');

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
        modules: [path.join(rootPath, `/app`), `node_modules`]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loaders: `awesome-typescript-loader`,
                // include: path.join(rootPath, `build`),
            },
        ],
    },
};

export default config;