using LooseChange.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LooseChange.Controllers
{
    public class ProblemsController : ApiController
    {

        public IHttpActionResult GetProblem()
        {
            var problem = probGenerator();

            return Ok(problem);
        }

        public static Problem probGenerator()
        {
            Dictionary<string, decimal> denom = new Dictionary<string, decimal>();

            denom.Add("Silver-dollars", 1);
            denom.Add("Half-dollars", .50m);
            denom.Add("Quarters", .25m);
            denom.Add("Dimes", .10m);
            denom.Add("Nickles", .05m);
            denom.Add("Pennies", .01m);

            Random r = new Random();
            int range = 10;
            double rDouble = r.NextDouble() * range;
            decimal change = Convert.ToDecimal(rDouble);
            decimal value = change;
            Dictionary<string, int> answer = new Dictionary<string, int>();

            foreach (var d in denom)
            {
                var amt = (Math.Truncate(change / d.Value));
                if (amt > 0m)
                {
                    answer.Add(d.Key, Convert.ToInt32(amt));
                    change -= (amt * d.Value);
                }
                else
                {
                    answer.Add(d.Key, 0);
                }
            }
            var rnd = new Random();
            var result = rnd.Next(10);

            Problem problem = new Problem(value, answer["Silver-dollars"], answer["Half-dollars"], answer["Quarters"],
                answer["Dimes"], answer["Nickles"], answer["Pennies"], result);
            return problem;
        }


    }




}
