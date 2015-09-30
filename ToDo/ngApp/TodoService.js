var TodoApp;
(function (TodoApp) {
    'use strict';
    var TodoService = (function () {
        function TodoService($http) {
            this.$http = $http;
        }
        TodoService.prototype.Add = function (Name) {
            var model = new TodoApp.Todo();
            model.Name = Name;
            return this.$http.post('/api/todo/add', model);
        };
        TodoService.prototype.GetAll = function () {
            return this.$http.get('/api/todos');
        };
        TodoService.prototype.Edit = function (model) {
            return this.$http.post('/api/todo', model);
        };
        TodoService.prototype.Delete = function (Id) {
            return this.$http.delete('/api/todo/' + Id);
        };
        TodoService.$inject = ['$http'];
        return TodoService;
    })();
    TodoApp.TodoService = TodoService;
    angular.module('todoApp').service('TodoService', TodoService);
})(TodoApp || (TodoApp = {}));
//# sourceMappingURL=TodoService.js.map