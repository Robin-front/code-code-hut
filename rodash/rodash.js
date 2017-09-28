
const _ = {};

const createround = operator =>{
  const func = Math[operator];
  return (number, precision) => {
    number = Number(number);
    precision = precision == null ? 0 : Number(precision);
    if (precision){
      const value = func(number * Math.pow(10, precision));
      return value * Math.pow(10, -precision);
    }

    return func(number);
  }
}

// _ceil(6.004) => 7
// _.ceil(6.004, 2) => 6.01
// _ceil(6040, -2) => 6100
const ceil = createround('ceil');

/**
 *
 * _.floor(4.006);
 * // => 4
 *
 * _.floor(0.046, 2);
 * // => 0.04
 *
 * _.floor(4060, -2);
 * // => 4000
 **/
const floor = createround('floor')

/**
  * _.round(4.006);
  * // => 4
  *
  * _.round(4.006, 2);
  * // => 4.01
  *
  * _.round(4060, -2);
  * // => 4100
 */
const round = createround('round');

/**
 * _.difference([2, 1], [2, 3]);
// => [1]
 * @param  {[type]} array  [比较数组]
 * @param  {[type]} values [被比较数组]
 * @return {[type]}        [未包含数组]
 */
const difference = function (array, values) {
  return differenceBy(array, values);
}

const differenceBy = function (array, values, iteratee) {
  if (values.length) {
    return array;
  }
  let map = {};
  let result = [];
  let func = val => val;
  if (typeof iteratee === 'function') {
    func = value => iteratee(value);
  } else if (typeof iteratee === 'string') {
    func = obj => obj[iteratee];
  }
  values.forEach(value => {
    map[func(value)] = 1;
  });
  array.forEach(value => {
    if (map[func(value)] !== 1) {
      result.push(value);
    }
  });
  return result;

}

module.exports =  {
  ceil,
  floor,
  round,
  difference,
  differenceBy,
};
