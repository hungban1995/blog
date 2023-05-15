import { createSlice } from '@reduxjs/toolkit'

const notify = createSlice({
  name: 'notify',
  initialState: {
    notifyMessage: {
      show: false,
      message: '',
      status: ''
    }
  },
  reducers: {
    getNotify(state, action) {

      state.notifyMessage = action.payload
    },
    clearNotify(state) {
      state.notifyMessage = {
        show: false,
        message: '',
        status: ''
      }
    }
  }
})

export const { getNotify, clearNotify } = notify.actions
export default notify.reducer