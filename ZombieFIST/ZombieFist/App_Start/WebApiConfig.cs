using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;

namespace ZombieFist 
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes, attribute approach
            config.MapHttpAttributeRoutes();

			// C# naming convention has properties start with a capital letter (Name),
			// but javascript convention has properties start with a lowercase letter (name).
			// When Web Api seralizes a C# model to JSON, it normally serializes it uppercase,
			// which then makes the javascript part harder and less intuitive. Having this 
			// line makes Web Api lowercase the property names when it becomes JSON
			config.Formatters.JsonFormatter.SerializerSettings.ContractResolver =
					new CamelCasePropertyNamesContractResolver();
        }
    }
}
