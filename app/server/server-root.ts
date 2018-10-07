/**************************************** PROJECT MODULES *****************************************/
// Reference to root path of project
import {path as rootPath} from 'app-root-path';

// Built-in Node modules
import * as http from 'http';
import * as path from 'path';

// Express - server hosting
import * as express from 'express';

/******************************************** LOGGING *********************************************/
import {logFactory, Styles} from 'mad-logs/lib/shared';
const log = logFactory(`server-root.ts`, Styles.potOfGold);

/********************************************* CONFIG *********************************************/
// Ensure infinite number of concurrent sockets can be open
http.globalAgent.maxSockets = Infinity;

// Error handling
if (process.env.NODE_ENV !== `production`) {

    // Activate long stack trace
    Error.stackTraceLimit = Infinity;
    require(`trace`);

    // Exclude node internal calls from the stack
    require(`clarify`);
}

// Port to host server at ("http://localhost:8081")
const port = 8081;

/********************************************* SERVER *********************************************/
/**
 * Build Express app itself
 */
const app = express()

    // Middlewares
    .use(`/`, express.static(path.join(rootPath, `/build/client`)))

    // Serve
    .listen(port, logServerStartSuccess);

/**
 * Runs on server start
 */
function logServerStartSuccess() {
    log.info(`Server running: http://127.0.0.1:${port}`);
    log.info(`Server process id (pid): ${process.pid}`);
    return log.info(`Wow. So server. Very running. Much bootup success. Such win.\n`);
}
