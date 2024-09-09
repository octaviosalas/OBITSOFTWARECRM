import apiBackendUrl from "../../../lib/axiosData"
import { useEffect, useState } from "react"
import "../proyectMain.css"
import NavbarProjectMain from "./NavbarProjectMain"
import MainProjectTableData from "./MainProjectTableData"
import { userStore } from "../../../store/UserAccount"
import handleError from "../../../utils/axiosErrorHanlder"
import { shootSuccesWithOutLoginFunction } from "../../../utils/succesToastFunction"
import { userPersonalProjectsType } from "../../../types/User"

const ProjectMain =  () => { 

   const {user} = userStore()
   const [laod, setLoad] = useState<boolean>(false)
   const [projects, setProjects] = useState<userPersonalProjectsType[] | []>([]) 

  const getUserProjectsAvailables = async () => { 
   if(user === null) { 
      return shootSuccesWithOutLoginFunction("Debes iniciar sesion para obtener los proyectos")
   }
   setLoad(true)
   try {
      const {data, status} = await apiBackendUrl.get(`/user/userAccesProjects/${user?.id}`)
      console.log(status)
      if(status === 200) { 
         console.log(data)
         setProjects(data)
         setLoad(false)
      }
   } catch (error) {
      handleError(error, setLoad)
   }
  }

  useEffect(() => { 
   getUserProjectsAvailables()
  }, [])

   return ( 
    <div>
       <NavbarProjectMain/>
       <MainProjectTableData projects={projects}/>
    </div>
   )
}

export default ProjectMain