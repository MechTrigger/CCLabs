namespace zombieApp.examples {

    // our model class for holding the form fields. 
    class contactFormModel {
        name: string;
        email: string;
        messages: string;
    }


    class exampleFormController {
        static $inject: string[] = ['$timeout'];

        constructor(private $timeout: ng.ITimeoutService) {
        }

        model: contactFormModel = new contactFormModel();
        form: ng.IFormController;
        messageSent: boolean = false;

        send() {
            this.form.$submitted = true;
            if (this.form.$valid) {

                // Here we would call an angular service we made that would take the model 
                // and send it to the server via AJAX.Instead we are just going to wait one 
                // second (1000 milliseconds) and then show the success message anyway
                this.$timeout(() => this.messageSent = true, 1000); 
            }
        }
    }

    angular.module('zombieApp').controller('exampleFormController', exampleFormController);
}   