import { useState } from 'react';
import { projectRemindersType } from '../../types/Projects';
import "./proyectDetail.css"
import CreateNewProjectReminder from './CreateNewProjectReminder';
import ProjectTableCurrentDateReminders from './ProjectTableCurrentDateReminders';
import ProjectTableNextReminders from './ProjectTableNextReminders';

interface Props { 
  everyProjectsReminders: projectRemindersType | undefined,
  currentDateReminders: projectRemindersType[] | [],
  nextProjectReminders: projectRemindersType[] | [],
  updateReminders: () => void,
  projectId: string | undefined
}

const ProjectRemindersDetail = ({everyProjectsReminders, currentDateReminders, nextProjectReminders, updateReminders, projectId}: Props) => { 

    const [isFormVisible, setIsFormVisible] = useState(false);

    const showCreateReminderForm = () => {
      setIsFormVisible(true);
    };
  
    const hideCreateReminderForm = () => {
      setIsFormVisible(false);
    };
  
 

    return ( 
        <div>
          <h2>Recordatorios</h2>
          <button className="btn" onClick={showCreateReminderForm}> Crear Nuevo Recordatorio </button>

          {isFormVisible && (
            <CreateNewProjectReminder hideForm={hideCreateReminderForm} projectId={projectId} updateReminders={updateReminders}/>
          )}

          <ProjectTableCurrentDateReminders currentDateReminders={currentDateReminders}/>

          <ProjectTableNextReminders nextProjectReminders={nextProjectReminders}/> 
    </div>
    )
}

export default ProjectRemindersDetail

