using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
using ZombieFist.Models.DomainModels;
using System.Collections.Generic;
using ZombieFist.Models.Data;

namespace ZombieFist.Models.Data
{
    // NOTE: Used to be in Models/IdentityModels.cs, easier to 
    // find/use if it is in it's own file.
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
            this.Configuration.ProxyCreationEnabled = false;
            this.Configuration.LazyLoadingEnabled = true;
        }

        public DbSet<PlanList> PlanLists { get; set; }

        public DbSet<PlanLocation> PlanLocations { get; set; }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        public class DatabaseInitializer : DropCreateDatabaseAlways<ApplicationDbContext>
        {  
        }
        
        public class DataContext:DbContext
        {
            static DataContext()
            {
                Database.SetInitializer(new DatabaseInitializer());
            }

            public IDbSet<PlanLocation> Locations { get; set; }
        }
    }
}
  

