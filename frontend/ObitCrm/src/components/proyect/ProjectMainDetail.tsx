import { useEffect, useState } from 'react';
import "./proyectDetail.css"
import ProjectInfoDetail from './ProjectInfoDetail';
import ProjectRemindersDetail from './ProjectRemindersDetail';
import ProjectMessagesDetail from './ProjectMessagesDetail';
import apiBackendUrl from '../../lib/axiosData';
import { useParams } from 'react-router-dom';
import { userStore } from '../../store/UserAccount';
import handleError from '../../utils/axiosErrorHanlder';
import SpinnerComponent from '../Spinner/Spinner';
import { projectDataType, userAccesProjectType, projectRemindersType, projectMessagesType } from '../../types/Projects';
import { useNavigate } from 'react-router-dom';
import { getCurrentDateWithoutTime } from '../../utils/actualDate';
import { shootSuccesWithOutLoginFunction } from '../../utils/succesToastFunction';
import { serviceUserProjectType } from '../../types/Services';

const ProjectMainDetail = () => { 

    const [activeSection, setActiveSection] = useState('info');
    const [load, setLoad] = useState<boolean>(false);
    const [projectInformation, setProjectInformation] = useState<projectDataType>();
    const [projectServices, setProjectServices] = useState<serviceUserProjectType[] | []>([]);
    const [usersWithAcces, setUserWithAcces] = useState<userAccesProjectType[] | []>([]);
    const [projectsReminders, setProjectsReminders] = useState<projectRemindersType[] | []>([]);
    const [actualDateProjectsReminders, setActualDateProjectsReminders] = useState<projectRemindersType[] | []>([]);
    const [nextProjectsReminders, setNextProjectsReminders] = useState<projectRemindersType[] | []>([]);
    const [projectsMessages, setProjectsMessages] = useState<projectMessagesType[] | []>([]);

    const {projectId} = useParams()
    const navigate = useNavigate()
    const {user} = userStore()


    const getProjectData = async (ejecuteLoad: boolean) => {
      if(user === null) { 
        navigate(`/`)
        return shootSuccesWithOutLoginFunction("Debes iniciar sesion para poder utilizar el CRM")
      } 
      const actualDate = getCurrentDateWithoutTime()
      if(ejecuteLoad) { 
        setLoad(true)
      } else { 
        console.log("ejecuteload es false")
      }
      try {
         const {data, status} = await apiBackendUrl.get(`/project/projectData/${projectId}/${user?.id}`) 
         console.log(status, data)
         if(status === 200) { 
          setLoad(false)
          setProjectInformation(data.projectData)
          console.log("data.porjectData", data.projectData)
          setProjectServices(data.serviceData)
          setUserWithAcces(data.userWithAcces)
          setProjectsReminders(data.reminders)
          setProjectsMessages(data.messages)

          const currentDateReminders = data.reminders.filter((reminder: projectRemindersType) => { 
            const reminderDate = reminder.date.split('T')[0]; 
            return reminderDate === actualDate; 
          })
         
          const upcomingReminders = data.reminders.filter((reminder: projectRemindersType) => { 
            const reminderDate = reminder.date.split('T')[0]; 
            return reminderDate > actualDate; 
          })

          setActualDateProjectsReminders(currentDateReminders)
          setNextProjectsReminders(upcomingReminders)

         } 
      } catch (error) {
         navigate("/")
         handleError(error, setLoad)
      }
    }

    useEffect(() => { 
      getProjectData(true)
    }, [])

    const showSection = (item: string) => { 
      setActiveSection(item)
    }

    return (
      <> 
      {load ? 
        <div className='mt-36'> 
           <SpinnerComponent/>
        </div> : 
        <div>
        <div className="header">
          <h1>Detalle del Proyecto</h1>
        </div>
  
        <div className="navbar-projectDetail">
          <div className={`navbar-item-projectDetail ${activeSection === 'info' ? 'active' : ''}`} onClick={() => showSection('info')}>
            Información
          </div>
          <div className={`navbar-item-projectDetail ${activeSection === 'reminders' ? 'active' : ''}`} onClick={() => showSection('reminders')}>
            Recordatorios
          </div>
          <div className={`navbar-item-projectDetail ${activeSection === 'messages' ? 'active' : ''}`} onClick={() => showSection('messages')}>
            Mensajería
          </div>
         
        </div>
  
        <div className="container">
          
          {activeSection === "info" ? 
           <div className="section" id="info">
             <ProjectInfoDetail 
              projectInformation={projectInformation} 
              projectServices={projectServices}
              usersWithAcces={usersWithAcces}
              getProjectData={getProjectData}
              />
           </div> : null
          }

         {activeSection === "reminders" ? 
           <div className="section"  id="reminders">
             <ProjectRemindersDetail 
                everyProjectsReminders={projectsReminders} 
                currentDateReminders={actualDateProjectsReminders} 
                nextProjectReminders={nextProjectsReminders}
                projectId={Number(projectId)}
                updateReminders={getProjectData}
              />
           </div> : null
          }


         {activeSection === "messages" ? 
           <div className="section"  id="messages">
               <ProjectMessagesDetail 
                projectInformation={projectInformation}
                projectsMessages={projectsMessages}
                projectId={projectId}
                updateMessages={getProjectData}
               />
           </div> : null
          }
  

        </div>
        </div>
      }
      
      </> 
    )
}

export default ProjectMainDetail