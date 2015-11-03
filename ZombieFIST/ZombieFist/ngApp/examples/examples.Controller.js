var zombieApp;
(function (zombieApp) {
    var examples;
    (function (examples) {
        // This controls the One Column View. 
        var examplesController = (function () {
            // The "IAsideService" is our definitely typed definition for the angular aside div, cuz they didn't have one.
            function examplesController($aside, $uibModal) {
                this.$aside = $aside;
                this.$uibModal = $uibModal;
                this.names = ['Joe', 'Bob', 'Sam', 'Grandma'];
                this.selectedName = '';
            }
            // This is for the modal, and opens it when a the click you wire up the click / button
            // (wire that part up in the view itself, an a tag, ng-click and specify the name of this thing as vm.etc etc)
            examplesController.prototype.openModal = function () {
                var _this = this;
                this.$uibModal.open({
                    controller: 'exampleModalController',
                    controllerAs: 'vm',
                    templateUrl: '/ngApp/examples/modal.html',
                    // RESOLVE SECTION: sends this controller's "names" to the modal's controller (example.controllers)
                    resolve: { names: function () { return _this.names; } }
                }).result.then(function (name) {
                    // This is where the name chosen comes back to THIS controller (examples.controllers)
                    // We will rename these files, no worries.  
                    // Once you get the data back, you can do whatever you want w/ it, like save.
                    _this.selectedName = name;
                });
            };
            // This is the code that the Aside service provides.
            // This is the Angular service, written in Javascript, that opens the 
            // aside, and handles passing in the data and handing it back. 
            // You would use this while feeding in the list and items stuff.  
            examplesController.prototype.openAside = function () {
                var _this = this;
                this.$aside.open({
                    controller: 'exampleModalController',
                    controllerAs: 'vm',
                    placement: 'right',
                    size: 'sm',
                    templateUrl: '/ngApp/examples/modal.html',
                    // This says "pass this.names as names to the controller". 
                    // While this div is not a modal, it uses the same modal service. 
                    // The Aside div inherits from Angular UI's bootstrap modal. Like a modal but easier.  
                    resolve: { names: function () { return _this.names; } }
                }).result.then(function (name) {
                    // get back the selected name from the modal's controller
                    _this.selectedName = name;
                });
            };
            examplesController.$inject = ['$aside', '$uibModal'];
            return examplesController;
        })();
        angular.module('zombieApp').controller('examplesController', examplesController);
    })(examples = zombieApp.examples || (zombieApp.examples = {}));
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=examples.controller.js.map