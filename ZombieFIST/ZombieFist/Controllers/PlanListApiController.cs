using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using ZombieFist.Models.Services;
using ZombieFist.Models.ViewModels;


namespace ZombieFist.Controllers
{

    [Authorize]
    public class PlanListApiController : ApiController
    {
        private readonly IPlanListService _service;
        private ClaimsIdentity _identity
        {
            get { return this.User.Identity as ClaimsIdentity; }
        }

        public PlanListApiController(IPlanListService service)
        {
            this._service = service;
        }
        
                              
        [Route("api/lists"), HttpGet] 
        public HttpResponseMessage GetAllLists()
        {
			var model = this._service.GetAllLists(this._identity);
            return Request.CreateResponse(model);
        }

        [Route("api/list/{id}"), HttpGet]            
        public HttpResponseMessage GetListById(int id)
        {
			var model = this._service.GetListById(this._identity, id);
            return Request.CreateResponse(model);
        }

        [Route("api/list/{id}"), HttpDelete]         
        public HttpResponseMessage DeleteList(int id)
        {
			this._service.DeleteList(this._identity, id);
            return Request.CreateResponse();
        }

        [Route("api/list"), HttpPost]  
        public HttpResponseMessage SaveList(SavePlanListViewModel model)
        {
			this._service.SaveList(this._identity, model.Id, model.Name);
            return Request.CreateResponse();
        }


        [Route("api/list/item"), HttpPost]
        public HttpResponseMessage AddItem(SavePlanListItemViewModel model)
        {
			this._service.SaveItem(this._identity, model.ListId, model.Id, model.Text);
            return Request.CreateResponse();
        }

        [Route("api/list/item/{itemId}"), HttpDelete]
        public HttpResponseMessage DeleteItem(int itemId)
        {
			this._service.DeleteItem(this._identity, itemId);
            return Request.CreateResponse();
        }  
    }
}
