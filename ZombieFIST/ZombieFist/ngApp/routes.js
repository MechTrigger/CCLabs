var zombieApp;
(function (zombieApp) {
    var routes = (function () {
        function routes() {
        }
        routes.configure = function ($routeProvider) {
            $routeProvider
                .when('/enter', {
                templateUrl: '/ngApp/content/enter.html',
            })
                .when('/home', {
                controller: 'homeController',
                controllerAs: 'vm',
                templateUrl: '/ngApp/content/home.html'
            })
                .when('/login', {
                templateUrl: '/ngApp/identity/login.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
                .when('/register', {
                templateUrl: '/ngApp/identity/register.html',
                controller: 'registerController',
                controllerAs: 'vm'
            })
                .when('/defense/readytofight', {
                templateUrl: '/ngApp/defense/readytofight.html'
            })
                .when('/defense/handguns', {
                templateUrl: '/ngApp/defense/handguns.html'
            })
                .when('/defense/rifles', {
                templateUrl: '/ngApp/defense/rifles.html'
            })
                .when('/defense/shotguns', {
                templateUrl: '/ngApp/defense/shotguns.html'
            })
                .when('/defense/archery', {
                templateUrl: '/ngApp/defense/archery.html'
            })
                .when('/defense/blades', {
                templateUrl: '/ngApp/defense/blades.html'
            })
                .when('/defense/tools', {
                templateUrl: '/ngApp/defense/tools.html'
            })
                .when('/defense/homemade', {
                templateUrl: '/ngApp/defense/homemade.html'
            })
                .when('/defense/governor101', {
                templateUrl: '/ngApp/defense/governor101.html'
            })
                .when('/defense/weaponsofwar', {
                templateUrl: '/ngApp/defense/weaponsofwar.html'
            })
                .when('/defense/realestate', {
                templateUrl: '/ngApp/defense/realestate.html'
            })
                .when('/defense/safehousetop5', {
                templateUrl: '/ngApp/defense/safehousetop5.html'
            })
                .when('/plan/lists', {
                templateUrl: '/ngApp/lists/lists.html',
                controller: 'listsController',
                controllerAs: 'vm'
            })
                .when('/plan/locations', {
                templateUrl: '/ngApp/locations/locations.html',
                controller: 'locationsController',
                controllerAs: 'vm'
            })
                .when('/vehicles/boostingcars', {
                templateUrl: '/ngApp/vehicles/boostingcars.html'
            })
                .when('/vehicles/cars', {
                templateUrl: '/ngApp/vehicles/cars.html'
            })
                .when('/vehicles/vans', {
                templateUrl: '/ngApp/vehicles/vans.html'
            })
                .when('/vehicles/trucks', {
                templateUrl: '/ngApp/vehicles/trucks.html'
            })
                .when('/vehicles/suvs', {
                templateUrl: '/ngApp/vehicles/suvs.html'
            })
                .when('/vehicles/battleready', {
                templateUrl: '/ngApp/vehicles/battleready.html'
            })
                .when('/survival/donteatgrandma', {
                templateUrl: '/ngApp/survival/donteatgrandma.html'
            })
                .when('/survival/water', {
                templateUrl: '/ngApp/survival/water.html'
            })
                .when('/survival/food', {
                templateUrl: '/ngApp/survival/food.html'
            })
                .when('/survival/othergear', {
                templateUrl: '/ngApp/survival/othergear.html'
            })
                .when('/travel/bestlaidplans', {
                templateUrl: '/ngApp/travel/bestlaidplans.html'
            })
                .when('/travel/noplan', {
                templateUrl: '/ngApp/travel/noplan.html'
            })
                .when('/travel/gonorth', {
                templateUrl: '/ngApp/travel/gonorth.html'
            })
                .when('/travel/whereto', {
                templateUrl: '/ngApp/travel/whereto.html'
            })
                .when('/travel/desertoasis', {
                templateUrl: '/ngApp/travel/desertoasis.html'
            })
                .otherwise('/enter');
            {
                templateUrl: '/ngApp/content/enter.html';
            }
        };
        return routes;
    })();
    zombieApp.routes = routes;
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=routes.js.map