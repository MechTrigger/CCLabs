

using System.ComponentModel.DataAnnotations.Schema;
namespace ZombieFist.Models.DomainModels
{
    public class PlanListItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public PlanList PlanList { get; set; }

        [NotMapped]
        public int ListId { get { return PlanList.Id; } }
    }
}
