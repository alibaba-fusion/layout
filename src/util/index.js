import * as _object from './object';

export const obj = _object;

/**
 * 将 'grid-row-gap' 转为驼峰 'gridRowGap'
 * @param {string} name 
 */
export const toCamel = (name) => {
    const arr = name.split('-');
    const cameArr = arr.map((item, index) => {
        if (index > 0) {
            return item[0].toUpperCase() + item.slice(1);
        }
        return item;
    });
    return cameArr.join('');
}
