var zombieApp;
(function (zombieApp) {
    var examples;
    (function (examples) {
        var routes = (function () {
            function routes() {
            }
            routes.configure = function ($routeProvider) {
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
            };
            return routes;
        })();
        examples.routes = routes;
    })(examples = zombieApp.examples || (zombieApp.examples = {}));
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=_routes.js.map