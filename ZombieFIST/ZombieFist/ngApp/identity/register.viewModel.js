var zombieApp;
(function (zombieApp) {
    var identity;
    (function (identity) {
        // Typescript class that matches up with the C# class used by Web Api
        var registerViewModel = (function () {
            function registerViewModel() {
            }
            return registerViewModel;
        })();
        identity.registerViewModel = registerViewModel;
    })(identity = zombieApp.identity || (zombieApp.identity = {}));
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=register.viewModel.js.map