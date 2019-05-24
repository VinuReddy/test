// filters

angular.module('weCarePlusApp').filter('dateFormat', function($filter) {
    return function(input, format) {
        if (input == null) {
            return "";
        }
        if (format) {
            var _date = $filter('date')(new Date(input), format);
        } else {
            var _date = $filter('date')(new Date(input), 'MM/dd/yyyy');
        }
        return _date.toUpperCase();
    };
});

angular.module("weCarePlusApp").filter('toArray', ['$filter', function($filter) {
    return function(obj) {
        var sortOrder = ['N', 'U', 'X', 'S', 'R', 'P', 'E'];
        var result = [];
        angular.forEach(obj, function(val, key) {
            result.push(val);
        });
        result = result.sort(function(a, b) {
            if(a.eccData && b.eccData){
                return sortOrder.indexOf(a.eccData.enrollmentStatus) - sortOrder.indexOf(b.eccData.enrollmentStatus);
            }
            return false;
        });        
        return result;
    }
}])

angular.module('weCarePlusApp').filter('fixDecimal', function($filter) {
    return function(input, places) {
    	places = places ? places : 2;
        input = input ? input : "0.00";
        if (!input)
            return input;
        input = parseFloat(input);
        return input.toFixed(places);
    };
});


angular.module('weCarePlusApp').filter('maskCurrency', function($filter) {
    return function(input, places) {
        places = places ? places : 2;
        input = input ? input : "";
        if (!input)
            return input;
        input = parseFloat(input) / 100;
        return input.toFixed(places);
    };
});

angular.module('weCarePlusApp').filter('leadingZeros', function() {
    return function(textString) {
    	if (isNaN(textString)) {
    		return textString;
    	} else {
    		return parseInt(textString);
    	}        
    }
});

angular.module('weCarePlusApp').filter('rphName', function() {
    return function truncate(textString) {
        if (textString)
            return textString.substring(0, 1) + '. ' +  textString.substring(1, textString.length);
        else
            return textString;
    };
});
