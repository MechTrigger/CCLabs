var zombieApp;
(function (zombieApp) {
    var content;
    (function (content) {
        var homeController = (function () {
            function homeController() {
            }
            homeController.$inject = [];
            return homeController;
        })();
        angular.module('zombieApp').controller('homeController', homeController);
    })(content = zombieApp.content || (zombieApp.content = {}));
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=home.controller.js.map