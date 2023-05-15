import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { postsReducer } from "./slice/posts/postsSlice"
import { searchReducer } from "./slice/search/searchSlice"
import { usersReducer } from "./slice/users/usersSlice"
import searchMiddlewares from "./middleware/search"
import { messagesReducer } from "./slice/messages/messagesSlice"
import { addPost } from "./middleware/addAndDeletePost"

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    posts: postsReducer,
    search: searchReducer,
    users: usersReducer,
    messages: messagesReducer
})

const persistConfig = {
    key: 'insta24',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)



const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return [
            ...getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }), 
            ...searchMiddlewares(),
            addPost
        ]
    }
})

export const persistor = persistStore(store)

export default store
