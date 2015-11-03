var RocBookAngular;
(function (RocBookAngular) {
    angular.module('RocBookAngular', ['ngRoute', 'ngResource', 'ngMessages', 'ui.bootstrap', 'ngMaterial'])
        .config(function ($routeProvider, $locationProvider) {
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
        .constant('WebApi', '/api');
})(RocBookAngular || (RocBookAngular = {}));
//# sourceMappingURL=app.js.map