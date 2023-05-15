import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async function(){
        const {data : postsData} = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=100')
        const {data : commentsData} = await axios.get('https://jsonplaceholder.typicode.com/comments')
       
        const data = [
            ...postsData.map(post => ({
                id: post.id.toString(),
                img: post.url,
                name: post.title.slice(0, post.title.indexOf(' ')),
                postText: post.title.slice(post.title.indexOf(' ') + 1),
                likesCount: Math.round(Math.random() * 250) + 700,
                timeAgo: Math.round(Math.random() * 7) + 2 + ' Minutes Ago',
                comments: [
                    ...commentsData.filter(comment => comment.postId === post.id)
                                    .map(comment => ({
                                        id: comment.id.toString(),
                                        username: comment.name.split(' ')[0],
                                        body: comment.body
                                    }))
                    ]
                }))
            ]
        return data 
    }
)