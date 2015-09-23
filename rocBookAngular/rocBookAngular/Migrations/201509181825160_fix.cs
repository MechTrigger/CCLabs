namespace RocBookAngular.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class fix : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.VideoUploads", newName: "Videos");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.Videos", newName: "VideoUploads");
        }
    }
}
