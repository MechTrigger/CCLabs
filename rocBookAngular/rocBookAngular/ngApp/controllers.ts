namespace RocBookAngular.Controllers {

    
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
    class AddModalController {
        public openDialog() {
            this.$mdDialog.show({
                controllerAs: 'modal',
                templateUrl: '/ngApp/add.html',
                clickOutsideToClose: true
            })
        }
        constructor(private $mdDialog: angular.material.IDialogService) { }
    }

    angular.module('RocBookAngular').controller('AddModalController', AddModalController);

    //REGISTER(MODAL)
    class RegisterController {
        public openDialog() {
            this.$mdDialog.show({
                controllerAs: 'modal',
                templateUrl: '/ngApp/register.html',
                clickOutsideToClose: true
            })
        }
        constructor(private $mdDialog: angular.material.IDialogService) { }
    }
    angular.module('RocBookAngular').controller('RegisterController', RegisterController);

    //LOGIN(MODAL)
    class LoginController {
        public openDialog() {
            this.$mdDialog.show({
                controllerAs: 'modal',
                templateUrl: '/ngApp/login.html',
                clickOutsideToClose: true
            })
        }
        constructor(private $mdDialog: angular.material.IDialogService) { }
    }
    angular.module('RocBookAngular').controller('LoginController', LoginController);

    //SPA ROUTING
    class HomeController {
        constructor(
            public $route: ng.route.IRouteService
            ) { }
    }
    angular.module('RocBookAngular').controller('HomeController', HomeController);

   

    

    //VIDEO CONTROLLERS

    class VideoListController {
        public videos
        constructor(videoService: RocBookAngular.Services.VideoService, private $sce: ng.ISCEService, private $location: ng.ILocationService) {
            this.videos = videoService.listVideos();
        }

        //public getVid(videolink) {
        //    let url = "http://youtube.com/embed/" + videolink;
        //    return url.toString;
        //}
        
        public frameSource(videolink:string) {

            return this.$sce.trustAsResourceUrl(videolink);
        }

        public delete(id) {
            this.$location.path('/delete/' + id);
        }

    }

    angular.module('RocBookAngular').controller('VideoListController', VideoListController);


    //EDIT VIDEO
    class VideoEditController {
        public videoToEdit

        public save() {
            this.videoService.saveVideo(this.videoToEdit).then(
                () => {
                    this.$location.path('/');
                }
                );
        }

        constructor
            (
            private videoService: RocBookAngular.Services.VideoService,
            $routeParams: ng.route.IRouteParamsService,
            private $location: ng.ILocationService
            ) {
            let id = $routeParams['id'];
            this.videoToEdit = videoService.getVideo(id);
        }
    }
    angular.module('RocBookAngular').controller('VideoEditController', VideoEditController);

    //DELETE VIDEO
    class VideoDeleteController {
        public videoToDelete

        public delete() {
            this.videoService.deleteVideo(this.videoToDelete.id).then(
                () => {
                    this.$location.path('/search');
                }
                );
        }

        constructor
            (
            private videoService: RocBookAngular.Services.VideoService,
            $routeParams: ng.route.IRouteParamsService,
            private $location: ng.ILocationService
            ) {
            let id = $routeParams['id'];
            this.videoToDelete = videoService.getVideo(id);
        }
    }
    angular.module('RocBookAngular').controller('VideoDeleteController', VideoDeleteController);

    //ADD VIDEO
    class VideoAddController {
        public videoToAdd

        public save() {
            this.videoService.saveVideo(this.videoToAdd).then(
                () => {
                    this.$location.path('/');
                }
                );
        }

        constructor
            (
            private videoService: RocBookAngular.Services.VideoService,
            private $location: ng.ILocationService
            ) { }
    }

    angular.module('RocBookAngular').controller('VideoAddController', VideoAddController);

    //LOGIN
    //class AccountController {
    //    username: string
    //    password: string
    //    loginMessage: string

    //    login() {
    //        let data = "grant_type=password&username=" + this.username + "&password=" + this.password;
    //        this.$http.post('WebApi', data,
    //            {
    //                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    //            }).success((result: any) => {
    //                this.$window.sessionStorage.setItem('token', result.access_token);
    //                this.$location.path('/');
    //            }).error(() => {
    //                this.loginMessage = 'Invalid user name/password';
    //            });
    //    }

    //    logout() {
    //        this.$window.sessionStorage.removeItem('token');
    //    }

    //    isLoggedIn() {
    //        return this.$window.sessionStorage.getItem('token');
    //    }

    //    constructor(private $http: ng.IHttpService, private $window: ng.IWindowService, private $location: ng.ILocationService) { }
    //}

    //angular.module('AngularResource').controller('AccountController', AccountController);



} 