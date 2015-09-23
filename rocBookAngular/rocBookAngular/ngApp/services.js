var RocBookAngular;
(function (RocBookAngular) {
    var Services;
    (function (Services) {
        var url = '/api/VideoUploads/:id';
        var VideoService = (function () {
            function VideoService($resource) {
                this.VideoResource = $resource(url);
            }
            VideoService.prototype.listVideos = function () {
                return this.VideoResource.query();
            };
            VideoService.prototype.getVideo = function (id) {
                return this.VideoResource.get({ id: id });
            };
            VideoService.prototype.saveVideo = function (video) {
                return this.VideoResource.save(video).$promise;
            };
            VideoService.prototype.deleteVideo = function (id) {
                return this.VideoResource.delete({ id: id }).$promise;
            };
            return VideoService;
        })();
        Services.VideoService = VideoService;
        angular.module('RocBookAngular').service('videoService', VideoService);
    })(Services = RocBookAngular.Services || (RocBookAngular.Services = {}));
})(RocBookAngular || (RocBookAngular = {}));
//# sourceMappingURL=services.js.map