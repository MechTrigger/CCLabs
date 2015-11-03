namespace ZombieFist.Models.DomainModels
{
    public class PlanLocation
    {
        public int Id { get; set; }
		public PlanLocationType LocationType { get; set; }
        public string Title { get; set; }
		public double Latitude { get; set; }
		public double Longitude { get; set; }
		public ApplicationUser User { get; set; }
    }
}
