namespace TodoApp {
    'use strict';

    export interface ITodoService {
        Add(name: string): ng.IHttpPromise<Object>;
        GetAll(): ng.IHttpPromise<Array<Todo>>;
        Edit(model: Todo): ng.IHttpPromise<Object>;
        Delete(id: number): ng.IHttpPromise<Object>;
    }

    export class TodoService implements ITodoService {
        static $inject: string[] = ['$http'];

        constructor(private $http: ng.IHttpService) {
        }

        Add(Name: string): ng.IHttpPromise<Object> {
            var model = new Todo();
            model.Name = Name;
            return this.$http.post('/api/todo/add', model);
        }

        GetAll(): ng.IHttpPromise<Array<Todo>> {
            return this.$http.get('/api/todos');
        }

        Edit(model: Todo): ng.IHttpPromise<Object> {
            return this.$http.post('/api/todo', model);
        }

        Delete(Id: number): ng.IHttpPromise<Object> {
            return this.$http.delete('/api/todo/' + Id);
        }
    }

    angular.module('todoApp').service('TodoService', TodoService);
}

