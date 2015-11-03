namespace zombieApp.identity {

    class loginController {
        static $inject: string[] = ['identityService', '$window'];

        constructor(private identityService: IIdentityService) {
        }

        email: string;
        password: string;
        loginForm: ng.IFormController;
        loginError: boolean = false;
        isLoggingIn: boolean = false;

        login() {
            if (this.loginForm.$valid) {
                this.isLoggingIn = true;
                this.identityService.login(this.email, this.password).error(
                    () => {
                        this.loginError = true;
                        this.isLoggingIn = false;
                    }
                );
            }   
        }
    }

    angular.module('zombieApp').controller('loginController', loginController);
}