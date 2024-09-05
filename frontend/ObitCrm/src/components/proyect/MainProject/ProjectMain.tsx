import apiBackendUrl from "../../../lib/axiosData"
import { useState } from "react"
import "../proyectMain.css"
import NavbarProjectMain from "./NavbarProjectMain"
import MainProjectTableData from "./MainProjectTableData"

const ProjectMain =  () => { 
   return ( 
    <div>
       <NavbarProjectMain/>
       <MainProjectTableData/>
    </div>
   )
}

export default ProjectMain