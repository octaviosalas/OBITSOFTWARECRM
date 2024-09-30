import "./proyectDetail.css"
import { projectDataType, userAccesProjectType } from "../../types/Projects"
import { formateDate } from "../../utils/transformDate"
import { serviceUserProjectType } from "../../types/Services"
import AddNewMember from "./AddNewMember"
import { Avatar } from "@nextui-org/react"
import userIcon from "../../images/user.png"

interface Props { 
    projectInformation: projectDataType | undefined,
    usersWithAcces: userAccesProjectType[] | undefined,
    projectServices: serviceUserProjectType[] | [],
    getProjectData: (ejecuteLoad: boolean) => void
}

const ProjectInfoDetail = ({projectInformation, usersWithAcces, projectServices, getProjectData}: Props) => { 

    console.log(projectServices)
    console.log(usersWithAcces)


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

                <div className="flex flex-col justify-start items-start">
                  <p><strong>Participantes:</strong></p>
                  <div className="flex flex-col">                
                        {usersWithAcces?.map((us : userAccesProjectType, index: number) => (  
                            <div key={us.userData.name} className="flex flex-col">
                                <div className="flex flex-col">
                                     <div className="flex items-center gap-2">
                                        {us.userData.profileImage !== null ? <Avatar src={us.userData.profileImage} className="w-7 h-7"/> : <Avatar src={userIcon} className="w-7 h-7"/>}
                                        {us.userData.name}            
                                     </div>                         
                                </div>
                          </div>
                        ))}
                    </div>  
                </div>

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
        </div>
    )
}

export default ProjectInfoDetail