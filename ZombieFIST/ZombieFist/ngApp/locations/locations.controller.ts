namespace zombieApp.locations {

    interface IMapScope extends ng.IScope {
        map: any;
        doRefresh: boolean;
        control: any;
    }


    class locationsController {
        static $inject: string[] = ['planLocationService', 'identityService', 'mapService', '$q'];


        constructor(private planLocationService: IPlanLocationService, private identityService: identity.identityService, private mapService: IMapService, private $q: ng.IQService) {
            
            // these lines get the profile for the currently logged in user,
            // and if they are not logged in, we redirect them back to the login page
            var user = this.identityService.getProfile();
            if (!user.isAuthenticated) {
                this.identityService.logout();
            }

            this.load();
        }


        locations: Array<locationVm> = new Array<locationVm>();
        
        load() {

            this.planLocationService.getAllLocations().success((locations) => {
                this.locations = locations;
                this.mapService.createMap('#mapDiv', this.locations);
                this.mapService.onLocationChanged((loc) => this.saveLocation(loc));
                this.mapService.onLocationDeleted((loc) => this.deleteLocation(loc));
            });
        }

        saveLocation(location: locationVm): ng.IPromise<number> {

            var deferred = this.$q.defer<number>();

            this.planLocationService.saveLocation(location)
                                    .success(loc => deferred.resolve(loc.id));

            return deferred.promise;
        }

        deleteLocation(location: locationVm): ng.IPromise<number> {

            var deferred = this.$q.defer<number>();

            this.planLocationService.deleteLocation(location.id)
                .success(() => deferred.resolve(location.id));

            return deferred.promise;
        }
    }

    angular.module('zombieApp').controller('locationsController', locationsController);
}