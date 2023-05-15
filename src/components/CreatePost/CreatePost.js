import React, { useRef } from 'react';
import IMAGES from '../../images';
import './CreatePost.css'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const CreatePost = () => {
    const formRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch({
            type: 'addPost',
            payload: {
                desc: formRef.current[0].value,
                url: formRef.current[1].value,
            }
        })
        navigate('/')
        formRef.current.reset()
    }
    return (
        <div style={{marginTop: '100px', textAlign: 'center'}} className='container'>
            <h1 style={{fontSize: '50px' }}>Create Post</h1>
            <br/>
            <img style={{margin:'auto'}} width='100px' src={IMAGES.createPost} alt="" />   
            <br/>
            <form onSubmit={handleSubmit} ref={formRef} style={{marginTop: '50px'}} method="post" enctype="multipart/form-data">
                <input type="text" placeholder='desc' /><br/><br/>
                <input type="text" placeholder='url' /><br/><br/>
                <label class="input-file">
                    <input type="submit" style={{display: 'none'}} name="file"/>		
                    <span>Выберите файл</span>
                </label>
            </form>
        </div>
    );
}

export default CreatePost;
