import "./proyectDetail.css"
import { projectDataType, userAccesProjectType } from "../../types/Projects"
import { formateDate } from "../../utils/transformDate"
import { serviceUserProjectType } from "../../types/Services"
import AddNewMember from "./AddNewMember"

interface Props { 
    projectInformation: projectDataType | undefined,
    usersWithAcces: userAccesProjectType[] | undefined,
    projectServices: serviceUserProjectType[] | [],
    getProjectData: (ejecuteLoad: boolean) => void
}

const ProjectInfoDetail = ({projectInformation, usersWithAcces, projectServices, getProjectData}: Props) => { 

    console.log(projectServices)

    return ( 
        <div>
            <div className="flex justify-between items-center">
                <h2>Información</h2>
                <AddNewMember usersWithAcces={usersWithAcces} projectId={projectInformation?.id} getProjectData={getProjectData}/>
            </div>
                <p><strong>Cliente:</strong> { projectInformation?.clientData.name}</p>
                <p><strong>Nombre:</strong>{ projectInformation?.name}</p>
                <p><strong>Fecha de Inicio:</strong> {formateDate(projectInformation?.startDate)}</p>
                <p><strong>Monto:</strong> {projectInformation?.amount}</p>

                <div className="flex items-center">
                  <p><strong>Participantes:</strong></p>
                        {usersWithAcces?.map((us : userAccesProjectType, index: number) => (  
                            <span key={us.userData.name}>
                                { us.userData.name}
                                {index < usersWithAcces.length - 1 && " , "}
                          </span>
                        ))}
                </div>

                <p><strong>Descripción:</strong> {projectInformation?.description}</p>
                
                <div className="flex items-center">
                    <p><strong>Servicios: </strong></p>
                    {projectServices.length > 0 ?
                        <div className="flex flex-col items-start">
                            {projectServices.map((pr: serviceUserProjectType) => ( 
                                <p> {pr.service.name}</p>
                            ))}
                        </div> 
                    : null}
                </div>
        </div>
    )
}

export default ProjectInfoDetail