import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  status: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
  },
})

export const { showNotification } = notificationSlice.actions

export const setNotification = (message, time, status) => {
  const timeout = time * 1000
  return async dispatch => {
    dispatch(showNotification({ message, status }))
    setTimeout(() => {
      dispatch(showNotification({ message: null, status: null }))
    }, timeout)
  }
}

export default notificationSlice.reducer
