//----------------------Login Token------------------------
//  converted to TypeScript class
namespace zombieApp {   
    'use strict';

    
    export class authInterceptor {
        public static $inject = ['$q', '$window'];

        constructor(private $q: ng.IQService, private $window: ng.IWindowService, private $location: ng.ILocationService) {
        }

        public request = (config): any => {
            config.headers = config.headers || {};
            let token = this.$window.sessionStorage.getItem('token');
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }

        public response = (response): any => {
            if (response.status === 401) {
                this.$location.path('/login');
            }
            return response || this.$q.when(response);
        }


        static factory(): ng.IHttpInterceptorFactory {

            const interceptor: ng.IHttpInterceptorFactory =
                ($q: ng.IQService, $window: ng.IWindowService, $location: ng.ILocationService) =>
                    new authInterceptor($q, $window, $location);

            interceptor.$inject = ['$q', '$window', '$location'];
            return interceptor;
        }
    }

    angular.module('zombieApp').factory('authInterceptor', authInterceptor.factory());
}
