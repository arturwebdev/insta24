import { createSlice } from "@reduxjs/toolkit"
import { fetchPosts } from "./postsAPI"

const postsSlice = createSlice({
    name:'posts',
    initialState:{
        isLoading: false,
        data:[],
        isError: false
    },
    // initialState:[],
    reducers:{
        addComment(state, {payload: {postId, body, username}}){
                const idx = state.data.findIndex(post => post.id === postId)

                state.data[idx].comments.push({
                    id: new Date().getTime().toString(),
                    username, body
                })
        },
        addPost(state, {payload}){
            state.data.unshift(payload)
        }
    },
    extraReducers:{
        [fetchPosts.pending]: (state) => {
            state.isLoading = true
            state.isError = false
        },
        [fetchPosts.fulfilled]: (state, {payload}) => {
            state.data.push(...payload)
            state.isLoading = false
            state.isError = false
        },
        [fetchPosts.rejected]: (state) => {
            state.isLoading = false
            state.isError = true
        }
    }
} )
// reducers:{
//     addComment(state, {payload: {postId, body, username}}){
//             const idx = state.findIndex(post => post.id === postId)

//             state[idx].comments.push({
//                 id: new Date().getTime().toString(),
//                 username, body
//             })
//     }
// },
// extraReducers:{
//     [fetchPosts.pending]: () => {
//     },
//     [fetchPosts.fulfilled]: (state, {payload}) => {
//         state.push(...payload)
//     },
//     [fetchPosts.rejected]: () => {
//     }
// }
// } )

export const selectPosts = state => state.posts

export const { addComment } = postsSlice.actions

export const postsReducer = postsSlice.reducer