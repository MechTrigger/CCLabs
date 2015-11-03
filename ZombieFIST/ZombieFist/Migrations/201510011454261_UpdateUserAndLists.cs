namespace ZombieFist.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateUserAndLists : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.PlanLists",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        User_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.User_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.PlanListItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Text = c.String(),
                        PlanList_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.PlanLists", t => t.PlanList_Id)
                .Index(t => t.PlanList_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PlanLists", "User_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.PlanListItems", "PlanList_Id", "dbo.PlanLists");
            DropIndex("dbo.PlanListItems", new[] { "PlanList_Id" });
            DropIndex("dbo.PlanLists", new[] { "User_Id" });
            DropTable("dbo.PlanListItems");
            DropTable("dbo.PlanLists");
        }
    }
}
