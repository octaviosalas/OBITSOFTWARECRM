import apiBackendUrl from "../../../lib/axiosData"
import { useEffect, useState } from "react"
import "../proyectMain.css"
import NavbarProjectMain from "./NavbarProjectMain"
import MainProjectTableData from "./MainProjectTableData"
import { userStore } from "../../../store/UserAccount"
import handleError from "../../../utils/axiosErrorHanlder"
import { shootSuccesWithOutLoginFunction } from "../../../utils/succesToastFunction"
import { userPersonalProjectsType } from "../../../types/User"
import SpinnerComponent from "../../Spinner/Spinner"

const ProjectMain =  () => { 

   const {user} = userStore()
   const [load, setLoad] = useState<boolean>(false)
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
      {!load ? 
        <MainProjectTableData projects={projects}/> : 
        <div className="flex items-center justify-center mt-36"> 
        <SpinnerComponent/>
       </div>}
    </div>
   )
}

export default ProjectMain