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
  projectId: number
}

const ProjectRemindersDetail = ({ currentDateReminders, nextProjectReminders, updateReminders, projectId}: Props) => { 

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

           <ProjectTableCurrentDateReminders currentDateReminders={currentDateReminders} projectId={projectId} updateReminders={updateReminders}/>

           <ProjectTableNextReminders nextProjectReminders={nextProjectReminders} projectId={projectId} updateReminders={updateReminders}/> 
    </div>
    )
}

export default ProjectRemindersDetail

