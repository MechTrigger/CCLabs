namespace TodoApp {
    'use strict';


    class TodoController {
        static $inject: string[] = ['TodoService', '$timeout'];

        constructor(private TodoService: ITodoService,
            private $timeout: ng.ITimeoutService) {
            this.load();
        }

        todos: Array<Todo>;
        newTodoName: string = '';
        addError: boolean;

        private load() {
            this.TodoService.GetAll().success(
                (lists) => {
                    angular.forEach(lists, (list, i) => {
                        list.ShowDeleteTooltip = list.ShowEditTooltip = list.ShowToggleTooltip = false;
                    });
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

        setEditMode(todo: Todo) {
            todo.ShowEditTooltip = false;
            this.$timeout(() => {
                todo.IsEdit = true;
            }, 100);
        }

        toggleDone(todo: Todo) {
            todo.ShowToggleTooltip = false;
            this.$timeout(() => {
                todo.Done = !todo.Done;
                this.save(todo);
            }, 100);
        }

        deleteTodo(todo: Todo) {
            todo.ShowDeleteTooltip = false;
            this.$timeout(() => {
                this.TodoService.Delete(todo.Id).success(
                    () => this.load()
                    );
            }, 100);
        }
    }
    

    angular.module('todoApp').controller('TodoController', TodoController);
} 













