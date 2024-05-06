import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setAllUsers(state, action) {
      return [...action.payload]
    },
  },
})

export const { setAllUsers } = userSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAllUsers()
    dispatch(setAllUsers(users))
  }
}

export default userSlice.reducer
