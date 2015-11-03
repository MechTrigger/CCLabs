//----------------------Login Token------------------------
//  converted to TypeScript class
var zombieApp;
(function (zombieApp) {
    'use strict';
    var authInterceptor = (function () {
        function authInterceptor($q, $window, $location) {
            var _this = this;
            this.$q = $q;
            this.$window = $window;
            this.$location = $location;
            this.request = function (config) {
                config.headers = config.headers || {};
                var token = _this.$window.sessionStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            };
            this.response = function (response) {
                if (response.status === 401) {
                    _this.$location.path('/login');
                }
                return response || _this.$q.when(response);
            };
        }
        authInterceptor.factory = function () {
            var interceptor = function ($q, $window, $location) {
                return new authInterceptor($q, $window, $location);
            };
            interceptor.$inject = ['$q', '$window', '$location'];
            return interceptor;
        };
        authInterceptor.$inject = ['$q', '$window'];
        return authInterceptor;
    })();
    zombieApp.authInterceptor = authInterceptor;
    angular.module('zombieApp').factory('authInterceptor', authInterceptor.factory());
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=authInterceptor.js.map