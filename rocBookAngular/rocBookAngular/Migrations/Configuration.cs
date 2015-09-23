namespace RocBookAngular.Migrations
{
    using RocBookAngular.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<RocBookAngular.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(RocBookAngular.Models.ApplicationDbContext context)
        {
            var videoUploads = new Video[]
            {
                new Video {Name = "Tosin Abasi", Description = "The Woven Web", VideoLink = "https://www.youtube.com/embed/TNwx84UPzFY" },
                new Video {Name = "Animals As Leaders", Description = "Tempting Time", VideoLink = "https://www.youtube.com/embed/StKMAijQcpk" }
            };
            context.VideoUploads.AddOrUpdate(v => v.Name, videoUploads);
        }
    }
}
