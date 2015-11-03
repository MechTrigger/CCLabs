using System;
using System.Collections.Generic;
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNet.Identity;
using ZombieFist.Models.Repositories;
using ZombieFist.Models.ViewModels;
using ZombieFist.Models.DomainModels;

namespace ZombieFist.Models.Services.Implementations
{
    //The services below are all the things that we can do with PlanLists
    public class PlanListService : IPlanListService
    {
        // Our IPlanListRepository is used like a "Reference Data-Type" (i.e. var "String" name) Instead of string it's an IPlanListRepository type we named _repository. 
        private readonly IPlanListRepository _repository;
        public PlanListService(IPlanListRepository repository)
        {
            this._repository = repository;
        }

        public void DeleteItem(ClaimsIdentity identity, Int32 itemId)
        {
			var userId = identity.GetUserId();
			this._repository.DeleteItem(userId, itemId);
            this._repository.SaveChanges();
        }

        public void DeleteList(ClaimsIdentity identity, Int32 id)
        {
			var userId = identity.GetUserId();
			this._repository.DeleteList(userId, id);
			this._repository.SaveChanges();
        }

        public PlanListViewModel GetListById(ClaimsIdentity identity, Int32 id)
        {
			var userId = identity.GetUserId();
			var list = this._repository.Get(userId, id);
            return Mapper.Map<PlanListViewModel>(list);
        }

        public IList<PlanListViewModel> GetAllLists(ClaimsIdentity identity)
        {
            var userId = identity.GetUserId();
            var lists = this._repository.GetAll(userId);
            return Mapper.Map<IList<PlanListViewModel>>(lists);
        }

        public void SaveItem(ClaimsIdentity identity, Int32 listId, Int32 id, String text)
        {
			var userId = identity.GetUserId();
            var item = new PlanListItem() { Id = id, Text = text };
            this._repository.SaveItem(userId, listId, item);
            this._repository.SaveChanges();
        }

        public void SaveList(ClaimsIdentity identity, Int32 id, String name)
        {
            var userId = identity.GetUserId();
            var list = new PlanList() { Id = id, Name = name };
            this._repository.SaveList(userId, list);
            this._repository.SaveChanges();
        }
    }
}
