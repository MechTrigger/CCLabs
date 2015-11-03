using System;
using System.Linq;

namespace ZombieFist.Models.Repositories
{
    public interface IGenericRepository: IDisposable
    {
        T Get<T>(Int32 id) where T : class;
        IQueryable<T> Query<T>() where T : class;
        void Add<T>(T entityToCreate) where T : class;
        void Delete<T>(Int32 id) where T : class;
	    void Delete<T>(T entity) where T : class;
        void SaveChanges();
    }
}

