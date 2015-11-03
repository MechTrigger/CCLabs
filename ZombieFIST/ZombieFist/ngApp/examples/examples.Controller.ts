namespace zombieApp.examples {

    // This controls the One Column View. 

    class examplesController {
        static $inject: string[] = ['$aside', '$uibModal'];

        // The "IAsideService" is our definitely typed definition for the angular aside div, cuz they didn't have one.
        constructor(private $aside: ng.aside.IAsideService, private $uibModal: ng.ui.bootstrap.IModalService) {
        }

        names: Array<string> = ['Joe', 'Bob', 'Sam', 'Grandma'];
        selectedName: string = '';

        // This is for the modal, and opens it when a the click you wire up the click / button
        // (wire that part up in the view itself, an a tag, ng-click and specify the name of this thing as vm.etc etc)
        openModal() {
            this.$uibModal.open({

                controller: 'exampleModalController',
                controllerAs: 'vm',
                templateUrl: '/ngApp/examples/modal.html', // This is the view you want to show in the modal/aside

                // RESOLVE SECTION: sends this controller's "names" to the modal's controller (example.controllers)
                resolve: { names: () => this.names }        

                // a promise that once the user has done whatever they need to do, they get the data back.
            }).result.then((name) => {

                // This is where the name chosen comes back to THIS controller (examples.controllers)
                // We will rename these files, no worries.  
                // Once you get the data back, you can do whatever you want w/ it, like save.
                this.selectedName = name;
            });
        }

        // This is the code that the Aside service provides.
        // This is the Angular service, written in Javascript, that opens the 
        // aside, and handles passing in the data and handing it back. 
        // You would use this while feeding in the list and items stuff.  
        openAside() {
            this.$aside.open({
                controller: 'exampleModalController',
                controllerAs: 'vm',
                placement: 'right',
                size: 'sm',
                templateUrl: '/ngApp/examples/modal.html',

                // This says "pass this.names as names to the controller". 
                // While this div is not a modal, it uses the same modal service. 
                // The Aside div inherits from Angular UI's bootstrap modal. Like a modal but easier.  
                resolve: { names: () => this.names }     

            }).result.then((name) => {

                // get back the selected name from the modal's controller
                this.selectedName = name;
            });
        }
    }

    angular.module('zombieApp').controller('examplesController', examplesController);
}  