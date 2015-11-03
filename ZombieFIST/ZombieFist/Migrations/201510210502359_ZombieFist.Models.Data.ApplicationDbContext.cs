namespace ZombieFist.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ZombieFistModelsDataApplicationDbContext : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.PlanLocations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LocationType = c.Int(nullable: false),
                        Title = c.String(),
                        Latitude = c.Double(nullable: false),
                        Longitude = c.Double(nullable: false),
                        User_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.User_Id)
                .Index(t => t.User_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PlanLocations", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.PlanLocations", new[] { "User_Id" });
            DropTable("dbo.PlanLocations");
        }
    }
}
