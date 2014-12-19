'use strict';

// Declare app level module which depends on views, and components
angular.module('indexApp', []).directive('ngRepeatEnd', function () {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            if (attrs.ngRepeat) {
                if (scope.$parent.$last) {
                    if (attrs.ngRepeatEnd !== '') {
                        if (typeof scope.$parent.$parent[attrs.ngRepeatEnd] === 'function') {
                            // Executes defined function
                            scope.$parent.$parent[attrs.ngRepeatEnd]();
                        } else {
                            // For watcher, if you prefer
                            scope.$parent.$parent[attrs.ngRepeatEnd] = true;
                        }
                    } else {
                        // If no value was provided than we will provide one on you controller scope, that you can watch
                        // WARNING: Multiple instances of this directive could yeild unwanted results.
                        scope.$parent.$parent.ngRepeatFinished = true;
                    }
                }
            } else {
                throw 'ngRepeatEndWatch: `ngRepeat` Directive required to use this Directive';
            }
        }
    };
});
