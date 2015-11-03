using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using ToDo.Models;
using Moq;
using ToDo.Controllers;
using System.Linq;
using System.Collections.Generic;

namespace ToDoTesting

{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            // Arrange
            var todos = new List<Todo> {
                new Todo {Id = 1, Name = "Walk the dog", Done = false},
                new Todo {Id = 2, Name = "Feed the fish", Done = true}
            };
            var mockRepo = new Mock<FakeTodoRepository>();
            mockRepo.Setup(r => r.Query<Todo>()).Returns(todos.AsQueryable());
            var controller = new TodoApiController(mockRepo.Object);

            // Act
            var result = (ViewResult)controller.GetTodos();
            var model = (IList<Todo>)result.Model;

            // Assert
            Assert.AreEqual("Walk the dog", model.First().Name);


        }
    }
}
