using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LooseChange.Models
{
    public class Problem
    {
        public decimal Value { get; set; }
        public int SilverDollars { get; set; }
        public int HalfDollars { get; set; }
        public int Quarters { get; set; }
        public int Dimes { get; set; }
        public int Nickles { get; set; }
        public int Pennies { get; set; }
        public int ScrambleVersion { get; set; }


        public Problem(decimal value, int silverdollars, int halfdollars, int quarters, int dimes, int nickles, int pennies, int scrambleversion)
        {
            this.Value = value;
            this.SilverDollars = silverdollars;
            this.HalfDollars = halfdollars;
            this.Quarters = quarters;
            this.Dimes = dimes;
            this.Nickles = nickles;
            this.Pennies = pennies;
            this.ScrambleVersion = scrambleversion;
        }
    }


}