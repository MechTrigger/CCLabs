var zombieApp;
(function (zombieApp) {
    var locations;
    (function (locations) {
        // Typescript class that holds our profile info
        var locationVm = (function () {
            function locationVm(id, title, latitude, longitude, locationType) {
                this.id = id;
                this.title = title;
                this.latitude = latitude;
                this.longitude = longitude;
                this.locationType = locationType;
            }
            return locationVm;
        })();
        locations.locationVm = locationVm;
    })(locations = zombieApp.locations || (zombieApp.locations = {}));
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=location.viewModel.js.map