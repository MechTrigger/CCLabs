using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using ZombieFist.Models.DomainModels;

namespace ZombieFist.Models.Repositories.Implementations
{
    // GenericRepository talks to db-context to keep unbroken chain to server
    // We Implemented the IPlanListRepository 
    public class PlanListRepository : GenericRepository,  IPlanListRepository
    {   
        public PlanList Get(string userId, int id)
        {
            return this.CurrentUser(userId).Lists.FirstOrDefault(list => list.Id == id);
        }

        public IList<PlanList> GetAll(string userId)
        {
			return this.CurrentUser(userId).Lists.ToList();
        }

        public void SaveList(string userId, PlanList list)
        {
            if (list.Id == 0)
            {
                var user = CurrentUser(userId);
                list.User = user;
                user.Lists.Add(list);
            }
            else
            {
                var old = Get(userId, list.Id);
                old.Name = list.Name;
            }
        }


        public void DeleteList(string userId, int id)
        {
	        var listToDelete = this.Query<PlanList>()
								   .Include(list => list.Items)
								   .Where(list => list.User.Id == userId)
								   .Where(list => list.Id == id)
								   .FirstOrDefault();

			var items = listToDelete.Items.ToList();
			for (var i = 0; i < items.Count; i++)
				this.Delete(items[i]);

            this.Delete<PlanList>(id);
        }

        public void SaveItem(string userId, int listId, PlanListItem listItem)
        {
            var list = Get(userId, listId);

            if (listItem.Id == 0)
            {
                listItem.PlanList = list;
                list.Items.Add(listItem);
            }
            else
            {
                var oldItem = list.Items.Single(item => item.Id == listItem.Id);
                oldItem.Text = listItem.Text;
            }
        }

		public void DeleteItem(string userId, int itemId)
		{
			var itemToDelete = this.Query<PlanListItem>()
								   .Include(list => list.PlanList)
								   .Include(p => p.PlanList.User)
								   .Where(item => item.Id == itemId)
								   .FirstOrDefault();


			if (itemToDelete.PlanList.User.Id == userId)
				this.Delete<PlanListItem>(itemId);
        }


    }
}
