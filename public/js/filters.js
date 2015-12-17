'use strict';


angular.module('scanthisApp.filters', [])

/*turns a string into a date object*/
.filter('stringtodate', function() {
  return function(input) {
    return new Date(input);
  };
})

/*returns 'FT' string for fair trade*/
.filter('isfairtrade', function() {
  return function(input) {
    if (String(input) === 'true'){
        return 'FT';
    }
    else return '';
  };
})

.filter('sumOfValue', function () {
    return function (data, key) {
        if (angular.isUndefined(data) && angular.isUndefined(key))
            return 0;        
        var sum = 0;
        
        angular.forEach(data,function(v,k){
            sum = sum + parseFloat(v[key]);
        });        
        return sum;
    };
})

.filter('weightstring', function() {
  return function(input) {
    return String(input.toFixed(2)) + 'kg';
  };
});
