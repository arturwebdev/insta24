import React from 'react'
import IMAGES from '../../images'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../../store/slice/posts/postsSlice'
import { selectUsers } from '../../store/slice/users/usersSlice'

function Post({id, img, name, comments, likesCount, postText, timeAgo}) {
    const {currentUser} = useSelector(selectUsers)
    const dispatch = useDispatch()
    const formRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        
        dispatch(addComment({
            postId: id,
            body: formRef.current[0].value,
            username: currentUser.username
        }))
        formRef.current.reset()
    }
    return (
    <div className="post">
        <div className="info">
            <span className="user">
                <div className="profile-pic"><img src={`https://img.freepik.com/free-icon/user_318-159711.jpg`} alt="" /></div>
                <p className="username">{name}</p>
            </span>
            <img src={IMAGES.option} className="options" alt=""/>
        </div>
        <img src={img} className="post-image" alt=""/>
        <div className="post-content">
            <div className="reaction-wrapper">
                <img src={IMAGES.like} className="icon" alt=""/>
                <img src={IMAGES.comment} className="icon" alt=""/>
                <img src={IMAGES.send} className="icon" alt=""/>
                <img src={IMAGES.save} className="save icon" alt=""/>
            </div>
            <p className="likes">{likesCount}</p>
            {postText && <p className="description"><span>{name} </span> {postText}</p>}
            <p className="post-time">{timeAgo}</p>
            <>
                {
                    comments.map(comment => (
                        <p key={comment.id} className="description"><span>{comment.username} </span> {comment.body}</p>

                    ))
                }
            </>
        </div>
        <form ref={formRef} onSubmit={handleSubmit}>
            <div className="comment-wrapper">
                <img src={IMAGES.smile} className="icon" alt=""/>
                <input type="text" className="comment-box" placeholder="Add a comment"/>
                <button className="comment-btn">post</button>
            </div>
        </form>
    </div>
  )
}

export default Post