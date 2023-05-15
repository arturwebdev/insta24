import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async function() {
        const { data: usersData } = await axios.get('https://jsonplaceholder.typicode.com/users')
        const { data: postsData } = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=500')

        const data = [
            ...usersData.map(user => ({
                id: user.id.toString(),
                email: user.email.toLowerCase(),
                password: user.address.city.toLowerCase(),
                username: user.username.toLowerCase(),
                name: user.name,
                avatar: `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`,
                followers: Math.round(Math.random() * 199) + 800,
                following: Math.round(Math.random() * 300) + 400,
                bio: user.company.catchPhrase.repeat(3),
                posts: [
                    ...postsData.filter(post => post.albumId === user.id)
                                   .map(post => ({
                                       id: post.id + '_' + user.id,
                                       img: post.url,
                                       name: user.username.toLowerCase(),
                                       postText: post.title.slice(post.title.indexOf(' ') + 1),
                                       likesCount: Math.round(Math.random() * 250) + 700,
                                       timeAgo: Math.round(Math.random() * 7) + 2 + ' Minutes Ago',
                                       comments: []
                                   })) 
                ]
            }))
        ]
    
        return data
    }
)