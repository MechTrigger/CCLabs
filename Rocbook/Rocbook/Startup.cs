using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Rocbook.Startup))]
namespace Rocbook
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
