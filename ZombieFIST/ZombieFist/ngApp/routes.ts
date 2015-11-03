namespace zombieApp {

    export class routes {

        static configure($routeProvider: ng.route.IRouteProvider): void {

            $routeProvider

            // Each view needs a route, and each route needs a url, a template Url (file name). 
            // And if there is any interactivity, it needs a controller, and "vm" 
            // Vm is what the controller will be referrred to as on the page.

         
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

                // defense menu links
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

                // survival plan links
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
                
                // vehicle menu links
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
                
                // survival menu links
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

                // travel menu links
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
                .otherwise('/enter'); {
                templateUrl: '/ngApp/content/enter.html'
            }
        }
    }
}
