using System.Web.Optimization;

namespace ZombieFist
{
    public class BundleConfig {
      
        public static void RegisterBundles(BundleCollection bundles) {

			/* CD: We aren't using the bundle config for css stylesheets anymore, 
			   instead we are using sass stylesheets to create, bundle, and 
			   minify our styles. Please look at /content/sass/stylesheet.scss */

            // These are the javascripts from frameworks, plugins or packages
            var resourceScripts = new ScriptBundle("~/resourcescripts").Include(
                "~/scripts/jquery.js",
                "~/scripts/angular/angular.js",
				"~/scripts/angular/angular-route.js",
                "~/scripts/angular/angular-animate.js",
                "~/scripts/angular/angular-messages.js",
                "~/scripts/angular/angular-ui-router.js",
                "~/scripts/angular/angular-ui-bootstrap-tpls.js",
				"~/scripts/angular/angular-aside.js",
				"~/scripts/jquery.burn.js"
            );            
            bundles.Add(resourceScripts);
			// CD: NOTE: We have both the jQuery version and the angular version of
			// bootstrap interactions (tooltips, modals, etc). the jquery versions 
			// are in the /scripts/bootstrap folder and currently are not being used. 
			// If we need to use them we can add them above, but we don't want the 
			// two versions BOTH trying to make a tooltip or modal and causing weird issues

            // ***** BUSINESS LOGIC ***** //
            // All Javascript we write for our app 
            var appScripts = new ScriptBundle("~/appscripts").Include(

                // JavaScript files not associated with a particular feature
                "~/ngApp/module.js",
				"~/ngApp/routes.js",
				"~/ngApp/shared/authInterceptor.js",
				"~/ngApp/shared/layout.controller.js",
				"~/ngApp/shared/zfMatch.directive.js",
                "~/ngApp/shared/countdowntimer.directive.js",

				// JavaScript files for 'content'
				"~/ngApp/content/home.controller.js",

				// JavaScript files for 'identity'
                "~/ngApp/identity/identity.service.js",
                "~/ngApp/identity/login.controller.js",
                "~/ngApp/identity/register.controller.js",
                "~/ngApp/identity/register.viewModel.js",
                "~/ngApp/identity/userProfile.viewModel.js",

				// JavaScript files for 'lists'
				"~/ngApp/lists/savePlanList.viewModel.js",
				"~/ngApp/lists/savePlanListItem.viewModel.js",
				"~/ngApp/lists/planList.viewModel.js",
				"~/ngApp/lists/planListItem.viewModel.js",
				"~/ngApp/lists/lists.controller.js",
				"~/ngApp/lists/planList.service.js",

				// JavaScript files for 'locations'
				"~/ngApp/locations/locations.controller.js",
				"~/ngApp/locations/locationType.enum.js",
				"~/ngApp/locations/planLocation.service.js",
				"~/ngApp/locations/map.service.js",
				"~/ngApp/locations/location.viewModel.js",

				// JavaScript files for 'examples'
                "~/ngApp/examples/_routes.js",
				"~/ngApp/examples/examples.controller.js",
				"~/ngApp/examples/exampleModal.controller.js",
				"~/ngApp/examples/exampleForm.controller.js"
            );
                
            bundles.Add(appScripts);

            // By default the minifying + bundling only happens when the site
            // is deployed and not when you are debugging. This is a problem
            // b/c if there are any errors in the bundled files you wouldn't 
            // know until after you deployed the site. This line makes it so 
            // that the files are always minified and bundled
            //BundleTable.EnableOptimizations = true;
        }
    }
}
