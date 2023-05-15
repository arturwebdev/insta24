import React, { useEffect, useRef } from 'react'
import './Login.css'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, selectUsers } from '../../store/slice/users/usersSlice'
import { fetchUsers } from '../../store/slice/users/usersAPI'
import { useNavigate } from 'react-router-dom'
function Login() {
    const formRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {usersData, currentUser} = useSelector(selectUsers)
    useEffect(() => {
        if(currentUser) {
            navigate('/')
        }
    },[currentUser])
    
    useEffect(() => {
        if(!usersData.length){
            dispatch(fetchUsers())
        }
    },[])

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(logIn({
            login: formRef.current[0].value,
            password: formRef.current[1].value          
        }))
            formRef.current.reset()
        } 

  return (
    <div className='LogDiv'>
        <img alt='' src='http://localhost:3000/static/media/logo.a96501a686589d1697a8.PNG'></img>
        <form ref={formRef} onSubmit={handleSubmit}>
            <input type="text" defaultValue={'bret'} placeholder='Login'  required /><br/><br/>
            <input type="password" defaultValue={'gwenborough'} placeholder='password' required /><br/><br/>
            <button>Sign In</button>
        </form>
        <div className='facebookDiv'>
            <a href='https://www.facebook.com/'><h2>Login with Facebook</h2></a>
        </div>
    </div>
  )
}

export default Login