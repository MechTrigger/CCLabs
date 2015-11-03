var zombieApp;
(function (zombieApp) {
    var locations;
    (function (locations) {
        // Typescript enum for location types, matches c# enum
        // at /Models/DomainModels/PlanLocationType.cs
        (function (locationType) {
            locationType[locationType["bugout"] = 0] = "bugout";
            locationType[locationType["weapons"] = 1] = "weapons";
            locationType[locationType["food"] = 2] = "food";
            locationType[locationType["water"] = 3] = "water";
            locationType[locationType["supplies"] = 4] = "supplies";
            locationType[locationType["coderCamps"] = 5] = "coderCamps";
            locationType[locationType["zombies"] = 6] = "zombies";
            locationType[locationType["bigfoot"] = 7] = "bigfoot";
        })(locations.locationType || (locations.locationType = {}));
        var locationType = locations.locationType;
    })(locations = zombieApp.locations || (zombieApp.locations = {}));
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=locationType.enum.js.map