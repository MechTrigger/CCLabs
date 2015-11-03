namespace zombieApp {

    // controller that all the views have access to. 
    class layoutController {
        static $inject: string[] = ['$scope', 'identityService', '$location', '$window'];

        constructor(private $scope: ng.IScope, private identityService: identity.identityService, private $location: ng.ILocationService, private $window: ng.IWindowService) {

            this.user = this.identityService.getProfile();
            this.navIsCollapsed = true;
            this.playMusic = true;
            this.playVideo = false;

            this.$scope.$watch(
                () => $window.sessionStorage.getItem('profile'),
                (value) => this.user = JSON.parse(value)
            );

            // the code inside here runs every time a user clicks on a link to a new 'page'
            this.$scope.$on('$routeChangeStart', (event, next) => {

                var path = next.$$route.originalPath;
                var isNotLoggedIn = this.user === null || !this.user.isAuthenticated;
                var notLoggedInPath = (path === '/register' || path === '/login');

                if (isNotLoggedIn && !notLoggedInPath) {
                    this.$location.path('/login');
                }
            });

            this.$scope.$on('$routeChangeSuccess', () => {

                // Don't play video on any full screen background page
                this.playVideo = $('.billboard').length === 0; 
            });
        }

        user: identity.userProfileViewModel;
        navIsCollapsed: boolean;
        playVideo: boolean;
        playMusic: boolean;

        // CUSTOM ANGULAR METHOD // 
        // USED IN: Main navigation in layouts (Views/Home/index.cshtml, /other, /other)
        // Bootstrap adds a class named "active" to <li> tags. We use this "active" class status
        // from Bootstrap to show the user a different style on the link/menu item they are on (active-state look). 
        isActiveView(path: string): string {
            path = path.toLowerCase();
            var currentPath = this.$location.path().toLowerCase();
            return currentPath.indexOf(path) >= 0 ? 'active' : '';
        }

        logout(): void {
            this.identityService.logout();
        }
    }

    angular.module('zombieApp').controller('layoutController', layoutController);
}