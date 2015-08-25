using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShoppingList.Models
{
    public class IndexViewModel
    {
        public IList<Product> Products { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}