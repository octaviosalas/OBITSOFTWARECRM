import "./proyectDetail.css"
import { projectRemindersType } from "../../types/Projects"
import { formateDate } from "../../utils/transformDate"

interface Props { 
    nextProjectReminders: projectRemindersType[] | []
}

const ProjectTableNextReminders = ({nextProjectReminders} : Props) => { 
    return ( 
       <div>
           <h3>Próximos Recordatorios</h3>
      <table className="table" id="upcomingReminders">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Creador</th>
            <th>Mensaje</th>
          </tr>
        </thead>
        <tbody>
        {nextProjectReminders.length === 0 ? 
            <div>
                <p>No hay recordatorios para futuras fechas</p>
            </div>
            :
            nextProjectReminders.map((cc: projectRemindersType) => ( 
              <> 
                <td>{formateDate(cc.date)}</td>
                <td>{cc.userData.name}</td>
                <td>{cc.reminderData}</td>
              </>
            ))
          }
        </tbody>
      </table>
       </div>
    )
}

export default ProjectTableNextReminders