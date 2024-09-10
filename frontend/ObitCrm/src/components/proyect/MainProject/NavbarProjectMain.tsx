import "../proyectMain.css"
import AddNewProject from "./AddNewProject"

interface Props { 
   updateTable: () => void
}

const NavbarProjectMain =  ({updateTable}: Props) => { 
   return ( 
        <div className="custom-header">
            <div className="header-container">
               <AddNewProject updateTable={updateTable}/>
            </div>
        </div>
   )
}

export default NavbarProjectMain