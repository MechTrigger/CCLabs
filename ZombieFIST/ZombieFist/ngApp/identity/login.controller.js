var zombieApp;
(function (zombieApp) {
    var identity;
    (function (identity) {
        var loginController = (function () {
            function loginController(identityService) {
                this.identityService = identityService;
                this.loginError = false;
                this.isLoggingIn = false;
            }
            loginController.prototype.login = function () {
                var _this = this;
                if (this.loginForm.$valid) {
                    this.isLoggingIn = true;
                    this.identityService.login(this.email, this.password).error(function () {
                        _this.loginError = true;
                        _this.isLoggingIn = false;
                    });
                }
            };
            loginController.$inject = ['identityService', '$window'];
            return loginController;
        })();
        angular.module('zombieApp').controller('loginController', loginController);
    })(identity = zombieApp.identity || (zombieApp.identity = {}));
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=login.controller.js.map