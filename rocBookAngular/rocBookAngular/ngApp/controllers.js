var RocBookAngular;
(function (RocBookAngular) {
    var Controllers;
    (function (Controllers) {
        //class DetailsController {
        //    public openDialog() {
        //        this.$mdDialog.show({
        //            controllerAs: 'modal',
        //            templateUrl: '/ngApp/details.html',
        //            clickOutsideToClose: true
        //        })
        //    }
        //    constructor(private $mdDialog: angular.material.IDialogService) { }
        //}
        //angular.module('RocBookAngular').controller('DetailsController', DetailsController);
        //ADD(MODAL)
        var AddModalController = (function () {
            function AddModalController($mdDialog) {
                this.$mdDialog = $mdDialog;
            }
            AddModalController.prototype.openDialog = function () {
                this.$mdDialog.show({
                    controllerAs: 'modal',
                    templateUrl: '/ngApp/add.html',
                    clickOutsideToClose: true
                });
            };
            return AddModalController;
        })();
        angular.module('RocBookAngular').controller('AddModalController', AddModalController);
        //REGISTER(MODAL)
        var RegisterController = (function () {
            function RegisterController($mdDialog) {
                this.$mdDialog = $mdDialog;
            }
            RegisterController.prototype.openDialog = function () {
                this.$mdDialog.show({
                    controllerAs: 'modal',
                    templateUrl: '/ngApp/register.html',
                    clickOutsideToClose: true
                });
            };
            return RegisterController;
        })();
        angular.module('RocBookAngular').controller('RegisterController', RegisterController);
        //LOGIN(MODAL)
        var LoginController = (function () {
            function LoginController($mdDialog) {
                this.$mdDialog = $mdDialog;
            }
            LoginController.prototype.openDialog = function () {
                this.$mdDialog.show({
                    controllerAs: 'modal',
                    templateUrl: '/ngApp/login.html',
                    clickOutsideToClose: true
                });
            };
            return LoginController;
        })();
        angular.module('RocBookAngular').controller('LoginController', LoginController);
        //SPA ROUTING
        var HomeController = (function () {
            function HomeController($route) {
                this.$route = $route;
            }
            return HomeController;
        })();
        angular.module('RocBookAngular').controller('HomeController', HomeController);
        //VIDEO CONTROLLERS
        var VideoListController = (function () {
            function VideoListController(videoService, $sce, $location) {
                this.$sce = $sce;
                this.$location = $location;
                this.videos = videoService.listVideos();
            }
            //public getVid(videolink) {
            //    let url = "http://youtube.com/embed/" + videolink;
            //    return url.toString;
            //}
            VideoListController.prototype.frameSource = function (videolink) {
                return this.$sce.trustAsResourceUrl(videolink);
            };
            VideoListController.prototype.delete = function (id) {
                this.$location.path('/delete/' + id);
            };
            return VideoListController;
        })();
        angular.module('RocBookAngular').controller('VideoListController', VideoListController);
        //EDIT VIDEO
        var VideoEditController = (function () {
            function VideoEditController(videoService, $routeParams, $location) {
                this.videoService = videoService;
                this.$location = $location;
                var id = $routeParams['id'];
                this.videoToEdit = videoService.getVideo(id);
            }
            VideoEditController.prototype.save = function () {
                var _this = this;
                this.videoService.saveVideo(this.videoToEdit).then(function () {
                    _this.$location.path('/');
                });
            };
            return VideoEditController;
        })();
        angular.module('RocBookAngular').controller('VideoEditController', VideoEditController);
        //DELETE VIDEO
        var VideoDeleteController = (function () {
            function VideoDeleteController(videoService, $routeParams, $location) {
                this.videoService = videoService;
                this.$location = $location;
                var id = $routeParams['id'];
                this.videoToDelete = videoService.getVideo(id);
            }
            VideoDeleteController.prototype.delete = function () {
                var _this = this;
                this.videoService.deleteVideo(this.videoToDelete.id).then(function () {
                    _this.$location.path('/search');
                });
            };
            return VideoDeleteController;
        })();
        angular.module('RocBookAngular').controller('VideoDeleteController', VideoDeleteController);
        //ADD VIDEO
        var VideoAddController = (function () {
            function VideoAddController(videoService, $location) {
                this.videoService = videoService;
                this.$location = $location;
            }
            VideoAddController.prototype.save = function () {
                var _this = this;
                this.videoService.saveVideo(this.videoToAdd).then(function () {
                    _this.$location.path('/');
                });
            };
            return VideoAddController;
        })();
        angular.module('RocBookAngular').controller('VideoAddController', VideoAddController);
    })(Controllers = RocBookAngular.Controllers || (RocBookAngular.Controllers = {}));
})(RocBookAngular || (RocBookAngular = {}));
//# sourceMappingURL=controllers.js.map