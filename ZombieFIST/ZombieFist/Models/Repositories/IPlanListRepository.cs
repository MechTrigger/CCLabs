using System.Collections.Generic;
using ZombieFist.Models.DomainModels;


namespace ZombieFist.Models.Repositories
{
    public interface IPlanListRepository
    {
		PlanList Get(string userId, int id);
        IList<PlanList> GetAll(string userId);
        void SaveList(string userId, PlanList list);
		void DeleteList(string userId, int id);

        void SaveItem(string userId, int listId, PlanListItem item);

		void DeleteItem(string userId, int itemId);

        void SaveChanges();
    }
}                          