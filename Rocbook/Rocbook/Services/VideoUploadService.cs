using CoderCamps;
using Rocbook.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rocbook.Services
{
    public class VideoUploadService : IVideoUploadService
    {
        private IGenericRepository _repo;

        public VideoUploadService(IGenericRepository repo)
        {
            _repo = repo;
        }

        public IList<VideoUpload> ListVideoUploads()
        {
            return _repo.Query<VideoUpload>().ToList();
        }

        public VideoUpload FindVideoUpload(int id)
        {
            return _repo.Find<VideoUpload>(id);
        }

        public void CreateVideoUpload(VideoUpload videoUpload)
        {
            _repo.Add<VideoUpload>(videoUpload);
            _repo.SaveChanges();
        }

        public void EditVideoUpload(VideoUpload videoUpload)
        {
            var original = this.FindVideoUpload(videoUpload.Id);
            original.Name = videoUpload.Name;
            original.Description = videoUpload.Description;
            original.VideoLink = videoUpload.VideoLink;
            _repo.SaveChanges();
        }

        public void DeleteVideoUpload(int id)
        {
            _repo.Delete<VideoUpload>(id);
            _repo.SaveChanges();
        }






    }
}