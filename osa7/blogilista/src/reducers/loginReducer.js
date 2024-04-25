import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blog'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    username: '',
    password: '',
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setUsername(state, action) {
      state.username = action.payload
    },
    setPassword(state, action) {
      state.password = action.payload
    },
    clearUser(state) {
      state.user = null
      state.username = ''
      state.password = ''
    },
  },
})

export const { setUser, setUsername, setPassword, clearUser } =
  loginSlice.actions

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setUser(user))
    dispatch(setUsername(username))
    dispatch(setPassword(password))
  }
}

export default loginSlice.reducer
