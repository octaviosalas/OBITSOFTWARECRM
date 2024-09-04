import "./proyectDetail.css"
import { userStore } from "../../store/UserAccount"
import React, { useState } from "react"
import { getCurrentDateWithoutTime } from "../../utils/actualDate"
import apiBackendUrl from "../../lib/axiosData"
import { shootSuccesToast } from "../../utils/succesToastFunction"
import handleError from "../../utils/axiosErrorHanlder"
import SpinnerComponent from "../Spinner/Spinner"
import { newMessageProjectType } from "../../types/Projects"


interface Props { 
    updateMessages: () => void,
    projectId: string | undefined,
    ocultSendMessage: () => void
}

const SendProjectMessage = ({updateMessages, projectId, ocultSendMessage}: Props) => { 

    const {user} = userStore()
    const [message, setMessage] = useState<string>("")
    const [load, setLoad] = useState<boolean>(false)

    const actualDate = getCurrentDateWithoutTime()

    const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => { 
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
                updateMessages()
                shootSuccesToast(data)
                setMessage("")
                ocultSendMessage()
            }
        } catch (error) {
            handleError(error, setLoad)
        }
    }

    return ( 
        <div id="sendMessageForm" className="form-container"  >
            <h3>Enviar Mensaje</h3>
            <div className="form-group">
                <label>Mensaje:</label>
                <textarea id="messageContent" onChange={handleChangeMessage}/>
            </div>

           {! load ?
            <div className="flex items-center gap-6">
                <button className="btn" onClick={() => createMessage()}>Enviar Mensaje</button>
                <button className="btn btn-danger">Cancelar</button>
            </div> : <SpinnerComponent/>}

    </div>
    )
}

export default SendProjectMessage