import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
    name: 'user',
    initialState: {
        userLogin: {}
    },
    reducers: {
        getUserLogin(state, action) {
            state.userLogin = action.payload
        },
        refreshLogin(state) {
            state.userLogin = {}
        },

    }
})

export const { getUserLogin, refreshLogin } = user.actions
export default user.reducer