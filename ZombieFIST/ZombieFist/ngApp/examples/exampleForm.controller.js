var zombieApp;
(function (zombieApp) {
    var examples;
    (function (examples) {
        // our model class for holding the form fields. 
        var contactFormModel = (function () {
            function contactFormModel() {
            }
            return contactFormModel;
        })();
        var exampleFormController = (function () {
            function exampleFormController($timeout) {
                this.$timeout = $timeout;
                this.model = new contactFormModel();
                this.messageSent = false;
            }
            exampleFormController.prototype.send = function () {
                var _this = this;
                this.form.$submitted = true;
                if (this.form.$valid) {
                    // Here we would call an angular service we made that would take the model 
                    // and send it to the server via AJAX.Instead we are just going to wait one 
                    // second (1000 milliseconds) and then show the success message anyway
                    this.$timeout(function () { return _this.messageSent = true; }, 1000);
                }
            };
            exampleFormController.$inject = ['$timeout'];
            return exampleFormController;
        })();
        angular.module('zombieApp').controller('exampleFormController', exampleFormController);
    })(examples = zombieApp.examples || (zombieApp.examples = {}));
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=exampleForm.controller.js.map