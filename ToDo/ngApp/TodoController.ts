namespace TodoApp {
    'use strict';


    class TodoController {
        static $inject: string[] = ['TodoService'];

        constructor(private TodoService: ITodoService) {
            this.load();
        }

        todos: Array<Todo>;
        newTodoName: string = '';
        addError: boolean;

        private load() {
            this.TodoService.GetAll().success(
                (lists) => {
                    this.todos = lists;
                }
            );
        }

        private save(todo: Todo) {
            this.TodoService.Edit(todo).success(
                () => this.load()
            );
        }

        addTodo() {
            this.addError = this.newTodoName.length === 0;

            if (!this.addError) {
                this.TodoService.Add(this.newTodoName).success(
                    () => {
                        this.load();
                        this.newTodoName = '';
                    }
                );
            } 
        }

        editTodo(todo: Todo) {
            if (todo.Name.length) {
                todo.IsEdit = false;
                this.save(todo);
            }
        }

        markTodoDone(todo: Todo) {
            todo.Done = true;
            this.save(todo);
        }

        markTodoUndone(todo: Todo) {
            todo.Done = false;
            this.save(todo);   
        }
        
        deleteTodo(todo: Todo) {
            this.TodoService.Delete(todo.Id).success(
                () => this.load()
            );
        }           
    }

    angular.module('todoApp').controller('TodoController', TodoController);
} 













