namespace zombieApp.locations {
    'use strict';


    export interface IPlanLocationService {
        getAllLocations(): ng.IHttpPromise<Array<locationVm>>;
        getLocation(id: number): ng.IHttpPromise<locationVm>;
        saveLocation(model: locationVm): ng.IHttpPromise<locationVm>;
        deleteLocation(id: number): ng.IHttpPromise<Object>;
    }


    export class planLocationService implements IPlanLocationService {
        static $inject: string[] = ['$http', '$q'];


        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
        }

        getAllLocations(): ng.IHttpPromise<Array<locationVm>> {
            return this.$http.get<Array<locationVm>>('/api/locations');
        }

        getLocation(id: number): ng.IHttpPromise<locationVm> {
            return this.$http.get<locationVm>('/api/location/' + id);
        }

        saveLocation(model: locationVm): ng.IHttpPromise<Object> {
            return this.$http.post('api/location', model);
        }
         
        deleteLocation(id: number): ng.IHttpPromise<Object> {
            return this.$http.delete('/api/location/' + id);
        }
    }

    angular.module('zombieApp').service('planLocationService', planLocationService);
}