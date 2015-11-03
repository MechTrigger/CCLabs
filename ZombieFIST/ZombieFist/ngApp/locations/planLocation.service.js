var zombieApp;
(function (zombieApp) {
    var locations;
    (function (locations) {
        'use strict';
        var planLocationService = (function () {
            function planLocationService($http, $q) {
                this.$http = $http;
                this.$q = $q;
            }
            planLocationService.prototype.getAllLocations = function () {
                return this.$http.get('/api/locations');
            };
            planLocationService.prototype.getLocation = function (id) {
                return this.$http.get('/api/location/' + id);
            };
            planLocationService.prototype.saveLocation = function (model) {
                return this.$http.post('api/location', model);
            };
            planLocationService.prototype.deleteLocation = function (id) {
                return this.$http.delete('/api/location/' + id);
            };
            planLocationService.$inject = ['$http', '$q'];
            return planLocationService;
        })();
        locations.planLocationService = planLocationService;
        angular.module('zombieApp').service('planLocationService', planLocationService);
    })(locations = zombieApp.locations || (zombieApp.locations = {}));
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=planLocation.service.js.map