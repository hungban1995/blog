import { createSlice } from '@reduxjs/toolkit'

const refresh = createSlice({
    name: 'refresh',
    initialState: {
        num: 1
    },
    reducers: {
        getRefresh(state) {
            state.num++
        },

    }
})

export const { getRefresh } = refresh.actions
export default refresh.reducer