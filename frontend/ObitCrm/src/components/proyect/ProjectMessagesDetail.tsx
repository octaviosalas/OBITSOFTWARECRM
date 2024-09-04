import { projectMessagesType } from "../../types/Projects"
import ProjectMessagesData from "./ProjectMessagesData"
import "./proyectDetail.css"
import SendProjectMessage from "./SendProjectMessage"
import { useState } from "react"

interface Props { 
    projectsMessages: projectMessagesType[] | [],
    updateMessages: () => void,
    projectId: string | undefined
}


const ProjectMessagesDetail = ({projectsMessages, updateMessages, projectId}: Props) => { 
     
    const [showSendMessage, setShowSendMessage] = useState<boolean>(false)

    const ocultSendMessage = () => { 
        setShowSendMessage(false)
    }

    return ( 
        <div className="flex flex-col items-start justify-start">
            <h2>Mensajería</h2>
            <button className="btn"  onClick={() => setShowSendMessage(prev => !prev)}>Enviar Mensaje</button>

              {showSendMessage ? <SendProjectMessage projectId={projectId} updateMessages={updateMessages} ocultSendMessage={ocultSendMessage}/> : null}

            <ProjectMessagesData projectsMessages={projectsMessages}/>
        </div>
    )
}

export default ProjectMessagesDetail