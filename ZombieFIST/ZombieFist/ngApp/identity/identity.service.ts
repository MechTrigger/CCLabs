//  moved identity logic from controller to service
namespace zombieApp.identity {
    'use strict';


    export interface IIdentityService {
        register: (model: registerViewModel) => ng.IHttpPromise<Object>;
        login(email: string, password: string): ng.IHttpPromise<Object>;
        logout(): void; 
        getProfile(): userProfileViewModel;
    }


    export class identityService implements IIdentityService {
        static $inject: string[] = ['$http', '$window', '$location'];


        constructor(private $http: ng.IHttpService, private $window: ng.IWindowService, private $location: ng.ILocationService) {
        }


        private profile: userProfileViewModel = new userProfileViewModel();
                                                                   

        register(model: registerViewModel): ng.IHttpPromise<Object> {
            return this.$http.post('/api/account/register', model);
        }


        login(email: string, password: string): ng.IHttpPromise<Object> {
            let data = 'grant_type=password&username=' + email + '&password=' + password;

            return this.$http.post('/token', data, {  
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }   
            }).success((result: any) => {

                this.$window.sessionStorage.setItem('token', result.access_token);

                this.$http.get('api/account/profile').success((response: userProfileViewModel) => {
                    response.isAuthenticated = true;
                    this.profile = response;
                    this.$window.sessionStorage.setItem('profile', JSON.stringify(this.profile));
                    this.$location.path('/home');
                });                          

            });
        }


        getProfile(): userProfileViewModel {
            let json = this.$window.sessionStorage.getItem('profile');
            return JSON.parse(json);
        }

        logout(): void {
            this.$http.post('/api/account/logout', null).success(() => {
                this.$window.sessionStorage.removeItem('token');
                this.$window.sessionStorage.removeItem('profile');
                this.$location.path('/login');
            });
        }
    }

    angular.module('zombieApp').service('identityService', identityService);
}