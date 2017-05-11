
var _ = {};

function createround(operator){
  var func = Math[operator];
  return function(number, precision){
    number = Number(number);
    precision = precision == null ? 0 : Number(precision);
    if (precision){
      var value = func(number * Math.pow(10, precision));
      return value * Math.pow(10, -precision);
    }

    return func(number);
  }
}

// _ceil(6.004) => 7
// _.ceil(6.004, 2) => 6.01
// _ceil(6040, -2) => 6100
var ceil = createround('ceil');

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
var floor = createround('floor')

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
var round = createround('round');

_.ceil = ceil;
_.floor = floor;
_.round = round;


module.exports =  _;
