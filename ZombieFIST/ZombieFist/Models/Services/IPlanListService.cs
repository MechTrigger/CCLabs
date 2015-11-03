using System;
using System.Collections.Generic;
using System.Security.Claims;
using ZombieFist.Models.ViewModels;

namespace ZombieFist.Models.Services
{
    public interface IPlanListService
    {
        void DeleteItem(ClaimsIdentity identity, Int32 itemId);
        void DeleteList(ClaimsIdentity identity, Int32 id);
        PlanListViewModel GetListById(ClaimsIdentity identity, Int32 id);
        IList<PlanListViewModel> GetAllLists(ClaimsIdentity identity);
        void SaveItem(ClaimsIdentity identity, Int32 listId, Int32 id, String text);
        void SaveList(ClaimsIdentity identity, Int32 id, String name);
    }
}
