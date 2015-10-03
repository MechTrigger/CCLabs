var TodoApp;
(function (TodoApp) {
    "use strict";
    var FocusDirective = (function () {
        function FocusDirective($parse) {
            var _this = this;
            this.$parse = $parse;
            this.restrict = 'A';
            this.link = function (scope, element, attrs, ctrl) {
                var model = _this.$parse(attrs.ngFocus);
                scope.$watch(model, function (value) {
                    if (value === true) {
                        element[0].focus();
                    }
                });
                element.bind('blur', function () {
                    scope.$apply(model.assign(scope, false));
                });
            };
        }
        FocusDirective.factory = function () {
            var directive = function ($parse) {
                return new FocusDirective($parse);
            };
            directive.$inject = ['$parse'];
            return directive;
        };
        return FocusDirective;
    })();
    TodoApp.FocusDirective = FocusDirective;
    angular.module("todoApp").directive("ngFocus", FocusDirective.factory());
})(TodoApp || (TodoApp = {}));
//# sourceMappingURL=FocusDirective.js.map