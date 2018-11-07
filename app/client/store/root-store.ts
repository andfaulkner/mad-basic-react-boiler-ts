/************************************** THIRD-PARTY MODULES ***************************************/
import {observable, action, computed, IObservableArray} from 'mobx';
import {Int, Any, pushIfNew, RequiredInjection} from 'mad-utils/lib/shared';

/******************************************** LOGGING *********************************************/
import {logFactory, Styles} from 'mad-logs/lib/shared';
const log = logFactory(`RootStore`, Styles.hatBlock);

/**************************************** TYPE DEFINITIONS ****************************************/
export interface StoreProps {
    appState?: RequiredInjection<RootStore>;
}

/********************************************* EXPORT *********************************************/
/**
 * Root MobX store for the application
 */
export class RootStore {
    public static Instance: RootStore | null = null;

    /**
     * Constructor (Factory method)
     */
    public static new = (): RootStore => {
        if (!RootStore.Instance) {
            RootStore.Instance = new RootStore();
            log.info(`RootStore created: `, RootStore.Instance);
        }
        return RootStore.Instance;
    }

    private constructor() {}
}

export {RootStore as Store}
