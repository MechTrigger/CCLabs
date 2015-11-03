using System.Web;
using System.Web.Http;
using System.Web.Optimization;
using System.Web.Routing;

namespace ZombieFist
{
    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AutoMapperConfig.Configure();
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            /*
            Since we are doing a single page app, some things weren't needed
            Removed references to:
                FilterConfig -> sets attributes for all mvc controllers, we only have one, no point
                AreaConfiguration -> we aren't using mvc areas, only one mvc view
            */
        }
    }
}
