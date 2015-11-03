namespace zombieApp.lists {


    class listsController {
        static $inject: string[] = ['planListService', 'identityService'];


        constructor(private planListService: IPlanListService, private identityService: identity.identityService) {
            
            // these lines get the profile for the currently logged in user,
            // and if they are not logged in, we redirect them back to the login page
            var user = this.identityService.getProfile();
            if (!user.isAuthenticated) {
                this.identityService.logout();
            }

            this.load();
        }


        lists: Array<planListViewModel> = new Array<planListViewModel>();
        newListName: string = '';
        newListError: boolean = false;


        private load() {
            this.planListService.getAllLists().success((lists) => {
                this.lists = lists;
            });
        }

        addList() {
            this.newListError = this.newListName == null || this.newListName.length === 0;
            if (!this.newListError) {
                var id = 0; // new list ids start at zero
                this.planListService.saveList(id, this.newListName).success(() => {
                    this.load();
                    this.newListName = '';
                });
            }
        }

        editList(model: planListViewModel) {
            if (model.name.length > 0) {
                this.planListService.saveList(model.id, model.name).success(() => {
                    this.load();
                });
            }
        }

        deleteList(id: number) {
            this.planListService.deleteList(id).success(() => {
                this.load();
            });
        }

        addItem(list: planListViewModel) {
            list.newItemError = list.newItem == null || list.newItem == undefined || list.newItem.length === 0;
            if (!list.newItemError) {
                var id = 0; // new item ids start at zero
                this.planListService.saveItem(list.id, id, list.newItem).success(() => {
                    this.load();
                });
            }
        }

        editItem(model: planListItemViewModel) {
            if (model.text.length > 0) {
                this.planListService.saveItem(model.listId, model.id, model.text).success(() => {
                    this.load();
                });
            }
        }

        deleteItem(id: number) {
            this.planListService.deleteItem(id).success(() => {
                this.load();
            });
        }
    }

    angular.module('zombieApp').controller('listsController', listsController);
}