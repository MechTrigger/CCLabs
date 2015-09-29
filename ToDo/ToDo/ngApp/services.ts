//Not utilized and incomplete

namespace MyApp.Services {

    export class ToDoService {

        public listToDo() {

            return this.$http.get(this.WebAPI)
        }

        public deleteToDo(id) {
            return this.$http.get(this.WebAPI + '/' + id);
        }

        constructor(private $http: ng.IHttpService, private WebAPI) { }

    }

} 