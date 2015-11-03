//  moved identity logic from controller to service
var zombieApp;
(function (zombieApp) {
    var lists;
    (function (lists) {
        'use strict';
        var planListService = (function () {
            function planListService($http) {
                this.$http = $http;
            }
            planListService.prototype.getAllLists = function () {
                return this.$http.get('/api/lists');
            };
            planListService.prototype.getList = function (id) {
                return this.$http.get('/api/list' + id);
            };
            planListService.prototype.saveList = function (id, name) {
                var model = new lists.savePlanListViewModel();
                model.id = id;
                model.name = name;
                return this.$http.post('api/list', model);
            };
            planListService.prototype.deleteList = function (listId) {
                return this.$http.delete('/api/list/' + listId);
            };
            planListService.prototype.saveItem = function (listId, id, text) {
                var model = new lists.savePlanListItemViewModel();
                model.id = id;
                model.listId = listId;
                model.text = text;
                return this.$http.post('/api/list/item', model);
            };
            planListService.prototype.deleteItem = function (itemId) {
                return this.$http.delete('/api/list/item/' + itemId);
            };
            planListService.$inject = ['$http'];
            return planListService;
        })();
        lists.planListService = planListService;
        angular.module('zombieApp').service('planListService', planListService);
    })(lists = zombieApp.lists || (zombieApp.lists = {}));
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=planList.service.js.map