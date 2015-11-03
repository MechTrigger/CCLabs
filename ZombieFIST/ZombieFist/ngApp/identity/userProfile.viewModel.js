var zombieApp;
(function (zombieApp) {
    var identity;
    (function (identity) {
        // Typescript class that holds our profile info
        var userProfileViewModel = (function () {
            function userProfileViewModel() {
            }
            return userProfileViewModel;
        })();
        identity.userProfileViewModel = userProfileViewModel;
    })(identity = zombieApp.identity || (zombieApp.identity = {}));
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=userProfile.viewModel.js.map