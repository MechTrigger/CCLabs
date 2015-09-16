using System.Collections.Generic;
using Rocbook.Models;

namespace Rocbook.Services
{
    public interface IVideoUploadService
    {
        void CreateVideoUpload(VideoUpload videoUpload);
        void DeleteVideoUpload(int id);
        void EditVideoUpload(VideoUpload videoUpload);
        VideoUpload FindVideoUpload(int id);
        IList<VideoUpload> ListVideoUploads();
    }
}