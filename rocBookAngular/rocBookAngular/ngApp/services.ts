namespace RocBookAngular.Services {

    const url = '/api/VideoUploads/:id';

    export class VideoService {

        private VideoResource

        public listVideos() {
           
            return this.VideoResource.query();
        }

        public getVideo(id) {
            return this.VideoResource.get({ id: id });
        }

        public saveVideo(video) {
            return this.VideoResource.save(video).$promise;
        }

        public deleteVideo(id) {
            return this.VideoResource.delete({ id: id }).$promise;
        }

        constructor($resource: ng.resource.IResourceService) {
            this.VideoResource = $resource(url);
        }


    }

    angular.module('RocBookAngular').service('videoService', VideoService);

} 