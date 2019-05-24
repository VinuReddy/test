
// keyboard - direc

"use strict";

angular.module("weCarePlusApp").directive("keyboard", function(CONFIG) {
  return {
    restrict: "E",
    templateUrl: "views/directives/keyboard.html",
    link: function(scope, elem, attrs) {
      scope.row1 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "@"];
      scope.row2 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
      scope.row3 = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "'"];
      scope.row4 = ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"];
      scope.row5 = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+"];
      scope.row6 = [
        { className: "col-sm-1", keyValue: "~" },
        { className: "col-sm-1", keyValue: "`" },
        { className: "col-sm-2", keyValue: "HOTMAIL.COM" },
        { className: "col-sm-2", keyValue: "VERIZON.NET" },
        { className: "col-sm-1", keyValue: "{" },
        { className: "col-sm-1", keyValue: "}" },
        { className: "col-sm-1", keyValue: "[" },
        { className: "col-sm-1", keyValue: "]" }
      ];
      scope.row7 = [
        { className: "col-sm-1", keyValue: ".NET" },
        { className: "col-sm-1", keyValue: ".ORG" },
        { className: "col-sm-2", keyValue: "GMAIL.COM" },
        { className: "col-sm-2", keyValue: "COMCAST.NET" },
        { className: "col-sm-1", keyValue: "|" },
        { className: "col-sm-1", keyValue: ":" },
        { className: "col-sm-1", keyValue: ";" },
        { className: "col-sm-1", keyValue: '"' }
      ];
      scope.row8 = [
        { className: "col-sm-1", keyValue: ".COM" },
        { className: "col-sm-1", keyValue: ".EDU" },
        { className: "col-sm-2", keyValue: "YAHOO.COM" },
        { className: "col-sm-2", keyValue: "AOL.COM" },
        { className: "col-sm-1", keyValue: "=" },
        { className: "col-sm-1", keyValue: "<" },
        { className: "col-sm-1", keyValue: ">" },
        { className: "col-sm-1", keyValue: "?" }
      ];
      scope.keyBoardConfig = {};

      scope.$watch(
        "customConfig",
        function(newVal, oldVal) {
          angular.forEach(CONFIG.keyBoardConfig, function(value, key) {
            scope.keyBoardConfig[key] = value;
          });

          if (scope.customConfig) {
            angular.forEach(scope.customConfig, function(value, key) {
              scope.keyBoardConfig[key] = value;
            });
          }
        },
        true
      );

      scope.getClassName = function(key) {
        return key.className;
      };

      scope.onClick = function(keyType, keyValue, event) {
        event.preventDefault();
        /*
                     * The default action is prevented. 
                     * Invoke the click function in the isolate scope with the key type and value. 
                     */
        scope.performClick({
          keyType: keyType,
          keyValue: keyValue
        });
      };

      scope.spaceKeyClassSelector = function() {
        if (scope.keyBoardConfig.showAltKeyButton) {
          return "col-sm-offset-1";
        } else {
          return "col-sm-offset-4";
        }
      };
    },
    scope: {
      performClick: "&onClick",
      enterEnabled: "=enableEnter",
      showRefused: "=showRefused",
      customConfig: "=customConfig"
    }
  };
});

// dur -war

'use strict';

angular.module('weCarePlusApp').directive('durwarnings', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/durwarnings.html',
        link: function(scope, attrs, ele) {
            scope.tempDurWarnings = [];
            scope.durWarnings.map(function(warning) {
                warning.conflictType = warning.durWarningNumber + '. ' + warning.durTitle;
                scope.tempDurWarnings.push(warning);
            })
        },
        scope: {
            durWarnings: '=durWarnings',
            ellipsisLength: '=ellipsisLength'
        }
    };
});
//prescriber
'use strict';

angular.module('weCarePlusApp')
    .directive('prescribercomments', function() {
        return {
            templateUrl: 'views/directives/prescribercomments.html',
            scope: {
                prescriberComments: "=prescriberComments"
            }
        };
    });

