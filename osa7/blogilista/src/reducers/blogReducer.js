import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blog'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.concat(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blogObj => {
  return async dispatch => {
    const newBlog = await blogService.createNew(blogObj)
    dispatch(appendBlog(newBlog))
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const updateBlog = (blogObj, id) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blogObj, id)
    dispatch(appendBlog(updatedBlog))
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    const blogs = await blogService.getAll()
    const updatedBlogList = blogs.filter(b => b.id !== id)
    dispatch(setBlogs(updatedBlogList))
  }
}

export default blogSlice.reducer
