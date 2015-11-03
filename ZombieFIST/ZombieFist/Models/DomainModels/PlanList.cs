using System.Collections.Generic;

namespace ZombieFist.Models.DomainModels
{
    public class PlanList
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<PlanListItem> Items { get; set; }
        public ApplicationUser User { get; set; }

        public PlanList()
        {
            Items = new List<PlanListItem>();
        }
    }
}
