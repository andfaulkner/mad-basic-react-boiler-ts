/**************************************** PROJECT MODULES *****************************************/
import {isProduction} from 'env-var-helpers';

// Reference to root path of project
import {path as rootPath} from 'app-root-path';

// Built-in Node modules
import http from 'http';
import path from 'path';

// Express - server hosting
import express from 'express';

/******************************************** LOGGING *********************************************/
import {logFactory, Styles} from 'mad-logs/lib/shared';
const log = logFactory(`server-root.ts`, Styles.potOfGold);

/********************************************* CONFIG *********************************************/
// Ensure infinite number of concurrent sockets can be open
http.globalAgent.maxSockets = Infinity;

// Development error handling
if (!isProduction) {
    // Activate long stack trace
    Error.stackTraceLimit = Infinity;
    require(`trace`);

    // Exclude node internal calls from the stack
    require(`clarify`);
}

/**
 * Port to host server on e.g. locally this puts server at http://localhost:8080
 */
const port = 8082;

/********************************************* SERVER *********************************************/
/**
 * Build and run Express app itself
 */
express()
    /****** Middlewares ******/
    // .use(something)

    /****** Routes ******/
    // Return index.html at any route with no "." in it
    .get('^/[^\.]+$', (req: express.Request, res: express.Response) => {
        res.sendFile(path.join(rootPath, `./build/client/index.html`));
    })

    // Host static files - JS & CSS
    .use(`/`, express.static(path.join(rootPath, `/build/client`)))

    /****** Serve ******/
    .listen(port, logServerStartSuccess);

/**
 * Runs on server start
 */
function logServerStartSuccess() {
    log.info(`Server running: http://127.0.0.1:${port}`);
    log.info(`Server process id (pid): ${process.pid}`);
    return log.info(`Wow. So server. Very running. Much bootup success. Such win.\n`);
}
