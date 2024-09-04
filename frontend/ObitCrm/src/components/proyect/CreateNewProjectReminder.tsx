import "./proyectDetail.css"
import { userStore } from "../../store/UserAccount"
import { useState } from "react"
import apiBackendUrl from "../../lib/axiosData"
import handleError from "../../utils/axiosErrorHanlder"
import { newReminderData } from "../../types/Projects"
import { shootSuccesToast, shootSuccesWithOutLoginFunction } from "../../utils/succesToastFunction"
import SpinnerComponent from "../Spinner/Spinner"


interface Props { 
    hideForm: () => void,
    projectId: string | undefined,
    updateReminders: () => void,

}

const CreateNewProjectReminder = ({hideForm, projectId, updateReminders}: Props) => { 

    const {user} = userStore()
    const [date, setDate] = useState<string>("")
    const [reminderData, setReminderData] = useState<string>("")
    const [load, setLoad] = useState<boolean>(false)


    const handleChangeReminderData = (e: React.ChangeEvent<HTMLTextAreaElement>) => { 
        setReminderData(e.target.value)
    }

    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => { 
        console.log(e.target.value)
        setDate(e.target.value)
    }

    const createReminder = async () => { 
        if(user === null) { 
           return shootSuccesWithOutLoginFunction("Debes iniciar sesion para crear un recordatorio")
        }
        const remindetData : newReminderData = ({ 
            date,
            reminderData
        })
        setLoad(true)
        console.log(remindetData)
        try {
            const {data, status} = await apiBackendUrl.post(`/project/createProjectReminder/${projectId}/${user?.id}`, remindetData)
            console.log(data, status)
            if(status === 200) { 
                shootSuccesToast(data)
                setLoad(false)
                updateReminders()
            }
        } catch (error) {
            handleError(error, setLoad)
        }
    }

   return ( 
    <> 
    <div id="createReminderForm" className="form-container">
      <h3>Crear Recordatorio</h3>
            <div className="form-group">
                <label htmlFor="reminderDate">Fecha:</label>
                <input type="date" id="reminderDate" onChange={handleChangeDate}/>
            </div>
            <div className="form-group">
                <label htmlFor="reminderMessage">Mensaje:</label>
                <textarea id="reminderMessage" rows={4} onChange={handleChangeReminderData}></textarea>
            </div>
           
               {!load ? 
                <div className="flex gap-6">
                    <button className="btn" onClick={() => createReminder()}> Guardar Recordatorio </button>
                    <button className="btn btn-danger" onClick={() => hideForm()}> Cancelar </button>
                </div> : 
                 <SpinnerComponent/>
                }
           
  </div>
  </>
   )
}

export default CreateNewProjectReminder