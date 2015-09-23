using GenRepo;
using RocBookAngular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RocBookAngular.Services
{
    public class VideoService : RocBookAngular.Services.IVideoService 
    {
        private IGenericRepository _repo;

        public VideoService(IGenericRepository repo)
        {
            _repo = repo;
        }

        public IList<Video> ListVideos()
        {
            return _repo.Query<Video>().ToList();
        }

        public Video FindVideo(int id)
        {
            return _repo.Find<Video>(id);
        }

        public void CreateVideo(Video videoUpload)
        {
            _repo.Add<Video>(videoUpload);
            _repo.SaveChanges();
        }

        public void EditVideo(Video videoUpload)
        {
            var original = this.FindVideo(videoUpload.Id);
            original.Name = videoUpload.Name;
            original.Description = videoUpload.Description;
            original.VideoLink = videoUpload.VideoLink;
            _repo.SaveChanges();
        }

        public void DeleteVideo(int id)
        {
            _repo.Delete<Video>(id);
            _repo.SaveChanges();
        }


        public IList<Video> FindVideos(string search) {

            return _repo.Query<Video>().Where((v) => v.Name.Contains(search)).ToList();
        }



    }
}