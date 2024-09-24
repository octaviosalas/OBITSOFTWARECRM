import { useState } from 'react';
import { projectRemindersType } from '../../types/Projects';
import "./proyectDetail.css"
import CreateNewProjectReminder from './CreateNewProjectReminder';
import ProjectTableReminders from './ProjectTableNextReminders';

interface Props { 
  everyProjectsReminders: projectRemindersType[] | [],
  currentDateReminders: projectRemindersType[] | [],
  nextProjectReminders: projectRemindersType[] | [],
  updateReminders: (ejecuteLoad: boolean) => void,
  projectId: number
}

const ProjectRemindersDetail = ({ currentDateReminders, nextProjectReminders, updateReminders, projectId, everyProjectsReminders}: Props) => { 

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [showHistoric, setShowHistoric] = useState<boolean>(false)

    const showCreateReminderForm = () => {
      setIsFormVisible(true);
    };
  
    const hideCreateReminderForm = () => {
      setIsFormVisible(false);
    };
  
 

    return ( 
        <div>
          <div className='flex justify-between'>
              <h2>Recordatorios</h2>
              <h4 className='cursor-pointer underline' title='Ver todos los recordatorios del proyecto' onClick={() => setShowHistoric(prevState => !prevState) }>
                {showHistoric ? "Ocultar Historico" : "Ver Historico"}
              </h4>
          </div>
          <button className="btn" onClick={showCreateReminderForm}> Crear Nuevo Recordatorio </button>

          {isFormVisible && (
            <CreateNewProjectReminder hideForm={hideCreateReminderForm} projectId={projectId} updateReminders={updateReminders}/>
          )}

           <ProjectTableReminders title="Recordatorios del dia" nextProjectReminders={currentDateReminders} projectId={projectId} updateReminders={updateReminders}/>

           <ProjectTableReminders title="Proximos recordatorios" nextProjectReminders={nextProjectReminders} projectId={projectId} updateReminders={updateReminders}/> 

           {showHistoric ? <ProjectTableReminders title="Historico de recordatorios" nextProjectReminders={everyProjectsReminders} projectId={projectId} updateReminders={updateReminders}/> : null} 
    </div>
    )
}

export default ProjectRemindersDetail

