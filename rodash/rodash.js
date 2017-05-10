
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


// _.ceil(6.004, 2) => 6.01
// _ceil(6040, -2) => 6100
_.ceil = createround('ceil');
