using System.Collections.Generic;

namespace ZombieFist.Models.ViewModels
{
    public class PlanListViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IList<PlanListItemViewModel> Items { get; set; }
    }
}
