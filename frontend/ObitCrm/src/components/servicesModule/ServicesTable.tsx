import "./styles.css"
import { UnifiedProjectType } from "../../types/Services"
import { formateDate } from "../../utils/transformDate"
import EditService from "./EditService"

interface Props { 
    servicesData: UnifiedProjectType[] | []
}

const ServicesTable =  ({servicesData}: Props) => { 

  return ( 
     <div>
       <table className="services-table">
            <thead>
                <tr>
                    <th>Servicio</th>
                    <th>Proyecto</th>
                    <th>Estado</th>
                    <th>Vencimiento</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {servicesData.map((serv : UnifiedProjectType) => ( 
                    <tr key={serv.id}>
                        <td>{serv.projectData.services.map((s) => s.service.name)}</td>
                        <td>{serv.projectData.name}</td>
                        <td>Activo</td>
                        <td>{formateDate( serv.projectData.services.map((s) => s.endDate)[0])}</td>
                        <td>
                            <EditService servicesData={serv}/>
                            <button className="btn-action delete"><i className="fas fa-trash-alt"></i></button>
                            <button className="btn-action details"><i className="fas fa-eye"></i></button>
                            <button className="btn-action configure-alert" id="openAlertSection"><i className="fas fa-bell"></i></button>
                        </td>
                   </tr>
                ))}
            </tbody>
      </table>
     </div>
  )
}

export default ServicesTable