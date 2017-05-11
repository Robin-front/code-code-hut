
var _ = require('../rodash.js');
var chai = require('chai');
var assert = chai.assert;

describe('Math', function(){
  ['ceil', 'floor', 'round'].forEach(function(name){

    var isCeil = name == 'ceil';
    var isFloor = name == 'floor';

    describe(name, function(){
      it('_.'+ name +' should return Math.ceil without percision', function(){
        assert.equal(_[name](6.004), isCeil ? 7 : 6);
      });

      it('_.'+ name +' should work with percision of 0', function(){
        assert.strictEqual(_[name](6.004, 0), isCeil ? 7 : 6)
      })

      it('_.'+ name +' should work with percision of 2', function(){
        assert(_[name](6.006, 2) === (isFloor ? 6.00 : 6.01), 'it work')
      })

      it('_.'+ name +' should work with percision of -2', function(){
        assert.equal(_[name](6150, -2), (isFloor ? 6100 : 6200))
      })
    });
  });
});
