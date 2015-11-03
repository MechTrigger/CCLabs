namespace zombieApp.locations {

    // Typescript enum for location types, matches c# enum
    // at /Models/DomainModels/PlanLocationType.cs
    export enum locationType {
       
        bugout      = 0,
        weapons     = 1,
        food        = 2,
        water       = 3,
        supplies    = 4,
        coderCamps  = 5,
        zombies     = 6,
        bigfoot     = 7
    }
}