using System.Web.Mvc;

namespace ToDo.Controllers
{
    public class HomeController : Controller
    {
        [Route("")]
        public ActionResult Index()
        {
            return View();
        }
    }
}
