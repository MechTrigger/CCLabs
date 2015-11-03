using System.Web.Mvc;

namespace ZombieFist.Controllers
{
    public class HomeController : Controller
    {
        // Here is the route setup now that we are using attribute routes 
        // instead of convention routes. 
        // NOTE: this new route pattern has the {ngInfo?}, which is a placeholder
        // per stephen that is a "wildcard" route so that it will match any request
        // and we need that so any urls that match an angular view don't get 
        // mistaken as an mvc url when the browser refreshes.
        [Route("{*ngInfo?}")]
        public ActionResult Index()
        {
            // Removed viewbag line, not used in page, was here in the template but not using it
            return View();
        }
    }
}
