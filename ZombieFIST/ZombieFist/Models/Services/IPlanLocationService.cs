using System;
using System.Collections.Generic;
using System.Security.Claims;
using ZombieFist.Models.ViewModels;

namespace ZombieFist.Models.Services
{
	public interface IPlanLocationService
    {
		PlanLocationViewModel GetById(ClaimsIdentity identity, int id);
		void Delete(ClaimsIdentity identity, Int32 id);
		IList<PlanLocationViewModel> GetAllLocations(ClaimsIdentity identity);
		void Save(ClaimsIdentity identity, PlanLocationViewModel model);
    }
}
