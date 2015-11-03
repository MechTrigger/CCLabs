using System.Collections.Generic;
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNet.Identity;
using ZombieFist.Models.DomainModels;
using ZombieFist.Models.Repositories;
using ZombieFist.Models.ViewModels;

namespace ZombieFist.Models.Services.Implementations
{
    //The services below are all the things that we can do with PlanLists
    public class PlanLocationService : IPlanLocationService
    {
        // Our IPlanListRepository is used like a "Reference Data-Type" (i.e. var "String" name) Instead of string it's an IPlanListRepository type we named _repository. 
        private readonly IPlanLocationRepository _repository;
		public PlanLocationService(IPlanLocationRepository repository)
        {
            this._repository = repository;
        }

		public PlanLocationViewModel GetById(ClaimsIdentity identity, int id) {
			var userId = identity.GetUserId();
			var location = this._repository.Get(userId, id);
			return Mapper.Map<PlanLocationViewModel>(location);
		}

		public void Delete(ClaimsIdentity identity, int id) {
			var userId = identity.GetUserId();
			this._repository.Delete(userId, id);
			this._repository.SaveChanges();
		}

		public IList<PlanLocationViewModel> GetAllLocations(ClaimsIdentity identity) {
			var userId = identity.GetUserId();
			var locations = this._repository.GetAll(userId);
			return Mapper.Map<IList<PlanLocationViewModel>>(locations);
		}

		public void Save(ClaimsIdentity identity, PlanLocationViewModel model) {
			var userId = identity.GetUserId();
			var location = Mapper.Map<PlanLocation>(model);
			this._repository.Save(userId, location);
			this._repository.SaveChanges();
		}
	}
}
