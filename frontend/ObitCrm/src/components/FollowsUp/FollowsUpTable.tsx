import { userFollowsUpType } from "../../types/FollowsUp"
import { formateDate } from "../../utils/transformDate"
import DeleteFollowUp from "./DeleteFollowUp"
import EditFollowUp from "./EditFollowUp"
import "./styles.css"
import ViewAllFollowUpNote from "./ViewAllFollowUpNote"
import ViewClientHistoricFollowUp from "./ViewClientHistoricFollowUp"

interface Props { 
    userFollowsUpData: userFollowsUpType[] | [],
    updateTable: () => void
}

const FollowsUpTable = ({userFollowsUpData, updateTable}: Props) => { 
    return ( 
        <div>
           <table className="trackings-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Próxima Comunicación</th>
                        <th>Nota</th>
                        <th>Histórico</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                   {userFollowsUpData.map((us : userFollowsUpType) => (  
                    <tr key={us.id}>
                        <td>{us.clientData.name}</td>
                        <td>{formateDate(us.contactDate)}</td>
                        <td>{formateDate(us.nextContactDate)}</td>
                            <td className="border b-2">
                                <div className="flex items-center gap-1">
                                    {us.note.length > 50
                                        ? `${us.note.slice(0, 50)}... `
                                        : us.note}
                                    {us.note.length > 50 && (
                                        <ViewAllFollowUpNote  message={us.note} followUpId={us.id} clientId={us.clientData.id} updateTable={updateTable}/>
                                    )}
                                </div>
                            </td>                        
                        <td> <div className="flex items-center justify-center"> <ViewClientHistoricFollowUp type="onTable" clientId={Number(us.clientData.id)} clientName={us.clientData.name}/> </div> </td>
                        <td>
                            <EditFollowUp updateTable={updateTable} followUpData={us}/>
                            <DeleteFollowUp updateTable={updateTable}  clientId={us.clientData.id} followUpId={us.id}/>
                        </td>
                    </tr>
                   ))}
                </tbody>
           </table>
        </div>
    )
}

export default FollowsUpTable