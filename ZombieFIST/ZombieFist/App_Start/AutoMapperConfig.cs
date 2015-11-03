using AutoMapper;
using ZombieFist.Models.DomainModels;
using ZombieFist.Models.ViewModels;

namespace ZombieFist
{
    public static class AutoMapperConfig
    {
        public static void Configure()
        {
            // This code ties PlanList and PlanListViewModel together 
            // (maps the two together)
            Mapper.CreateMap<PlanList, PlanListViewModel>();
            Mapper.CreateMap<PlanListViewModel, PlanList>();

			// Same for PlanListItem and PlanListItemViewModel
            Mapper.CreateMap<PlanListItem, PlanListItemViewModel>();
            Mapper.CreateMap<PlanListItemViewModel, PlanListItem>();

			// Same for PlanLocation and PlanLocationViewModel
			Mapper.CreateMap<PlanLocation, PlanLocationViewModel>();
			Mapper.CreateMap<PlanLocationViewModel, PlanLocation>();
        }
    }
}
