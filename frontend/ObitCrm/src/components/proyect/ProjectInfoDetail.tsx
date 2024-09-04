import "./proyectDetail.css"
import { projectDataType, userAccesProjectType } from "../../types/Projects"
import { formateDate } from "../../utils/transformDate"


interface Props { 
    projectInformation: projectDataType | undefined,
    usersWithAcces: userAccesProjectType[] | undefined
}

const ProjectInfoDetail = ({projectInformation, usersWithAcces}: Props) => { 
    return ( 
        <div>
            <h2>Información</h2>
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
        </div>
    )
}

export default ProjectInfoDetail