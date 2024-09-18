import { userFollowsUpType } from "../../types/FollowsUp"
import { formateDate } from "../../utils/transformDate"
import "./styles.css"

interface Props { 
    userFollowsUpData: userFollowsUpType[] | []
}

const FollowsUpTable = ({userFollowsUpData}: Props) => { 
    return ( 
        <div>
           <table className="trackings-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Última Comunicación</th>
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
                        <td>{us.note}</td>
                        <td><button className="btn-action view-history" data-client="Cliente A">Ver Histórico</button></td>
                        <td>
                            <button className="btn-action edit" data-client="Cliente A"><i className="fas fa-pencil-alt"></i></button>
                            <button className="btn-action delete" data-client="Cliente A"><i className="fas fa-trash-alt"></i></button>
                            <button className="btn-action details" data-client="Cliente A"><i className="fas fa-eye"></i></button>
                        </td>
                    </tr>
                   ))}
                </tbody>
           </table>
        </div>
    )
}

export default FollowsUpTable