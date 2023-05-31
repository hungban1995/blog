import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
import refreshReducer from './refreshReducer'
import updateDataReducer from './updateDataReducer'
import userReducer from './userReducer'
import loadingReducer from './loadingReducer'


export default configureStore({
    reducer: {
        notify: notificationReducer,
        refresh: refreshReducer,
        update: updateDataReducer,
        user: userReducer,
        loading: loadingReducer
    }
})