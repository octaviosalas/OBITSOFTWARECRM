import { projectMessagesType } from "../../types/Projects"
import ProjectMessagesData from "./ProjectMessagesData"
import "./proyectDetail.css"
import { useState } from "react"

interface Props { 
    projectsMessages: projectMessagesType[] | [],
    updateMessages: (ejecuteLoad: boolean) => void,
    projectId: string | undefined
}


const ProjectMessagesDetail = ({projectsMessages, updateMessages, projectId}: Props) => { 
     
    const [showSendMessage, setShowSendMessage] = useState<boolean>(false)


    return ( 
        <div className="flex flex-col items-start justify-start">
            <ProjectMessagesData projectsMessages={projectsMessages} projectId={projectId} updateMessages={updateMessages}/>
        </div>
    )
}

export default ProjectMessagesDetail