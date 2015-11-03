var zombieApp;
(function (zombieApp) {
    // Listing these modules in an easier to keep track of list.
    var otherModules = [
        'ngAnimate',
        'ngMessages',
        'ngRoute',
        'ui.bootstrap',
        'ngAside' // angular aside: github.com/dbtek/angular-aside
    ];
    angular.module('zombieApp', otherModules).config(function ($routeProvider, $locationProvider, $httpProvider) {
        // Configuring layout examples them seperately to make it 
        // easier to keep track of what our app is actually using.
        zombieApp.examples.routes.configure($routeProvider);
        // This calls the routes the route.configure to configure the routes, and THAT is in routes.ts in ngApp
        zombieApp.routes.configure($routeProvider);
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
    });
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=module.js.map