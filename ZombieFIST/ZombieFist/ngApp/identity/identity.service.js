//  moved identity logic from controller to service
var zombieApp;
(function (zombieApp) {
    var identity;
    (function (identity) {
        'use strict';
        var identityService = (function () {
            function identityService($http, $window, $location) {
                this.$http = $http;
                this.$window = $window;
                this.$location = $location;
                this.profile = new identity.userProfileViewModel();
            }
            identityService.prototype.register = function (model) {
                return this.$http.post('/api/account/register', model);
            };
            identityService.prototype.login = function (email, password) {
                var _this = this;
                var data = 'grant_type=password&username=' + email + '&password=' + password;
                return this.$http.post('/token', data, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function (result) {
                    _this.$window.sessionStorage.setItem('token', result.access_token);
                    _this.$http.get('api/account/profile').success(function (response) {
                        response.isAuthenticated = true;
                        _this.profile = response;
                        _this.$window.sessionStorage.setItem('profile', JSON.stringify(_this.profile));
                        _this.$location.path('/home');
                    });
                });
            };
            identityService.prototype.getProfile = function () {
                var json = this.$window.sessionStorage.getItem('profile');
                return JSON.parse(json);
            };
            identityService.prototype.logout = function () {
                var _this = this;
                this.$http.post('/api/account/logout', null).success(function () {
                    _this.$window.sessionStorage.removeItem('token');
                    _this.$window.sessionStorage.removeItem('profile');
                    _this.$location.path('/login');
                });
            };
            identityService.$inject = ['$http', '$window', '$location'];
            return identityService;
        })();
        identity.identityService = identityService;
        angular.module('zombieApp').service('identityService', identityService);
    })(identity = zombieApp.identity || (zombieApp.identity = {}));
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=identity.service.js.map