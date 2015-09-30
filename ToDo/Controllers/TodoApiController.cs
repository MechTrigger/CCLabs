using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Results;
using ToDo.Models;

namespace ToDo.Controllers
{
    public class TodoApiController : ApiController
    {
        private readonly FakeTodoRepository _repository = new FakeTodoRepository();

        [HttpGet]
        [Route("api/todos")]
        public List<Todo> GetTodos()
        {
            return _repository.GetAll();
        }

        [HttpPost]
        [Route("api/todo/add")]
        public OkResult AddTodo(Todo item)
        {
            _repository.Add(item);
            return Ok();
        }

        [HttpPost]
        [Route("api/todo")]
        public OkResult EditTodo(Todo item)
        {
            _repository.Update(item);
            return Ok();
        }

        [HttpDelete]
        [Route("api/todo/{id:int}")]
        public OkResult DeleteTodo(int id)
        {
            _repository.Delete(id);
            return Ok();
        }
    }
}
