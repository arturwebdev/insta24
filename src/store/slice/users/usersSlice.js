import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersAPI";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: null,
        usersData: []
    },
    reducers: {
        logIn(state, {payload: {login, password}}) {
            state.currentUser = state.usersData.find(user => (user.username === login || user.email === login) && user.password === password) || null
        },
        logOut(state){
            state.currentUser = null
        },
        addPost(state, {payload}){
            const userIdx = state.usersData.findIndex(user => user.id === state.currentUser.id)
            state.usersData[userIdx].posts.unshift(payload)
            state.currentUser.posts.unshift(payload)
        }
    },
    extraReducers: {
        [fetchUsers.fulfilled]: (state, {payload}) => {
            state.usersData.push(...payload)
        }
    }
})

export const selectUsers = state => state.users

export const { logIn, logOut } = usersSlice.actions

export const usersReducer = usersSlice.reducer