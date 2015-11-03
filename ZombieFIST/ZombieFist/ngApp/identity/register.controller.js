var zombieApp;
(function (zombieApp) {
    var identity;
    (function (identity) {
        var registerController = (function () {
            function registerController(identityService) {
                this.identityService = identityService;
                this.registrationError = false;
                this.registrationSuccess = false;
                this.isRegistering = false;
            }
            registerController.prototype.register = function () {
                var _this = this;
                this.registrationError = this.registrationSuccess = false;
                if (this.registrationForm.$valid) {
                    this.isRegistering = true;
                    this.identityService.register(this.newUser).success(function () {
                        _this.registrationSuccess = true;
                        _this.isRegistering = false;
                    }).error(function () {
                        _this.registrationError = true;
                        _this.isRegistering = false;
                    });
                }
            };
            registerController.$inject = ['identityService'];
            return registerController;
        })();
        angular.module('zombieApp').controller('registerController', registerController);
    })(identity = zombieApp.identity || (zombieApp.identity = {}));
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=register.controller.js.map