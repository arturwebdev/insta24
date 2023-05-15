import { useDispatch, useSelector } from 'react-redux'
import './MessengerPeoplesMessage.css'
import { selectMessages, toggleActiveUser } from '../../store/slice/messages/messagesSlice'
import { selectUsers } from '../../store/slice/users/usersSlice'

function MessengerPeoplesMessage({id,name,active,img}) {
	const {activeUserId} = useSelector(selectMessages)
	const {currentUser} = useSelector(selectUsers)
	const dispatch = useDispatch()
  return (
	  <div onClick={() => dispatch(toggleActiveUser({fromId: currentUser.id, toId: id}))} style={{ backgroundColor: activeUserId === id ? 'rgb(215 215 215)' : 'white'}} className='Messenger-left-col-people-message'>
		<div className='Messsage-img'>
			<img src={img} alt=''/>
		</div>
		<div className='Message-info'>
			<p>{name}</p>
			<p>{active}</p>
		</div>
	 </div>
  )
}

export default MessengerPeoplesMessage
