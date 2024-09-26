import { projectMessagesType, projectDataType } from "../../types/Projects"
import ProjectMessagesData from "./ProjectMessagesData"
import "./proyectDetail.css"
import { useState } from "react"

interface Props { 
    projectsMessages: projectMessagesType[] | [],
    updateMessages: (ejecuteLoad: boolean) => void,
    projectId: string | undefined,
    projectInformation: projectDataType | undefined
}


const ProjectMessagesDetail = ({projectsMessages, updateMessages, projectId, projectInformation}: Props) => { 
    console.log("data.porjectData  en messagedetaik", projectInformation)
     
    return ( 
        <div className="flex flex-col items-start justify-start">
            <ProjectMessagesData projectsMessages={projectsMessages} projectId={projectId} updateMessages={updateMessages} projectInformation={projectInformation}/>
        </div>
    )
}

export default ProjectMessagesDetail