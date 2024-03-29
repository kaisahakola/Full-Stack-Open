import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        showNotification(state, action) {
            return action.payload
        }
    }
})

export const { showNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
    const timeout = time * 1000
    return async dispatch => {
        dispatch(showNotification(content))
        setTimeout(() => {
            dispatch(showNotification(null))
        }, timeout)
    }
}

export default notificationSlice.reducer