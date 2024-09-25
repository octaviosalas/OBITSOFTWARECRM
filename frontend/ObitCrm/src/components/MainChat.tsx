import { useNavigate } from 'react-router-dom'
import { userStore } from '../store/UserAccount'

const MainChat = () => {

    const navigate = useNavigate()
    const {user} = userStore()

    const redirectToChat = (userId: number) => { 
       navigate(`/chat/${user?.id}/${userId}`)
    }

  return (
    <div className='flex flex-col items-center justify-center mt-44'>
         <p onClick={() => redirectToChat(1)} className='cursor-pointer text-lg mt-2'>1</p>
         <p onClick={() => redirectToChat(2)} className='cursor-pointer text-lg mt-2'>2</p>
         <p onClick={() => redirectToChat(3)} className='cursor-pointer text-lg mt-2'>3</p>
         <p onClick={() => redirectToChat(4)} className='cursor-pointer text-lg mt-2'>4</p>
         <p onClick={() => redirectToChat(5)} className='cursor-pointer text-lg mt-2'>5</p>
         <p onClick={() => redirectToChat(6)} className='cursor-pointer text-lg mt-2'>6</p>
    </div>
  )
}

export default MainChat