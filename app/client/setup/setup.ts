/*************************************** ADD GLOBAL STYLES ****************************************/
import '../styles/global-styles.scss';

/******************************************** LOGGING *********************************************/
import {logFactory, Styles} from 'mad-logs/lib/shared';
const log = logFactory(`setup.ts`, Styles.joy);

/********************************* ACTIVATE GLOBAL TYPE OVERRIDES *********************************/
// Note: import is a dummy, but Typescript must get a value from a module to
// apply the global values it declares
import * as AUGMENT_GLOBAL_PROTOTYPES from '../../../shared/augment-global-prototypes/augment-global-prototypes'; // tslint:disable-line

// Important: ensures uptake of global augmentations
log.info(`AUGMENT_GLOBAL_PROTOTYPES:`, AUGMENT_GLOBAL_PROTOTYPES);
