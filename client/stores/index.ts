import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
import refreshReducer from './refreshReducer'
import updateDataReducer from './updateDataReducer'
import userReducer from './userReducer'


export default configureStore({
    reducer: {
        notify: notificationReducer,
        refresh: refreshReducer,
        update: updateDataReducer,
        user: userReducer
    }
})