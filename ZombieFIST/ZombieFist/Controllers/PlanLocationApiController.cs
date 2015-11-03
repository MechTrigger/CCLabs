using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using ZombieFist.Models.Services;
using ZombieFist.Models.ViewModels;


namespace ZombieFist.Controllers
{
    [Authorize]
    public class PlanLocationApiController : ApiController
    {
        private readonly IPlanLocationService _service;
        private ClaimsIdentity _identity
        {
            get { return this.User.Identity as ClaimsIdentity; }
        }

		public PlanLocationApiController(IPlanLocationService service)
        {
            this._service = service;
        }
        
                              
        [Route("api/locations"), HttpGet] 
        public HttpResponseMessage GetAllLists()
        {
			var model = this._service.GetAllLocations(this._identity);
            return Request.CreateResponse(model);
        }

		[Route("api/location/{id}"), HttpGet]
		public HttpResponseMessage GetById(int id)
        {
			var model = this._service.GetById(this._identity, id);
            return Request.CreateResponse(model);
        }

		[Route("api/location/{id}"), HttpDelete]         
        public HttpResponseMessage Delete(int id)
        {
			this._service.Delete(this._identity, id);
            return Request.CreateResponse();
        }

		[Route("api/location"), HttpPost]  
        public HttpResponseMessage Save(PlanLocationViewModel model)
        {
			this._service.Save(this._identity, model);
            return Request.CreateResponse();
        }
    }
}
