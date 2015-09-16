namespace Rocbook.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class videoupload : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.VideoUploads",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        VideoLink = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.VideoUploads");
        }
    }
}
