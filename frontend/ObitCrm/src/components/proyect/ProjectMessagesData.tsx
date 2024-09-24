import { projectMessagesType } from '../../types/Projects'
import "./proyectDetail.css"
import { userStore } from '../../store/UserAccount'
import { formateDate } from '../../utils/transformDate';
import sendMessageIcon from "../../images/send-message.png"
import React, { useState } from "react"
import { getCurrentDateWithoutTime } from "../../utils/actualDate"
import apiBackendUrl from "../../lib/axiosData"
import { shootSuccesToast } from "../../utils/succesToastFunction"
import handleError from "../../utils/axiosErrorHanlder"
import SpinnerComponent from "../Spinner/Spinner"
import { newMessageProjectType } from "../../types/Projects"

interface Props { 
    projectsMessages: projectMessagesType[] | [],
    projectId: string | undefined,
    updateMessages: (ejecuteLoad: boolean) => void
}

const ProjectMessagesData = ({projectsMessages, projectId, updateMessages}: Props) => {

    const {user} = userStore()
    const [message, setMessage] = useState<string>("")
    const [load, setLoad] = useState<boolean>(false)

    const actualDate = getCurrentDateWithoutTime()

    const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setMessage(e.target.value)
    }

    const createMessage = async () => {
        setLoad(true) 
        console.log("Actual date", actualDate)
        console.log(user)
        const newMessageData : newMessageProjectType = ({ 
            message: message,
            date: actualDate
        })
        try {
            const {data, status} = await apiBackendUrl.post(`/message/createNewProjectMessage/${projectId}/${user?.id}`, newMessageData)
            if(status === 200) { 
                setLoad(false)
                setMessage("")
                updateMessages(false)
                shootSuccesToast(data)
                setMessage("")
            }
        } catch (error) {
            handleError(error, setLoad)
        }
    }


  return (
   
   <div className='w-full mt-2'>
        <div className=" w-full bg-background  rounded-lg shadow-lg">
        <div className="p-2 border-b">
             <h2>Historial de Mensajes</h2>
        </div>
        <div className="max-h-[500px] overflow-y-auto w-full p-4">

            {projectsMessages.map((message) => (
            <div
                key={message.id}
                className={`flex ${
                message.userId === user?.id ? 'justify-end' : 'justify-start'
                } mb-4`}
            >
                <div
                className={`flex ${
                    message.userId === user?.id ?  'flex-row-reverse' : 'flex-row'
                } items-start max-w-[80%]`}
                >            
              
                <div
                    className={`mx-2 p-3 rounded-lg ${
                    message.userId === user?.id 
                        ? 'bg-black text-white'
                        : 'bg-blue-600 text-white' 
                    }`}
                >
                    <p className="font-semibold text-sm">{message.userData.name}</p>
                    <p className="mt-1">{message.message}</p>
                    <p className="text-xs mt-1 opacity-70">{formateDate(message.date)}</p>
                </div>
                </div>
            </div>
            ))}
        </div>
         <div className='flex items-center w-full gap-2'>
                <input type="text" className='w-full border border-gray-300 rounded-md h-12' value={message}  onChange={handleChangeMessage}/>
                {!load ? <img src={sendMessageIcon} title='Enviar Mensaje' className='h-6 w-6 cursor-pointer mr-2' onClick={() => createMessage()}/> : <SpinnerComponent/>}
            </div>
        </div>
   </div>
   
  


  )
}

export default ProjectMessagesData
