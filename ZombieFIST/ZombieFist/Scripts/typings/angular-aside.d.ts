// Type definitions for Angular Aside v1.2.1
// Project: https://github.com/dbtek/angular-aside
// Definitions: https://github.com/borisyankov/DefinitelyTyped


 
/// <reference path="angular.d.ts" />
/// <reference path="angular-ui-bootstrap.d.ts" />

// ngAside module (angular-aside.js)

// These are the interfaces that provide intellisense for typescript for the aside. 
declare module angular.aside {
    import uib = angular.ui.bootstrap; 
    
    // AsideService
    interface IAsideService {
        open(options: IAsideSettings): uib.IModalServiceInstance;
    }

    // AsideSettings
    interface IAsideSettings extends uib.IModalSettings {
        placement: string
    }
}
