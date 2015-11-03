namespace zombieApp {

    // Listing these modules in an easier to keep track of list.
    var otherModules = [
        'ngAnimate',            // angular.animate
        'ngMessages',           // angular.messages
        'ngRoute',              // angular.route
        'ui.bootstrap',         // angular ui bootstrap
        'ngAside'               // angular aside: github.com/dbtek/angular-aside
    ];

    angular.module('zombieApp', otherModules).config(

        ($routeProvider: ng.route.IRouteProvider,
        $locationProvider: ng.ILocationProvider,
        $httpProvider: ng.IHttpProvider) => {

            // Configuring layout examples them seperately to make it 
            // easier to keep track of what our app is actually using.
            examples.routes.configure($routeProvider);

            // This calls the routes the route.configure to configure the routes, and THAT is in routes.ts in ngApp
            routes.configure($routeProvider);

            $locationProvider.html5Mode(true);
            $httpProvider.interceptors.push('authInterceptor');
        });
} 
