var zombieApp;
(function (zombieApp) {
    // controller that all the views have access to. 
    var layoutController = (function () {
        function layoutController($scope, identityService, $location, $window) {
            var _this = this;
            this.$scope = $scope;
            this.identityService = identityService;
            this.$location = $location;
            this.$window = $window;
            this.user = this.identityService.getProfile();
            this.navIsCollapsed = true;
            this.playMusic = true;
            this.playVideo = false;
            this.$scope.$watch(function () { return $window.sessionStorage.getItem('profile'); }, function (value) { return _this.user = JSON.parse(value); });
            // the code inside here runs every time a user clicks on a link to a new 'page'
            this.$scope.$on('$routeChangeStart', function (event, next) {
                var path = next.$$route.originalPath;
                var isNotLoggedIn = _this.user === null || !_this.user.isAuthenticated;
                var notLoggedInPath = (path === '/register' || path === '/login');
                if (isNotLoggedIn && !notLoggedInPath) {
                    _this.$location.path('/login');
                }
            });
            this.$scope.$on('$routeChangeSuccess', function () {
                // Don't play video on any full screen background page
                _this.playVideo = $('.billboard').length === 0;
            });
        }
        // CUSTOM ANGULAR METHOD // 
        // USED IN: Main navigation in layouts (Views/Home/index.cshtml, /other, /other)
        // Bootstrap adds a class named "active" to <li> tags. We use this "active" class status
        // from Bootstrap to show the user a different style on the link/menu item they are on (active-state look). 
        layoutController.prototype.isActiveView = function (path) {
            path = path.toLowerCase();
            var currentPath = this.$location.path().toLowerCase();
            return currentPath.indexOf(path) >= 0 ? 'active' : '';
        };
        layoutController.prototype.logout = function () {
            this.identityService.logout();
        };
        layoutController.$inject = ['$scope', 'identityService', '$location', '$window'];
        return layoutController;
    })();
    angular.module('zombieApp').controller('layoutController', layoutController);
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=layout.controller.js.map