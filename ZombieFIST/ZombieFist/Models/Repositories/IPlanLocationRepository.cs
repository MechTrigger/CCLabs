using System.Collections.Generic;
using ZombieFist.Models.DomainModels;

namespace ZombieFist.Models.Repositories {
	public interface IPlanLocationRepository {
		PlanLocation Get(string userId, int id);
		IList<PlanLocation> GetAll(string userId);
		void Save(string userId, PlanLocation location);
		void Delete(string userId, int id);
		void SaveChanges();
	}
}