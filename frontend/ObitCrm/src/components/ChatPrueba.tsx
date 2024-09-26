import "./prueba.css"
import { useEffect, useState } from 'react'
import apiBackendUrl from '../lib/axiosData'
import { UserTypeData } from '../types/User'
import { useNavigate } from 'react-router-dom'
import { userStore } from '../store/UserAccount'
import handleError from "../utils/axiosErrorHanlder"
import SpinnerComponent from "./Spinner/Spinner"


const ChatPrueba = () => {

    const [usersData, setUsersData] = useState<UserTypeData[]>([])
    const [load, setLoad] = useState<boolean>(false)
    const navigate = useNavigate()
    const {user} = userStore()

    const getUsers = async () => { 
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.get("/user/everyUsersData")
            if(status === 200) {
                const filteredUsers = data.filter((us: UserTypeData) => us.id !== user?.id)
                setUsersData(filteredUsers) 
                console.log(data)
                setLoad(false)
            }
        } catch (error) {
            handleError(error, setLoad)
        }
    }

    useEffect(() => { 
        getUsers()
    }, [])

    const redirectToUserChat = (id: number) => { 
        const userAccountId = user?.id
        const userId = id
        navigate(`/chat/${userAccountId}/${userId}`)
    }
    
  return (
    <div className="mi-perfil-wrapper ">
<body>

<div className="team-container">
    <h2>Mi Equipo</h2>

   {!load ? 
    <div className="team-list">

        {usersData.map((us : UserTypeData) => ( 
        
             <div className="team-card" key={us.id}>
             <div className="team-member-info">
                 <div className="team-member-avatar">A</div>
                 <div className="team-member-details">
                     <strong>{us.name}</strong>
                     <span>{us.rol}</span>
                 </div>
             </div>
             <i className="fas fa-comment-dots team-chat-icon"  onClick={() => redirectToUserChat(us.id)}></i>
         </div>
          ))}

      
    </div> : 
    <div>
        <SpinnerComponent/>
    </div>
    }

    <button className="team-back-button" >Volver</button>
</div>



</body>
    </div>
  )
}

export default ChatPrueba