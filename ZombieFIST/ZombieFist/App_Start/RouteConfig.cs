using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ZombieFist
{
    public class RouteConfig
    {

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

			// ignore all the routes that api controllers are going to handle
	        routes.IgnoreRoute("api/{*pathInfo}");

            // removed convention-based routing in favor of the 
            // attribute routing technique
            routes.MapMvcAttributeRoutes();
        }
    }
}
