var TodoApp;
(function (TodoApp) {
    'use strict';
    var TodoController = (function () {
        function TodoController(TodoService, $timeout) {
            this.TodoService = TodoService;
            this.$timeout = $timeout;
            this.newTodoName = '';
            this.load();
        }
        TodoController.prototype.load = function () {
            var _this = this;
            this.TodoService.GetAll().success(function (lists) {
                angular.forEach(lists, function (list, i) {
                    list.ShowDeleteTooltip = list.ShowEditTooltip = list.ShowToggleTooltip = false;
                });
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
        TodoController.prototype.setEditMode = function (todo) {
            todo.ShowEditTooltip = false;
            this.$timeout(function () {
                todo.IsEdit = true;
            }, 100);
        };
        TodoController.prototype.toggleDone = function (todo) {
            var _this = this;
            todo.ShowToggleTooltip = false;
            this.$timeout(function () {
                todo.Done = !todo.Done;
                _this.save(todo);
            }, 100);
        };
        TodoController.prototype.deleteTodo = function (todo) {
            var _this = this;
            todo.ShowDeleteTooltip = false;
            this.$timeout(function () {
                _this.TodoService.Delete(todo.Id).success(function () { return _this.load(); });
            }, 100);
        };
        TodoController.$inject = ['TodoService', '$timeout'];
        return TodoController;
    })();
    angular.module('todoApp').controller('TodoController', TodoController);
})(TodoApp || (TodoApp = {}));
//# sourceMappingURL=TodoController.js.map