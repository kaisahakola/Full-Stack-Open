/* eslint-disable react/prop-types */
const BlogForm = (props) => (
    <form onSubmit={props.addBlog}>
        <div>
            title
            <input
                type="text"
                name="title"
                value={props.newBlog.title}
                onChange={props.handleBlogChange} 
            />
        </div>

        <div>
            author
            <input
                type="text"
                name="author"
                value={props.newBlog.author}
                onChange={props.handleBlogChange}
            />
        </div>

        <div>
            url
            <input 
                type="text"
                name="url"
                value={props.newBlog.url}
                onChange={props.handleBlogChange}
            />
        </div>

        <div>
            likes
            <input 
                type="number"
                name="likes"
                value={props.newBlog.likes}
                onChange={props.handleBlogChange}
            />
        </div>

        <button type="submit">add</button>
    </form>
)

export default BlogForm