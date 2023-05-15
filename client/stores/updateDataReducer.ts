import { createSlice } from '@reduxjs/toolkit'

const update = createSlice({
    name: 'update',
    initialState: {
        data: {
            show: false,
            type: '',
            value: {}
        }
    },
    reducers: {
        getUpdate(state, actions) {
            state.data = actions.payload
        },
        refreshUpdate(state) {
            state.data = {
                show: false,
                type: '',
                value: {}
            }
        }

    }
})

export const { getUpdate, refreshUpdate } = update.actions
export default update.reducer