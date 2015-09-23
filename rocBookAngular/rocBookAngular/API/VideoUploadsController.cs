using RocBookAngular.Models;
using RocBookAngular.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RocBookAngular.API
{
    public class VideoUploadsController : ApiController
    {

        private IVideoService _videoUploadService;

        public VideoUploadsController(IVideoService videoUploadService)
        {
            _videoUploadService = videoUploadService;
        }


        // GET: api/VideoUpload
        public IEnumerable<Video> Get()
        {
            return _videoUploadService.ListVideos();
        }

        // GET: api/VideoUpload/5
        public Video Get(int id)
        {
            return _videoUploadService.FindVideo(id);
        }

        // POST: api/VideoUpload
        public HttpResponseMessage Post(Video video)
        {
            if (ModelState.IsValid) {
                _videoUploadService.CreateVideo(video);
                return Request.CreateResponse(HttpStatusCode.Created, video);
            }
            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, this.ModelState);
        }

        // PUT: api/VideoUpload/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/VideoUpload/5
        public void Delete(int id)
        {
            _videoUploadService.DeleteVideo(id);
        }

        [Route("api/VideoUploads/search/{search}")]
        public IList<Video> Get(string search) {

            return _videoUploadService.FindVideos(search);
        
        }


    }
}
