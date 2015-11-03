namespace zombieApp {
    'use strict';

    export class zfMatchDirective implements ng.IDirective {
        restrict = 'A';
        require = 'ngModel';

        constructor(private $parse: ng.IParseService) {
        }

        link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => {
            if (!ctrl) return;
            if (!attrs['zfMatch']) return;

            var firstPassword = this.$parse(attrs['zfMatch']);

            var validator = value => {
                var temp = firstPassword(scope),
                    v = value === temp;
                ctrl.$setValidity('match', v);
                return value;
            }

            ctrl.$parsers.unshift(validator);
            ctrl.$formatters.push(validator);
            attrs.$observe('zfMatch', () => {
                validator(ctrl.$viewValue);
            });
        }

        static factory(): ng.IDirectiveFactory {
            const directive: ng.IDirectiveFactory =
                ($parse: ng.IParseService) => new zfMatchDirective($parse);

            directive.$inject = ['$parse'];
            return directive;
        }
    }

    //Don't make your own directives start with ng (bad convention). 
    // Keep angular stuff using ng. Renamed to zfMatch. (ZombieFist)
    angular.module('zombieApp').directive('zfMatch', zfMatchDirective.factory());
}