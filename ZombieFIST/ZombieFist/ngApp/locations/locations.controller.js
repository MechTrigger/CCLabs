var zombieApp;
(function (zombieApp) {
    var locations;
    (function (locations_1) {
        var locationsController = (function () {
            function locationsController(planLocationService, identityService, mapService, $q) {
                this.planLocationService = planLocationService;
                this.identityService = identityService;
                this.mapService = mapService;
                this.$q = $q;
                this.locations = new Array();
                // these lines get the profile for the currently logged in user,
                // and if they are not logged in, we redirect them back to the login page
                var user = this.identityService.getProfile();
                if (!user.isAuthenticated) {
                    this.identityService.logout();
                }
                this.load();
            }
            locationsController.prototype.load = function () {
                var _this = this;
                this.planLocationService.getAllLocations().success(function (locations) {
                    _this.locations = locations;
                    _this.mapService.createMap('#mapDiv', _this.locations);
                    _this.mapService.onLocationChanged(function (loc) { return _this.saveLocation(loc); });
                    _this.mapService.onLocationDeleted(function (loc) { return _this.deleteLocation(loc); });
                });
            };
            locationsController.prototype.saveLocation = function (location) {
                var deferred = this.$q.defer();
                this.planLocationService.saveLocation(location)
                    .success(function (loc) { return deferred.resolve(loc.id); });
                return deferred.promise;
            };
            locationsController.prototype.deleteLocation = function (location) {
                var deferred = this.$q.defer();
                this.planLocationService.deleteLocation(location.id)
                    .success(function () { return deferred.resolve(location.id); });
                return deferred.promise;
            };
            locationsController.$inject = ['planLocationService', 'identityService', 'mapService', '$q'];
            return locationsController;
        })();
        angular.module('zombieApp').controller('locationsController', locationsController);
    })(locations = zombieApp.locations || (zombieApp.locations = {}));
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=locations.controller.js.map