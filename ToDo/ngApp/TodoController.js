var TodoApp;
(function (TodoApp) {
    'use strict';
    var TodoController = (function () {
        function TodoController(TodoService) {
            this.TodoService = TodoService;
            this.newTodoName = '';
            this.load();
        }
        TodoController.prototype.load = function () {
            var _this = this;
            this.TodoService.GetAll().success(function (lists) {
                _this.todos = lists;
            });
        };
        TodoController.prototype.save = function (todo) {
            var _this = this;
            this.TodoService.Edit(todo).success(function () { return _this.load(); });
        };
        TodoController.prototype.addTodo = function () {
            var _this = this;
            this.addError = this.newTodoName.length === 0;
            if (!this.addError) {
                this.TodoService.Add(this.newTodoName).success(function () {
                    _this.load();
                    _this.newTodoName = '';
                });
            }
        };
        TodoController.prototype.editTodo = function (todo) {
            if (todo.Name.length) {
                todo.IsEdit = false;
                this.save(todo);
            }
        };
        TodoController.prototype.markTodoDone = function (todo) {
            todo.Done = true;
            this.save(todo);
        };
        TodoController.prototype.markTodoUndone = function (todo) {
            todo.Done = false;
            this.save(todo);
        };
        TodoController.prototype.deleteTodo = function (todo) {
            var _this = this;
            this.TodoService.Delete(todo.Id).success(function () { return _this.load(); });
        };
        TodoController.$inject = ['TodoService'];
        return TodoController;
    })();
    angular.module('todoApp').controller('TodoController', TodoController);
})(TodoApp || (TodoApp = {}));
//# sourceMappingURL=TodoController.js.map