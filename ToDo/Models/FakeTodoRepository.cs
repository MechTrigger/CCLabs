using System.Collections.Generic;
using System.Linq;

namespace ToDo.Models
{
    public class FakeTodoRepository
    {        
        private static List<Todo> _fakeDbContext = new List<Todo>();

        public List<Todo> GetAll() {

            return _fakeDbContext.ToList();
        }                              

        public void Add(Todo todo) {

            if (todo.Id == 0)
            {
                if (_fakeDbContext.Count == 0)
                    todo.Id = 1;

                else
                    todo.Id = _fakeDbContext.Max(item => item.Id) + 1;
            }

            _fakeDbContext.Add(todo);
            _fakeDbContext = _fakeDbContext.OrderBy(item => item.Id).ToList();
        }

        public void Update(Todo todoToUpdate)
        {

            Delete(todoToUpdate.Id);
            Add(todoToUpdate);
        }

        public void Delete(int id) {

            _fakeDbContext.RemoveAll(item => item.Id == id);  
        }
    }
}