import { useEffect, useState } from "react"
import ServicesTable from "./ServicesTable"
import ExpirationsTable from "./ExpirationsTable"
import "./styles.css"
import AddNewService from "./AddNewService"
import AddNewAlert from "./AddNewAlert"
import apiBackendUrl from "../../lib/axiosData"
import { userStore } from "../../store/UserAccount"
import handleError from "../../utils/axiosErrorHanlder"
import { UnifiedProjectType, ServiceWithProjectType } from "../../types/Services"
import SpinnerComponent from "../Spinner/Spinner"

const MainServices =  () => { 
 
  const [menu, setMenu] = useState<string>("services")
  const {user} = userStore()
  const [servicesData, setServicesData] = useState<ServiceWithProjectType[] | []>([])
  const [load, setLoad] = useState<boolean>(false)

    const getUserServices = async () => {
      setLoad(true) 
        try {
          const {data, status} = await apiBackendUrl.get(`/service/servicesWorking/${user?.id}`)
          if(status === 200) { 
            setLoad(false) 
            const createObject : ServiceWithProjectType[] = data.flatMap((project: UnifiedProjectType) => {
              return project.projectData.services.map((service) => {
                return {
                  projectId: project.projectData.id,
                  projectName: project.projectData.name,
                  serviceId: service.serviceId,
                  serviceName: service.service.name,
                  startDate: service.startDate,
                  endDate: service.endDate,
                  amount: service.amount,
                  clientName: project.projectData.clientData.name,
                  projectServiceId: service.id                 
                };
              });
            });
      
            console.log("createObject", createObject); 
            setServicesData(createObject)
      
        }
        } catch (error) {
          handleError(error, setLoad)
        }
    }

    useEffect(() => { 
      getUserServices()
    }, [])



  return ( 
    <div>
    <header className="custom-header">
      <div className="header-container">
        <div className="secondHeader">
           <button className="btn-configure-alert" onClick={() => setMenu("services")}>Añadir Nuevo Servicio</button>
           <button className="btn-configure-alert" onClick={() => setMenu("services")}>Ver Servicios</button>
           <button className="btn-configure-alert" onClick={() => setMenu("expirations")}>Ver Próximos Vencimientos</button>
           <AddNewService/>
           <AddNewAlert/>
        </div>
       
      </div>
    </header>

    {!load ? 
    <>
      <div className="search-bar">
        <input type="text" placeholder="Buscar servicios..." />
      </div>

      <div className="sections-container">

        {menu === "services" ? 
          <div className="table-section" id="expirationsTable">
              <h2>Servicios</h2>
              <div id="expirationsTableContent">
                  <ServicesTable servicesData={servicesData} updateTable={getUserServices}/>
              </div>
          </div> : null
        }

        {menu === "expirations" ? 
          <div className="table-section" id="expirationsTable">
              <h2>Próximos Vencimientos</h2>
              <div id="expirationsTableContent">
                  <ExpirationsTable/>
              </div>
          </div> : null
        }

      </div>
     </> :
     <div className="flex items-center justify-center mt-36">
       <SpinnerComponent/>
     </div>  }

  </div>
  )
}

export default MainServices