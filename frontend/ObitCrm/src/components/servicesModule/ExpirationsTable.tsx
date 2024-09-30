import "./styles.css"
import { ServiceWithProjectType } from "../../types/Services"
import { formateDate } from "../../utils/transformDate"

interface Props { 
    servicesEndDateOrdered: ServiceWithProjectType[] | []
}

const ExpirationsTable = ({servicesEndDateOrdered}: Props) => { 

    const currentDate = new Date().getTime();


    return ( 
        <div>
             <table className="table">
            <thead>
                <tr>
                    <th>Servicio</th>
                    <th>Proyecto</th>
                    <th>Vencimiento</th>
                    <th>Faltan</th>
                </tr>
            </thead>
            <tbody>
            {servicesEndDateOrdered.map((serv: ServiceWithProjectType) => {
                    const currentDate = new Date().getTime();
                    const endDate = new Date(serv.endDate).getTime();            
                    const daysRemaining = Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24)); // 1000 ms * 60 s * 60 min * 24 h

                    return (
                    <tr key={serv.serviceId}>
                        <td>{serv.serviceName}</td>
                        <td>{serv.projectName}</td>
                        
                        {endDate <= currentDate ? (
                        <td className="bg-red-600 text-white font-medium">
                            {formateDate(serv.endDate)}
                        </td>
                        ) : (
                        <td>{formateDate(serv.endDate)}</td>
                        )}
                        <td>
                        {endDate > currentDate ? `${daysRemaining} días` : "Vencido"}
                        </td>
                    </tr>
                    );
                })}
            </tbody>
      </table>
        </div>
    )
}

export default ExpirationsTable