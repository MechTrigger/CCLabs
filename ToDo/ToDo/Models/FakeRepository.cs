using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.HttpPost;
using System.Web.Mvc.HttpPost;

using System.Web.Http.Results;
using System.Web.Mvc;
namespace ToDo.Models
{
    public class Task {
    
        public int Id { get; set; }
        public string Name { get; set; }

    }

    public class FakeRepository
    {

        private static List<Task> _fakeDbContext = new List<Task>();

        public IQueryable<Task> Query() {

            return _fakeDbContext.AsQueryable();
        }


        public Task Find(int Id) {

            return _fakeDbContext.Find(item => item.Id == Id);
        }

        public void Add(Task task) {

            if (task.Id == 0)
                task.Id = _fakeDbContext.Max(item => item.Id) + 1;
            _fakeDbContext.Add(task);
            _fakeDbContext = _fakeDbContext.OrderBy(item => item.Id).ToList();
        }

        public void Update(Task taskToUpdate) {

            //Delete(taskToUpdate).Id;
            Add(taskToUpdate);
        }

        public void Delete(int Id) {

            _fakeDbContext.RemoveAll(item => item.Id == Id);
        
        }
    }

    public class TasksController : ApiController 
    {
        private FakeRepository _repo = new FakeRepository();

        public List<Task> Index() { 

            return _repo.Query().ToList(); 

        }

        [HttpPost]
        public OkResult Add(Task task) {

            _repo.Add(task);
            return Ok();
        
        }

    }


}