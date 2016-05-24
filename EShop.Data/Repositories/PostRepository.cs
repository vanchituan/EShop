using EShop.Data.Infrastructure;
using EShop.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Data.Repositories
{
    public interface IPostRepository : IRepository<Post>
    {
        IEnumerable<Post> GetAllByTag(string tag, int pageIndex, int pageSize, out int totalRow);
    }

    public class PostRepository : RepositoryBase<Post>, IPostRepository
    {
        public PostRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }

        public IEnumerable<Post> GetAllByTag(string tag, int pageIndex, int pageSize, out int totalRow)
        {
            var model = from a in DbContext.Posts
                        join b in DbContext.PostTags on a.ID equals b.PostID
                        where b.TagID == tag && a.Status
                        orderby a.CreatedDate descending
                        select a;
            totalRow = model.Count();
            model = model.Skip((pageIndex - 1) * pageSize).Take(pageSize);
            return model;
        }
    }
}
