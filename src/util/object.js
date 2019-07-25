/**
 * 获取对象的类型
 * @param  {*} obj
 * @return {String}
 *
 * @example
 * typeOf([]) === 'Array'
 * typeOf() === 'Undefined'
 * typeOf(1) === 'Number'
 */
export function typeOf(obj) {
    return Object.prototype.toString.call(obj).replace(/\[object\s|]/g, '');
}

/**
 * 是否是一个纯净的对象
 * @param  {*}  obj
 * @return {Boolean}
 * @reference https://github.com/jonschlinkert/is-plain-object
 */
export function isPlainObject(obj) {
    if (typeOf(obj) !== 'Object') {
        return false;
    }

    const ctor = obj.constructor;

    if (typeof ctor !== 'function') {
        return false;
    }

    const prot = ctor.prototype;

    if (typeOf(prot) !== 'Object') {
        return false;
    }

    if (!prot.hasOwnProperty('isPrototypeOf')) {
        return false;
    }

    return true;
}


/**
 * 过滤 undefined 类型的值
 * @param  {*}  obj
 * @return {Object}
 */
export function filterUndefinedValue(object) {
    if (!isPlainObject(object)) {
        return object;
    }

    const obj = {};

    Object.keys(object).forEach(key => {
        const value = object[key];

        if (value !== undefined) {
            obj[key] = value;
        }
    });

    return obj;
}

/**
 * 从 obj 中去除 subObj
 * @param  {*}  obj
 * @param  {*}  subObj
 * @return {Object}
 */
export function stripObject(obj, subObj) {
    const newObject = {};

    Object.keys(obj).forEach(key => {
        if (!(key in subObj)) {
            newObject[key] = obj[key];
        }
    })
    return newObject;
}
