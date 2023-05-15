import React, { useMemo } from 'react'
// import IMAGES from '../../images'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchPosts } from '../../store/slice/posts/postsAPI'
import { selectPosts } from '../../store/slice/posts/postsSlice'
import { resetSearch, selectSearch } from '../../store/slice/search/searchSlice'
import Spinner from '../Spinner/Spinner'
function Posts() {
    const dispatch = useDispatch()
    const {data: posts, isLoading} = useSelector(selectPosts)
    const search = useSelector(selectSearch)
    useEffect(() => {
        if(!posts.length){
            dispatch(fetchPosts())
        }
    },[])
    useEffect(() => {
        return () => {
            dispatch(resetSearch())
        }
    }, [])

    const filteredPosts = useMemo(() => {
        if (search) {
            return [...posts.filter(post => post.name.includes(search.toLowerCase()))].sort((a, b) => a.name.indexOf(search.toLowerCase()) - b.name.indexOf(search.toLowerCase()))
        }
        return posts
    }, [posts, search])

  return (
    <>
        { 
            isLoading ? <Spinner /> :
            filteredPosts.map(el => <Post key={el.id} id={el.id} img={el.img} name={el.name} likesCount={el.likesCount} postText={el.postText} comments={el.comments} timeAgo={el.timeAgo} />)
        }
    </>
  )
}

export default Posts