import React from 'react'
import { projectMessagesType } from '../../types/Projects'
import "./proyectDetail.css"

interface Props { 
    projectsMessages: projectMessagesType[] | [],
}

const ProjectMessagesData = ({projectsMessages}: Props) => {
  return (
    <div id="messageHistory" className="message-box w-full"> 
       <h3>Historial de Mensajes</h3>
        {projectsMessages.length > 0 ?
        <div className='mt-2'>
            {projectsMessages.map((pr : projectMessagesType) => ( 
                <div>
                    <p><strong>{pr.userData.name}</strong> {pr.message} </p>
                </div>
            ))}
             
        </div> : 
        <div>
            <p>Sin mensajes</p>
        </div>
        }
   </div>
  


  )
}

export default ProjectMessagesData
