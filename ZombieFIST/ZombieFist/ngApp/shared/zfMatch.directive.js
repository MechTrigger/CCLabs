var zombieApp;
(function (zombieApp) {
    'use strict';
    var zfMatchDirective = (function () {
        function zfMatchDirective($parse) {
            var _this = this;
            this.$parse = $parse;
            this.restrict = 'A';
            this.require = 'ngModel';
            this.link = function (scope, element, attrs, ctrl) {
                if (!ctrl)
                    return;
                if (!attrs['zfMatch'])
                    return;
                var firstPassword = _this.$parse(attrs['zfMatch']);
                var validator = function (value) {
                    var temp = firstPassword(scope), v = value === temp;
                    ctrl.$setValidity('match', v);
                    return value;
                };
                ctrl.$parsers.unshift(validator);
                ctrl.$formatters.push(validator);
                attrs.$observe('zfMatch', function () {
                    validator(ctrl.$viewValue);
                });
            };
        }
        zfMatchDirective.factory = function () {
            var directive = function ($parse) { return new zfMatchDirective($parse); };
            directive.$inject = ['$parse'];
            return directive;
        };
        return zfMatchDirective;
    })();
    zombieApp.zfMatchDirective = zfMatchDirective;
    //Don't make your own directives start with ng (bad convention). 
    // Keep angular stuff using ng. Renamed to zfMatch. (ZombieFist)
    angular.module('zombieApp').directive('zfMatch', zfMatchDirective.factory());
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=zfMatch.directive.js.map