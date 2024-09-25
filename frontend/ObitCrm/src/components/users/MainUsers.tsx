import React from 'react'
import { useEffect, useState } from 'react'
import apiBackendUrl from '../../lib/axiosData'
import { UserTypeData } from '../../types/User'
import { useNavigate } from 'react-router-dom'
import { userStore } from '../../store/UserAccount'

const MainUsers = () => {

    const [usersData, setUsersData] = useState<UserTypeData[]>([])
    const navigate = useNavigate()
    const {user} = userStore()

    const getUsers = async () => { 
        try {
            const {data, status} = await apiBackendUrl.get("/user/everyUsersData")
            if(status === 200) {
                const filteredUsers = data.filter((us: UserTypeData) => us.id !== user?.id)
                setUsersData(filteredUsers) 
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { 
        getUsers()
    }, [])

    const redirectToUserChat = (id: number) => { 
        console.log("id recibido", id)
        const userAccountId = user?.id
        const userId = id
        navigate(`/chat/${userAccountId}/${userId}`)
    }

  return (
    <div className='flex flex-col items-center jsutify-center mt-36'>
          {usersData.map((us : UserTypeData) => ( 
            <div className='flex flex-col justify-start text-start border items-start' key={us.id}>
                  <p onClick={() => redirectToUserChat(us.id)} className='cursor-pointer mt-1 underline'>{us.name}</p>
            </div>
          ))}
    </div>
  )
}

export default MainUsers