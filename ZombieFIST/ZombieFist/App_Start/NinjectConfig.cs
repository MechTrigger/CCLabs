using System;
using System.Web;         
using Microsoft.Web.Infrastructure.DynamicModuleHelper;
using Ninject;
using Ninject.Web.Common;
using ZombieFist;
using ZombieFist.Models.Repositories;
using ZombieFist.Models.Repositories.Implementations;
using ZombieFist.Models.Services;
using ZombieFist.Models.Services.Implementations;


[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(NinjectConfig), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethod(typeof(NinjectConfig), "Stop")]

namespace ZombieFist
{

    // NOTE: this used to be called NinjectWebCommon.cs, but all the other files
    // in App_Start are <something>Config.cs, so it makes more sense to be consistent
    // and call this NinjectConfig.cs
    public static class NinjectConfig 
    {
        private static readonly Bootstrapper _bootstrapper = new Bootstrapper();

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start() 
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            _bootstrapper.Initialize(CreateKernel);
        }
        
        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            _bootstrapper.ShutDown();
        }
        
        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            try
            {
                kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
                kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();

                RegisterServices(kernel);
                return kernel;
            }
            catch
            {
                kernel.Dispose();
                throw;
            }
        }

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {
            kernel.Bind<IPlanListService>().To<PlanListService>().InRequestScope();
            kernel.Bind<IPlanListRepository>().To<PlanListRepository>().InRequestScope();

			kernel.Bind<IPlanLocationService>().To<PlanLocationService>().InRequestScope();
			kernel.Bind<IPlanLocationRepository>().To<PlanLocationRepository>().InRequestScope();
        }        
    }
}

