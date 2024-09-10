import { useState } from "react"
import "../proyectMain.css"
import { userPersonalProjectsType } from "../../../types/User"
import { formateDate } from "../../../utils/transformDate"
import UsersWithAccesProjectTable from "./UsersWithAccesProjectTable"
import { useNavigate } from "react-router-dom"
import EditProjectData from "./EditProjectData"

interface Props { 
    projects: userPersonalProjectsType[] | []
}

const MainProjectTableData = ({projects}: Props) => { 


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
                         <tr>
                        <td>{project.projectData.clientData.name}</td>
                        <td>{project.projectData.name}</td>
                        <td><UsersWithAccesProjectTable projectId={project.projectData.id}/></td>
                        {project.projectData.services.map((ser) => ( 
                            <td>{ser.service.name}</td>
                        ))}
                        <td>{formateDate(project.projectData.startDate)}</td>
                        <td>{project.projectData.description}</td>
                        <td>
                            <EditProjectData projectData={project.projectData}/>
                            <button className="btn-action delete"><i className="fas fa-trash-alt"></i></button>
                            <button className="btn-action details" onClick={() => redirectToProjectDetail(project.projectData.id)}><i className="fas fa-eye"></i></button>
                        </td>
                        </tr>
                    ))}
                   
             
            </tbody>
            </> 
          </table>
        </div> : 
        <div className="flex items-center justify-center mt-36">
            <p className="font-medium">No se encontraron proyectos a los cuales tengas acceso</p>
        </div> 
        }
     </div>
   )
}

export default MainProjectTableData