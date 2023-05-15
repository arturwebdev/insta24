import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import { useSelector } from 'react-redux'
import { selectUsers } from '../store/slice/users/usersSlice'

function HomeWrapper() {
  const {currentUser} = useSelector(selectUsers)
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  }, [currentUser])

  return (
    <div>
    <Navbar avatar={currentUser?.avatar} />
    <Outlet />
    </div>
  )
}

export default HomeWrapper