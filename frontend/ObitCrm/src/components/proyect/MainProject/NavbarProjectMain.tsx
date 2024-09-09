import "../proyectMain.css"
import AddNewProject from "./AddNewProject"

const NavbarProjectMain =  () => { 
   return ( 
        <div className="custom-header">
            <div className="header-container">
               <AddNewProject/>
            </div>
        </div>
   )
}

export default NavbarProjectMain