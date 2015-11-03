//  moved identity logic from controller to service
namespace zombieApp.lists {
    'use strict';


    export interface IPlanListService {
        getAllLists(): ng.IHttpPromise<Array<planListViewModel>>; 
        getList(id: number): ng.IHttpPromise<planListViewModel>;
        saveItem(listId: number, id: number, text: string): ng.IHttpPromise<Object>;
        deleteItem(itemId: number): ng.IHttpPromise<Object>;
        saveList(id: number, name: string): ng.IHttpPromise<Object>;
        deleteList(listId: number): ng.IHttpPromise<Object>;
    }


    export class planListService implements IPlanListService {
        static $inject: string[] = ['$http'];


        constructor(private $http: ng.IHttpService) {
        }


        getAllLists(): ng.IHttpPromise<Array<planListViewModel>> {
            return this.$http.get('/api/lists');
        }

        getList(id: number): ng.IHttpPromise<planListViewModel> {
            return this.$http.get('/api/list' + id);
        }

        saveList(id: number, name: string): ng.IHttpPromise<Object> {
            var model = new savePlanListViewModel();
            model.id = id;
            model.name = name;
            return this.$http.post('api/list', model);
        }

        deleteList(listId: number): ng.IHttpPromise<Object> {
            return this.$http.delete('/api/list/' + listId);
        }

        saveItem(listId: number, id: number, text: string): ng.IHttpPromise<Object> {
            var model = new savePlanListItemViewModel();
            model.id = id;
            model.listId = listId;
            model.text = text;
            return this.$http.post('/api/list/item', model);
        }

        deleteItem(itemId: number): ng.IHttpPromise<Object> {
            return this.$http.delete('/api/list/item/' + itemId);
        }
    }

    angular.module('zombieApp').service('planListService', planListService);
}