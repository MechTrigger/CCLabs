using System;
using ZombieFist.Models.DomainModels;

namespace ZombieFist.Models.ViewModels
{
    public class PlanLocationViewModel
    {
		public int Id { get; set; }
		public PlanLocationType LocationType { get; set; }
		public string Title { get; set; }
		public double Latitude { get; set; }
		public double Longitude { get; set; }
    }
}
