import { useState } from "react"
import "../proyectMain.css"
import { userPersonalProjectsType } from "../../../types/User"
import { formateDate } from "../../../utils/transformDate"

interface Props { 
    projects: userPersonalProjectsType[] | []
}

const MainProjectTableData = ({projects}: Props) => { 


    const [allProjects, setAllProjects] = useState<userPersonalProjectsType[] | []>(projects)

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

   return ( 
      <div>
        <div className="search-bar">
            <input type="text" placeholder="Buscar proyectos..." onChange={handleChangeTableData}/>
        </div>

         <table className="projects-table">
           {projects.length > 0 ? 
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
                        <td>Ver usuarios con acceso</td>
                        {project.projectData.services.map((ser) => ( 
                            <td>{ser.service.name}</td>
                        ))}
                        <td>{formateDate(project.projectData.startDate)}</td>
                        <td>{project.projectData.description}</td>
                        <td>
                            <button className="btn-action edit"><i className="fas fa-pencil-alt"></i></button>
                            <button className="btn-action delete"><i className="fas fa-trash-alt"></i></button>
                            <button className="btn-action details"><i className="fas fa-eye"></i></button>
                        </td>
                        </tr>
                    ))}
                   
             
            </tbody>
            </> : <p>No hay</p>}
        </table>
     </div>
   )
}

export default MainProjectTableData