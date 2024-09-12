import { useState } from "react"
import ServicesTable from "./ServicesTable"
import ExpirationsTable from "./ExpirationsTable"
import "./styles.css"
import AddNewService from "./AddNewService"
import AddNewAlert from "./AddNewAlert"

const MainServices =  () => { 
 
  const [menu, setMenu] = useState<string>("services")

  



  return ( 
    <div>
    <header className="custom-header">
      <div className="header-container">
        <div className="secondHeader">
           <button className="btn-configure-alert" onClick={() => setMenu("services")}>Ver Servicios</button>
           <button className="btn-configure-alert" onClick={() => setMenu("expirations")}>Ver Próximos Vencimientos</button>
        </div>
        <div className="secondHeader">
            <AddNewService/>
            <AddNewAlert/>
        </div>
      </div>
    </header>

    <div className="search-bar">
      <input type="text" placeholder="Buscar servicios..." />
    </div>

    <div className="sections-container">

      {menu === "services" ? 
        <div className="table-section" id="expirationsTable">
            <h2>Servicios</h2>
            <div id="expirationsTableContent">
                <ServicesTable/>
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
  </div>
  )
}

export default MainServices