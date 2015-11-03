namespace RocBookAngular {

    angular.module('RocBookAngular', ['ngRoute', 'ngResource', 'ngMessages', 'ui.bootstrap','ngMaterial'])

        .config(($routeProvider: ng.route.IRouteProvider,
            $locationProvider: ng.ILocationProvider) => {
            $routeProvider
                .when('/', {
                    templateUrl: "/ngApp/home.html",
                    controller: "HomeController as vm"
                })
                .when('/add', {
                    templateUrl: "/ngApp/add.html",
                    controller: "VideoAddController as vm"
                })
                .when('/search', {
                    templateUrl: "/ngApp/search.html",
                    controller: "VideoListController as vm"
                }).when('/delete/:id', {
                    templateUrl: "/ngApp/delete.html",
                    controller: "VideoDeleteController as vm"
                })
                .when('/register', {
                    templateUrl: "/ngApp/register.html",
                    controller: "AccountController as vm"
                })
                .otherwise('/');

            $locationProvider.html5Mode(true);
        })

        .constant('WebApi', '/api')

        //.config(function ($mdThemingProvider) {
        //    $mdThemingProvider.theme('default')
        //        .dark();
        //});
}