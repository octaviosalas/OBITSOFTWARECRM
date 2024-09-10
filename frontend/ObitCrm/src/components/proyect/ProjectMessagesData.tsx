import React from 'react'
import { projectMessagesType } from '../../types/Projects'
import "./proyectDetail.css"

interface Props { 
    projectsMessages: projectMessagesType[] | [],
}

const ProjectMessagesData = ({projectsMessages}: Props) => {
  return (
    <div id="messageHistory" className="message-box w-full"> 
       <h2>Historial de Mensajes</h2>
        {projectsMessages.length > 0 ?
        <div className='mt-2'>
            {projectsMessages.map((pr : projectMessagesType) => ( 
                <div>
                    <p><strong>{pr.userData.name}</strong> {pr.message} </p>
                </div>
            ))}
             
        </div> : 
        <div className='mt-2 flex items-center'>
           <strong> <p>No hay ningun mensaje registrado correspondiente a este proyecto</p> </strong>
        </div>
        }
   </div>
  


  )
}

export default ProjectMessagesData
