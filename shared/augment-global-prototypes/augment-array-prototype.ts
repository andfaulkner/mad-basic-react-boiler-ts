// TODO Clean augment-array-prototype.ts up and move into separate module

import {last, first, second, compact, arrayRemove} from 'mad-utils/lib/react';

/******************************************** LOGGING *********************************************/
import {logFactory, Styles} from 'mad-logs/lib/shared';
const log = logFactory(`augment-array-prototype.ts`, Styles.angryBird);

/*************************************** TYPE DECLARATIONS ****************************************/
export type BaseArrFunc<T = any> = (this: T[]) => T[];
export type GetArrayItemFunc<T = any> = (this: T[]) => T;

export type ArrayGetter<T = any> = T[];
export type ArrayItemGetter<T = any> = T | undefined;
export type FlatMapType = <T, U>(mapFunction: (value: T, idx: number, array: T[]) => U[]) => U[];

export type BooleanInfoType = <T = any>(this: T[]) => boolean;

type FalsyType = 'allFalsy' | 'nullUndef' | 'keep0' | 'keepStr';

declare global {
    interface Array<T> {
        /**
         * Get first item in array
         */
        first: ArrayItemGetter<T>;
        /**
         * Get second item in array
         */
        second: ArrayItemGetter<T>;
        /**
         * Get last item in array
         */
        last: ArrayItemGetter<T>;
        /**
         * Get all but last item in array
         */
        init: ArrayGetter<T>;
        /**
         * Get all but first item in array
         */
        tail: ArrayGetter<T>;

        /**
         * Remove falsy values from the array
         * By default removes all falsy val types, but can select a specific subset to rm w 2nd arg
         * @param {string} falsyTypes: 'allFalsy'  [DEFAULT] Remove all falsy values
         *                             'nullUndef' Remove only null & undefined values
         *                             'keep0'     Remove all falsy values except 0
         *                             'keepStr'   Remove all falsy values except ''
         * @return {Array} Array with set falsy val types removed (rms all falsy vals by default)
         */
        rmFalsyVals: <T = any>(falsyTypes?: FalsyType) => T[];

        empty: BooleanInfoType;

        /**
         * Return first truthy value returned from predicate
         *
         * Similar to find, but returns whatever value you want from the
         * predicate, rather than the found value itself
         *
         * Returns null if no truthy value returned by predicate for any values
         * of array
         */
        returnFirstTruthy: <R>(predicate: (item: T) => R) => R;

        /**
         * Map over array, then flatten result (one level deep)
         */
        // flatMap: FlatMapType;

        /**
         *  Map after deep-flattening array (contrast with flatMapDeep, which
         *  deep-flattens after mapping top-level array)
         */
        mapDeepFlattened: FlatMapType;

        /**
         * Map over (top-level) array, then deep-flatten result
         */
        flatMapDeep: FlatMapType;

        /**
         * Returns true if array contains given value, optionally starting
         * search from given index [fromIndex]
         */
        // includes: <T>(this: T[], searchElement: any, fromIndex?: number) => boolean;

        /**
         * [MUTATIVE]
         * Mutatively removes all matches of given value from array
         * Also returns new array
         *
         * Example: const arr = ['a', 'b', 'c', 'd', 'b'];
         *          arr.remove('b');
         *          console.log(arr); // => ['a', 'c', 'd']
         *
         * @param {any} itemToRemove Item to remove from array (remove ALL matches)
         * @return {Array} array from haystack property with all "needle"s removed
         */
        remove: <T>(this: T[], itemToRemove: T) => T[];
    }
}

/******************************************** HELPERS *********************************************/
/**
 * Comparison algorithm
 */
const sameValueZero = (x: number, y: number) =>
    x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));

/*************************************** GET FROM POSITION ****************************************/
/**
 * Get first item in array
 */
Reflect.defineProperty(Array.prototype, `first`, {
    get: function firstAugmented<T = any>(this: T[]): T {
        return first(this);
    },
    configurable: false,
    enumerable: false,
});

/**
 * Get second item in array
 */
Reflect.defineProperty(Array.prototype, `second`, {
    get: function secondAugmented<T = any>(this: T[]): T {
        return second(this);
    },
    configurable: false,
    enumerable: false,
});

/**
 * Get last item in array
 */
Reflect.defineProperty(Array.prototype, `last`, {
    get: function lastAugmented<T = any>(this: T[]): T {
        return last(this);
    },
    configurable: false,
    enumerable: false,
});

/**
 * Get all but last item in array
 */
Reflect.defineProperty(Array.prototype, `init`, {
    get: function initAugmented<T = any>(this: T[]): T[] {
        return this.slice(0, -1);
    },
    configurable: false,
    enumerable: false,
});

/**
 * Get all but first item in array
 */
Reflect.defineProperty(Array.prototype, `tail`, {
    get: function tailAugmented<T = any>(this: T[]): T[] {
        return this.slice(1);
    },
    configurable: false,
    enumerable: false,
});

/**
 * Get new array containing all non-falsy vals from array
 */
Reflect.defineProperty(Array.prototype, 'rmFalsyVals', {
    value: function rmFalsyVals<T = any>(this: T[], falsyType: FalsyType = 'allFalsy'): T[] {
        return compact(this, falsyType);
    },
    configurable: false,
    enumerable: false,
});

/************************************** ARRAY INFO POLYFILLS **************************************/
/**
 * Return true if current array is not empty
 */
Reflect.defineProperty(Array.prototype, `empty`, {
    get: function emptyAugmented<T = any>(this: T[]): boolean {
        return !this.last;
    },
    configurable: false,
    enumerable: false,
});

/*************************************** flatMap POLYFILLS ****************************************/
// Reflect.defineProperty(Array.prototype, 'flatMap', {
//     value: function(lambda) {
//         return Array.prototype.concat.apply([], this.map(lambda));
//     },
//     configurable: false,
//     enumerable: false,
// });

Reflect.defineProperty(Array.prototype, 'mapDeepFlattened', {
    value: function mapDeepFlattened<T>(this: T[], mapper) {
        return Array.isArray(this)
            ? this.reduce(
                  (acc, val) =>
                      acc.concat(Array.isArray(val) ? val.mapDeepFlattened(mapper) : mapper(val)),
                  []
              )
            : mapper(this);
    },
    configurable: false,
    enumerable: false,
});

Reflect.defineProperty(Array.prototype, 'flatMapDeep', {
    value: function flatMapDeep<T>(this: T[], mapper) {
        return Array.isArray(this)
            ? this.reduce((acc, val) => acc.concat(mapper(val)), [])
            : mapper(this);
    },
    configurable: false,
    enumerable: false,
});

Reflect.defineProperty(Array.prototype, 'remove', {
    value: function remove<T>(this: T[], itemToRemove: T) {
        return arrayRemove(this, itemToRemove);
    },
    configurable: false,
    enumerable: false,
});

Reflect.defineProperty(Array.prototype, 'returnFirstTruthy', {
    value: function returnFirstTruthy<T>(this: T[], predicate: (item: T) => boolean) {
        let match = null;
        for (const item of this) {
            const val = predicate(item);
            if (val) return val;
        }
        return null;
    },
    configurable: false,
    enumerable: false,
});

/******************************************* POLYFILLS ********************************************/
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
// if (!Array.prototype.includes) {
//     Reflect.defineProperty(Array.prototype, 'includes', {
//         value: function includes<T>(this: T[], searchElement: any, fromIndex?: number) {
//             if (this == null) throw new TypeError('"this" is null or not defined');

//             // 1. Let O be ? ToObject(this value)
//             var o = Object(this);

//             // 2. Let len be ? ToLength(? Get(O, "length"))
//             var len = o.length >>> 0;

//             // 3. If len is 0, return false.
//             if (len === 0) return false;

//             // 4. Let n be ? ToInteger(fromIndex)
//             //    (If fromIndex is undefined, this step produces the value 0)
//             var n = fromIndex | 0;

//             // 5. If n ≥ 0, then let k be n
//             //    Else n < 0: Let k be len + n; If k < 0, let k be 0
//             var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

//             // 7. Repeat, while k < len
//             while (k < len) {
//                 // a. Let elementK be the result of ? Get(O, ! ToString(k))
//                 // b. If SameValueZero(searchElement, elementK) is true, return true
//                 if (sameValueZero(o[k], searchElement)) return true;
//                 // c. Increase k by 1
//                 k++;
//             }

//             // 8. Return false if no match found
//             return false;
//         },
//         configurable: false,
//         enumerable: false,
//     });
// }

/****************************************** LOG SUCCESS *******************************************/
log.verbose(
    `Successfully augmented Array.prototype. Array.prototype keys:`,
    Object.keys(Array.prototype)
);
