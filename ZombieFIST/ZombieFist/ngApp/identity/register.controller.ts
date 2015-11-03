namespace zombieApp.identity {

    class registerController {
        static $inject: string[] = ['identityService'];

        constructor(private identityService: IIdentityService) { 
        }

        newUser: registerViewModel;
        registrationForm: ng.IFormController;
        registrationError: boolean = false;
        registrationSuccess: boolean = false;
        isRegistering: boolean = false;

        register() {
            this.registrationError = this.registrationSuccess = false;

            if (this.registrationForm.$valid) {
                this.isRegistering = true;
                this.identityService.register(this.newUser).success(() => {
                    this.registrationSuccess = true;
                    this.isRegistering = false;
                }).error(() => {
                    this.registrationError = true;
                    this.isRegistering = false;
                });
            }
        }
    }

    angular.module('zombieApp').controller('registerController', registerController);
}