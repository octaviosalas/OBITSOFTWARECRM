import AddNewFollowUp from "./AddNewFollowUp"
import FollowsUpTable from "./FollowsUpTable"
import SendEmail from "./SendEmail"
import "./styles.css"

const MainfollowsUp = () => { 
    return ( 
        <div>
            <div className="custom-header">
                <div className="header-container">
                <div id="modals-container">
                        <AddNewFollowUp/>
                        <SendEmail/>
                </div>
                </div>
            </div>
    
        <div className="search-bar">
            <input type="text" placeholder="Buscar seguimientos..." />
        </div>
    
        <div id="table-container">
            <FollowsUpTable/>
        </div>


            </div>
    )
}

export default MainfollowsUp