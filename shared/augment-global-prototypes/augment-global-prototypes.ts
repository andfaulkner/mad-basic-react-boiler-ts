/************************************* GLOBAL TYPE OVERRIDES **************************************/
declare global {
    interface Function {
        displayName?: DisplayName;
    }
    interface RegExpConstructor {
        escape: (unescapedStr: string) => string;
    }
}

// Note: it's important to have at least 1 export from here.
export type DisplayName = string;

/**************************************** RegExp POLYFILLS ****************************************/
if (!RegExp.escape) {
    Reflect.defineProperty(RegExp, 'escape', {
        value: function(unescapedStr) {
            return String(unescapedStr).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
        },
        configurable: false,
        enumerable: false,
    });
}

/************************ BARREL EXPORTS FOR OTHER PROTOTYPE AUGMENTATIONS ************************/
import * as StringProto from './augment-string-prototype';
import * as ArrayProto from './augment-array-prototype';

export {StringProto, ArrayProto};
