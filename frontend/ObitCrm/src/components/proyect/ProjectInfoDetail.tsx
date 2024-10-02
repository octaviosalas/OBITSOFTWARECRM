import "./proyectDetail.css"
import { projectDataType, userAccesProjectType } from "../../types/Projects"
import { formateDate } from "../../utils/transformDate"
import { serviceUserProjectType } from "../../types/Services"
import AddNewMember from "./AddNewMember"
import UsersProjectList from "./UsersProjectList"
import editMembers from "../../images/editProjectMembers.png"
import { useState } from "react"
import DeleteProjectMember from "./DeleteProjectMember"

interface Props { 
    projectInformation: projectDataType | undefined,
    usersWithAcces: userAccesProjectType[] | undefined,
    projectServices: serviceUserProjectType[] | [],
    getProjectData: (ejecuteLoad: boolean) => void
}

const ProjectInfoDetail = ({projectInformation, usersWithAcces, projectServices, getProjectData}: Props) => { 
     
    const [wannaDelete, setWannaDelete] = useState<boolean>(false)

    return ( 
        <div className="shadow-xl p-4">
            <div className="flex justify-between items-center">
                <h2>Información</h2>
                <AddNewMember usersWithAcces={usersWithAcces} projectId={projectInformation?.id} getProjectData={getProjectData}/>
            </div>
                <p><strong>Cliente:</strong> { projectInformation?.clientData.name}</p>
                <p><strong>Nombre:</strong>{ projectInformation?.name}</p>
                <p><strong>Fecha de Inicio:</strong> {formateDate(projectInformation?.startDate)}</p>
                <p><strong>Monto:</strong> {projectInformation?.amount}</p>
                <p><strong>Descripción:</strong> {projectInformation?.description}</p>
                <div className="flex items-center">
                    <p><strong>Servicios: </strong></p>
                    {projectServices.length > 0 ?
                        <div className="flex  items-start">
                            {projectServices.map((pr: serviceUserProjectType) => ( 
                                <p> {pr.service.name} - </p>
                            ))}
                        </div> 
                    : null}
                </div>
                <div className="flex flex-col justify-start items-start">

                  <p><strong>Participantes:</strong></p>

                  <div className="flex items-center w-full justify-between">                

                       {!wannaDelete ? <UsersProjectList usersData={usersWithAcces}/> : <DeleteProjectMember usersData={usersWithAcces}/>}

                       <img src={editMembers} className="w-8 h-8 cursor-pointer" onClick={() => setWannaDelete(prevState =>  !prevState)}/>

                    </div>  
                </div>
        </div>
    )
}

export default ProjectInfoDetail