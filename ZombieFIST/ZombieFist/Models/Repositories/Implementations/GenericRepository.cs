using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.Validation;
using System.Linq;
using System.Data.Entity;
using ZombieFist.Models.Data;
using ZombieFist.Models.DomainModels;

namespace ZombieFist.Models.Repositories.Implementations
{
    public class GenericRepository : IGenericRepository
    {
        private readonly ApplicationDbContext _dataContext = new ApplicationDbContext();
        public T Get<T>(Int32 id) where T : class
        {
            return this._dataContext.Set<T>().Find(id);
        }

        public IQueryable<T> Query<T>() where T : class
        {
            return this._dataContext.Set<T>().AsQueryable();
        }

        public void Add<T>(T entityToCreate) where T : class
        {
            this._dataContext.Set<T>().Add(entityToCreate);
        }
              
        public void Delete<T>(int id) where T : class
        {
            var entity = this.Get<T>(id);
	        this.Delete(entity);
        }

		public void Delete<T>(T entity) where T : class {
			this._dataContext.Set<T>().Remove(entity);
		}
        
        public void SaveChanges()
        {
            try
            {
                this._dataContext.SaveChanges();
            }
            catch (DbEntityValidationException dbVal)
            {
                var firstError = dbVal.EntityValidationErrors.First().ValidationErrors.First().ErrorMessage;
                throw new ValidationException(firstError);
            }
        }

        public void Dispose()
        {
            this._dataContext.Dispose();
        }

        protected ApplicationUser CurrentUser(String userId)
        {
            return this.Query<ApplicationUser>()
                       .Include(user => user.Lists)
                       .Include(user => user.Lists.Select(list => list.Items))
                       .Include(user => user.Locations)
                       .Single(u => u.Id == userId);
        }
    }
}