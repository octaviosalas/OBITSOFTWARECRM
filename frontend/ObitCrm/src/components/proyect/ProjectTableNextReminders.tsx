import "./proyectDetail.css"
import { projectRemindersType } from "../../types/Projects"
import { formateDate } from "../../utils/transformDate"
import { userStore } from "../../store/UserAccount"
import DeleteProjectReminder from "./MainProject/DeleteProjectReminder"
import { useState } from "react"
import apiBackendUrl from "../../lib/axiosData"
import { shootSuccesToast } from "../../utils/succesToastFunction"
import handleError from "../../utils/axiosErrorHanlder"
import { newReminderData } from "../../types/Projects"
import SpinnerComponent from "../Spinner/Spinner"

interface Props { 
    nextProjectReminders: projectRemindersType[] | [],
    projectId: number,
    updateReminders: (ejecuteLoad: boolean) => void,
    title: string
}

const ProjectTableReminders = ({nextProjectReminders, projectId, updateReminders, title} : Props) => { 

      const {user} = userStore()
      const [editReminderId, setEditReminderId] = useState<number | null>(null);
      const [message, setMessage] = useState<string>("")
      const [newDate, setNewDate] = useState<string>("")
      const [load, setLoad] = useState<boolean>(false)


      const handleChangeReminderMessage = (e: React.ChangeEvent<HTMLInputElement>) => { 
          const message = e.target.value
          setMessage(message)
      }

      const handleChangeReminderDate = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const date = e.target.value
        setNewDate(date)
      }  

      const changeTableToBeEdited = (id: number) => {
        if(id === editReminderId) { 
            setEditReminderId(null)
        } else { 
            setEditReminderId(id)
        }
      }

      const updateReminderData = async () => { 
        const reminderNewData : newReminderData = ({ 
          date: newDate,
          reminderData: message
      })
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.put(`/project/updateProjectReminder/${editReminderId}/${projectId}/${user?.id}`, reminderNewData)
            if(status === 200) { 
                console.log("updateReminderData STATUS - ProjectTableNextReminders", status)
                updateReminders(false)
                shootSuccesToast(data)
                setLoad(false)
            }
        } catch (error) {
            handleError(error, setLoad)
        }
      }  

    return ( 
        <div className="mt-6">
            <h2>{title}</h2>
                <table className="table" id="upcomingReminders">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Usuario</th>
                      <th>Mensaje</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                  {nextProjectReminders.length === 0 ? 
            <div>
              <p>No hay recordatorios para futuras fechas</p>
            </div>
            :
            nextProjectReminders.map((cc: projectRemindersType) => ( 
              <tr key={cc.id}> 
              
                {editReminderId === cc.id ? 
                                            <td>
                                              <input  type="date" className="border w-full"  value={newDate}  onChange={handleChangeReminderDate} />
                                            </td> 
                                          : 
                                          <td>{formateDate(cc.date)}</td>
                                          }
                <td>{cc.userData.name}</td>

                  {editReminderId === cc.id ? 
                    <td>
                      <input 
                        type="text" 
                        className="border w-full" 
                        value={message} 
                        onChange={handleChangeReminderMessage}
                      />
                    </td> 
                    : 
                    <td>{cc.reminderData}</td>
                  }

                    {cc.userData.id === user?.id ? (
                      <td>
                        <button 
                          className="btn-action edit" 
                          onClick={() => {
                            changeTableToBeEdited(cc.id);  
                            setMessage(cc.reminderData);  
                          }}>
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                      </td>
                    ) : <td> - </td>}

                  {cc.userData.id === user?.id ? (
                        <td>
                          <DeleteProjectReminder 
                            reminderId={cc.id} 
                            projectId={projectId} 
                            updateReminders={updateReminders}
                          />
                      </td>
                      ) :  <td> - </td>}
                    </tr>
                  ))
                }
                  </tbody>
                </table>

                {editReminderId !== null && !load? 
                    <div className="flex items-center gap-2 w-full h-12">
                        <button className="confirm-button" onClick={() => updateReminderData()}>Actualizar</button>
                        <button className="cancel-button" onClick={() => changeTableToBeEdited(editReminderId)}>Cancelar</button>
                    </div>
                : load ? ( 
                  <SpinnerComponent/> 
                ) 
                : null}
        </div>
    )
}

export default ProjectTableReminders