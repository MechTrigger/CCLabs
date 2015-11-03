using System.Collections.Generic;
using System.Linq;
using ZombieFist.Models.DomainModels;

namespace ZombieFist.Models.Repositories.Implementations
{
    // GenericRepository talks to db-context to keep unbroken chain to server
    // We Implemented the IPlanListRepository 
	public class PlanLocationRepository : GenericRepository, IPlanLocationRepository
    {
		public PlanLocation Get(string userId, int id)
		{
			return this.CurrentUser(userId).Locations.FirstOrDefault(loc => loc.Id == id);
		}

		public IList<PlanLocation> GetAll(string userId) {
			return this.CurrentUser(userId).Locations.ToList();
		}

		public void Save(string userId, PlanLocation location) {
			if (location.Id == 0)
			{
				var user = CurrentUser(userId);
                location.User = user;
				user.Locations.Add(location);
			}
			else
			{
				var old = Get(userId, location.Id);
				old.Latitude = location.Latitude;
				old.LocationType = location.LocationType;
				old.Longitude = location.Longitude;
				old.Title = location.Title;
			}
		}

		public void Delete(string userId, int id)
		{
			var user = CurrentUser(userId);
			var location = user.Locations.Single(loc => loc.Id == id);
			CurrentUser(userId).Locations.Remove(location);
		}
	}
}
