using System;
namespace RocBookAngular.Services
{
    public interface IVideoService
    {
        void CreateVideo(RocBookAngular.Models.Video videoUpload);
        void DeleteVideo(int id);
        void EditVideo(RocBookAngular.Models.Video videoUpload);
        RocBookAngular.Models.Video FindVideo(int id);
        System.Collections.Generic.IList<RocBookAngular.Models.Video> FindVideos(string search);
        System.Collections.Generic.IList<RocBookAngular.Models.Video> ListVideos();
    }
}
