var zombieApp;
(function (zombieApp) {
    var examples;
    (function (examples) {
        // This is the Controller for the modal
        var exampleModalController = (function () {
            // Names comes in from the example.controller 
            function exampleModalController($modalInstance, names) {
                this.$modalInstance = $modalInstance;
                this.names = [];
                this.names = names;
                this.selectedName = '';
            }
            // whatever is in the parenthesis for close is what gets sent back to the example.controller as "result"
            // Both the modal and aside div, are sharing this code (it's the buttons that open them, found on modal.html)
            exampleModalController.prototype.ok = function () {
                this.$modalInstance.close(this.selectedName);
            };
            // This sends back an empty string becuase nothing was chosen (if this part runs)
            // Both the modal and aside div, are sharing this code (it's the buttons that open them, found on modal.html)
            exampleModalController.prototype.cancel = function () {
                this.$modalInstance.close('');
            };
            exampleModalController.$inject = ['$modalInstance', 'names'];
            return exampleModalController;
        })();
        angular.module('zombieApp').controller('exampleModalController', exampleModalController);
    })(examples = zombieApp.examples || (zombieApp.examples = {}));
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=exampleModal.controller.js.map