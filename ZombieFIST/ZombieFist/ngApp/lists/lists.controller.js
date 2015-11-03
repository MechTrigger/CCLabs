var zombieApp;
(function (zombieApp) {
    var lists;
    (function (lists_1) {
        var listsController = (function () {
            function listsController(planListService, identityService) {
                this.planListService = planListService;
                this.identityService = identityService;
                this.lists = new Array();
                this.newListName = '';
                this.newListError = false;
                // these lines get the profile for the currently logged in user,
                // and if they are not logged in, we redirect them back to the login page
                var user = this.identityService.getProfile();
                if (!user.isAuthenticated) {
                    this.identityService.logout();
                }
                this.load();
            }
            listsController.prototype.load = function () {
                var _this = this;
                this.planListService.getAllLists().success(function (lists) {
                    _this.lists = lists;
                });
            };
            listsController.prototype.addList = function () {
                var _this = this;
                this.newListError = this.newListName == null || this.newListName.length === 0;
                if (!this.newListError) {
                    var id = 0; // new list ids start at zero
                    this.planListService.saveList(id, this.newListName).success(function () {
                        _this.load();
                        _this.newListName = '';
                    });
                }
            };
            listsController.prototype.editList = function (model) {
                var _this = this;
                if (model.name.length > 0) {
                    this.planListService.saveList(model.id, model.name).success(function () {
                        _this.load();
                    });
                }
            };
            listsController.prototype.deleteList = function (id) {
                var _this = this;
                this.planListService.deleteList(id).success(function () {
                    _this.load();
                });
            };
            listsController.prototype.addItem = function (list) {
                var _this = this;
                list.newItemError = list.newItem == null || list.newItem == undefined || list.newItem.length === 0;
                if (!list.newItemError) {
                    var id = 0; // new item ids start at zero
                    this.planListService.saveItem(list.id, id, list.newItem).success(function () {
                        _this.load();
                    });
                }
            };
            listsController.prototype.editItem = function (model) {
                var _this = this;
                if (model.text.length > 0) {
                    this.planListService.saveItem(model.listId, model.id, model.text).success(function () {
                        _this.load();
                    });
                }
            };
            listsController.prototype.deleteItem = function (id) {
                var _this = this;
                this.planListService.deleteItem(id).success(function () {
                    _this.load();
                });
            };
            listsController.$inject = ['planListService', 'identityService'];
            return listsController;
        })();
        angular.module('zombieApp').controller('listsController', listsController);
    })(lists = zombieApp.lists || (zombieApp.lists = {}));
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=lists.controller.js.map