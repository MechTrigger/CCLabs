using Microsoft.Owin;
using Owin;
using ZombieFist;

[assembly: OwinStartup(typeof(OwinStartup))]
namespace ZombieFist
{
    public class OwinStartup
    {
        // Startup class used by OWIN to configure Identity
        // This is a partial class, the rest is configured in
        // this location: "App_Start/Startup.Auth.cs"
        public void Configuration(IAppBuilder app)
        {
            OAuthConfig.Configure(app);
        }
    }
}
