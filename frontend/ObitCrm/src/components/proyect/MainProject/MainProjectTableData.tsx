import { useState } from "react"
import "../proyectMain.css"
import { userPersonalProjectsType } from "../../../types/User"
import { formateDate } from "../../../utils/transformDate"
import UsersWithAccesProjectTable from "./UsersWithAccesProjectTable"
import { useNavigate } from "react-router-dom"
import EditProjectData from "./EditProjectData"
import DeleteProject from "./DeleteProject"
import WithOutAcces from "../../reusableComponents/withOutAcces"

interface Props { 
    projects: userPersonalProjectsType[] | [],
    updateTable: () => void
}

const MainProjectTableData = ({projects, updateTable}: Props) => { 


    const [allProjects, setAllProjects] = useState<userPersonalProjectsType[] | []>(projects)
    const navigate = useNavigate()

    const handleChangeTableData =  (e: React.ChangeEvent<HTMLInputElement>) => { 
        const item = e.target.value.toLowerCase();
        const searched = projects.filter(project => 
            Object.values(project.projectData.clientData).some(value =>
                value.toString().toLowerCase().includes(item)
            )
        )
        setAllProjects(searched)
        if(item === "") { 
            setAllProjects(projects)
        }
    }

    const redirectToProjectDetail = (projectId: number) => { 
        navigate(`/projectDetail/${projectId}`)
    }

   return ( 
      <div>
     {projects.length > 0 ? 
       <div>
        <div className="search-bar">
            <input type="text" placeholder="Buscar proyectos..." onChange={handleChangeTableData}/>
        </div>

           <table className="projects-table">
         
           <> 
           <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Nombre Proyecto</th>
                    <th>Participantes</th>
                    <th>Servicios</th>
                    <th>Fecha de Inicio</th>
                    <th>Descripcion</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
       
                    {allProjects.map((project : userPersonalProjectsType) => ( 
                        <tr key={project.projectData.id}>
                        <td>{project.projectData.clientData.name}</td>
                        <td>{project.projectData.name}</td>
                        <td><UsersWithAccesProjectTable projectId={project.projectData.id}/></td>
                            <td>{project.projectData.services.map((ser) => ser.service.name).join(', ')}</td>
                        <td>{formateDate(project.projectData.startDate)}</td>
                           <td>
                            {project.projectData.description.length > 50 
                                ? `${project.projectData.description.substring(0, 50)}...` 
                                : project.projectData.description}
                            </td>          
                            <td>
                            <EditProjectData projectData={project.projectData} updateTable={updateTable}/>
                            <DeleteProject projectId={project.projectData.id} updateTable={updateTable}/>
                            <button className="btn-action details" onClick={() => redirectToProjectDetail(project.projectData.id)}><i className="fas fa-eye" style={{color:"blue"}}></i></button>
                        </td>
                        </tr>
                    ))}
                   
             
            </tbody>
            </> 
          </table>
        </div> : 
          <WithOutAcces typeData="proyectos"/>
        }
     </div>
   )
}

export default MainProjectTableData


