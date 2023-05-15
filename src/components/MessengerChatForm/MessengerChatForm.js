import './MessengerChatForm.css'
import IMAGES from '../../images'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../../store/slice/messages/messagesSlice'
import { selectUsers } from '../../store/slice/users/usersSlice'

function MessengerChatForm() {
	const {currentUser} = useSelector(selectUsers)
	const formRef = useRef(null)
	const dispatch = useDispatch()
	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(addMessage({
			body: formRef.current[0].value,
			fromId: currentUser.id
		}))
		formRef.current.reset()
	}
  return (
	<form onSubmit={handleSubmit} ref={formRef}>
		<div className='Chat-input'>
			<input type='text' placeholder='Message...'/>
			<label>
				<input type="submit" style={{display: 'none'}} />
				<img src={IMAGES.like} alt=''/>
			</label>
		</div>
	</form>
  )
}

export default MessengerChatForm
