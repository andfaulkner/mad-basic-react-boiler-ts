const path = require('path');
const rootPath = require('app-root-path').path;

module.exports = {
    entry: `./src/client/client-root.tsx`,

    output: {
        path: path.join(rootPath, `/build/client`),
        filename: `index.js`,
    },

    resolve: {
        extensions: [`.ts`, `.tsx`, `.js`, `.jsx`]
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
