using Rocbook.Models;
using Rocbook.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Rocbook.Controllers
{
    public class VideoUploadsController : Controller
    {
        private IVideoUploadService _videoUploadService;

        public VideoUploadsController(IVideoUploadService videoUploadService)
        {
            _videoUploadService = videoUploadService;
        }

        // GET: VideoUploads
        public ActionResult Index()
        {
            var videoUploads = _videoUploadService.ListVideoUploads();
            return View(videoUploads);
        }

        // GET: VideoUploads/Details/5
        public ActionResult Details(int id)
        {
            var original = _videoUploadService.FindVideoUpload(id);
            return View();
        }

        // GET: VideoUploads/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: VideoUploads/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(VideoUpload videoUpload)
        {
            if (ModelState.IsValid)
            {
                _videoUploadService.CreateVideoUpload(videoUpload);
                return RedirectToAction("Index");
            }
            return View();
        }

        // GET: VideoUploads/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: VideoUploads/Edit/5
        [HttpPost]
        public ActionResult Edit(VideoUpload videoUpload)
        {
            if (ModelState.IsValid)
            {
                _videoUploadService.EditVideoUpload(videoUpload);
                return RedirectToAction("Index");
            }
            return View();
        }

        // GET: VideoUploads/Delete/5
        public ActionResult Delete(int id)
        {
            var original = _videoUploadService.FindVideoUpload(id);
            return View(original);
        }

        // POST: VideoUploads/Delete/5
        [HttpPost]
        [ActionName("Delete")]
        public ActionResult DeleteReally(int id)
        {
            _videoUploadService.DeleteVideoUpload(id);
            return RedirectToAction("Index");
        }
    }
}
