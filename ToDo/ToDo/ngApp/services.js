//Not utilized and incomplete
var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var ToDoService = (function () {
            function ToDoService($http, WebAPI) {
                this.$http = $http;
                this.WebAPI = WebAPI;
            }
            ToDoService.prototype.listToDo = function () {
                return this.$http.get(this.WebAPI);
            };
            ToDoService.prototype.deleteToDo = function (id) {
                return this.$http.get(this.WebAPI + '/' + id);
            };
            return ToDoService;
        })();
        Services.ToDoService = ToDoService;
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
//# sourceMappingURL=services.js.map