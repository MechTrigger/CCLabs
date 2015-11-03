using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace ZombieFist.Models.DomainModels
{
    // Since Users are Domain Models, they were put with the other Domain Models 
    // Identity file previously named "IdentityModels.cs" is now named "ApplicationUser" 
    public class ApplicationUser : IdentityUser
    {
        // Adding ICollection<PLanList> as a property tells the server we want to associate 
        // lists with Users. 
        public string FirstName { get; set; }
        public string LastName { get; set; }       
        public ICollection<PlanList> Lists { get; set; }
		
		public ICollection<PlanLocation> Locations { get; set; }
		        
        // Constructor for User creates a new PlanList (for Things) & PlanLocation List (Map Locations) 
        public ApplicationUser()
        {
            this.Lists = new List<PlanList>();
            this.Locations = new List<PlanLocation>();
        }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add our custom user claims here
            return userIdentity;
        }
    }

}