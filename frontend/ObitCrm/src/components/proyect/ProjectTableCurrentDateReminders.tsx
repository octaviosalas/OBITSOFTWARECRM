import "./proyectDetail.css"
import { projectRemindersType } from "../../types/Projects"
import { formateDate } from "../../utils/transformDate"

interface Props { 
    currentDateReminders: projectRemindersType[] | []
}

const ProjectTableCurrentDateReminders = ({currentDateReminders} : Props) => { 
    return ( 
       <div>
           <h3>Recordatorios del Día</h3>
           <table className="table" id="dailyReminders">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Creador</th>
                        <th>Mensaje</th>
                    </tr>
                </thead>
            <tbody>
                {currentDateReminders.length === 0 ? 
                    <div className='w-full  flex items-center justify-center mt-4'>
                        <p>No hay recordatorios para la fecha actual</p>
                    </div>
                    :
                    currentDateReminders.map((cc: projectRemindersType) => ( 
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

export default ProjectTableCurrentDateReminders