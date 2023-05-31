import { createSlice } from '@reduxjs/toolkit'

const loading = createSlice({
    name: 'loading',
    initialState: {
        active: false
    },
    reducers: {
        getLoading(state, action) {
            state.active = action.payload
        },

    }
})

export const { getLoading } = loading.actions
export default loading.reducer