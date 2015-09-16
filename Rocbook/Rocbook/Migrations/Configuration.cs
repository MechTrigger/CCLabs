namespace Rocbook.Migrations
{
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Rocbook.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "Rocbook.Models.ApplicationDbContext";
        }

        protected override void Seed(Rocbook.Models.ApplicationDbContext context)
        {
           

            var videoUploads = new VideoUpload[]
            {
                new VideoUpload {Name = "Tosin Abasi", Description = "The Woven Web", VideoLink = "https://www.youtube.com/embed/TNwx84UPzFY" },
                new VideoUpload {Name = "Animals As Leaders", Description = "Tempting Time", VideoLink = "https://www.youtube.com/embed/StKMAijQcpk" }
            };
            context.VideoUploads.AddOrUpdate(v => v.Name, videoUploads);
        }
    }
}
