namespace zombieApp.examples {

    export class routes {

        static configure($routeProvider: ng.route.IRouteProvider): void {

            // This route is just the examples stuff we need to modify names later. 
            // These are the paths for  
            $routeProvider
                .when('/examples/onecolumn', {
                    controller: 'examplesController',
                    controllerAs: 'vm',
                    templateUrl: '/ngApp/examples/onecolumn.html'
                })
                .when('/examples/twocolumn', {
                    controller: 'examplesController',
                    controllerAs: 'vm',
                    templateUrl: '/ngApp/examples/twocolumn.html'
                })
                .when('/examples/billboard', {
                    controller: 'examplesController',
                    controllerAs: 'vm',
                    templateUrl: '/ngApp/examples/billboard.html'
                });
        }
    }
}
