namespace zombieApp.examples {

    // This is the Controller for the modal

    class exampleModalController {
        static $inject: string[] = ['$modalInstance', 'names'];

        // Names comes in from the example.controller 
        constructor(private $modalInstance: ng.ui.bootstrap.IModalServiceInstance, names: Array<string>) {
            this.names = names;
            this.selectedName = '';
        }

        names: Array<string> = [];
        selectedName: string;

        // whatever is in the parenthesis for close is what gets sent back to the example.controller as "result"
        // Both the modal and aside div, are sharing this code (it's the buttons that open them, found on modal.html)
        ok() {
            this.$modalInstance.close(this.selectedName);
        }

        // This sends back an empty string becuase nothing was chosen (if this part runs)
        // Both the modal and aside div, are sharing this code (it's the buttons that open them, found on modal.html)
        cancel() {
            this.$modalInstance.close('');
        }
    }

    angular.module('zombieApp').controller('exampleModalController', exampleModalController);
}  