import AddNewFollowUp from "./AddNewFollowUp"
import FollowsUpTable from "./FollowsUpTable"
import SendEmail from "./SendEmail"
import "./styles.css"
import { userStore } from "../../store/UserAccount"
import apiBackendUrl from "../../lib/axiosData"
import { useEffect, useState } from "react"
import { userFollowsUpType } from "../../types/FollowsUp"
import handleError from "../../utils/axiosErrorHanlder"

const MainfollowsUp = () => { 
    
    const {user} = userStore()
    const [userFollowsUpData, setUserFollowsUpData] = useState<userFollowsUpType[] | []>([])
    const [load, setLoad] = useState<boolean>(false)

    const getUserFollowsUp = async () => { 
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.get(`/client/myHistoricFollowsUp/1`)
            if(status === 200) { 
                console.log(data)
                setUserFollowsUpData(data)
                setLoad(false)
            }
        } catch (error) {
            handleError(error, setLoad)
        }
    }

    useEffect(() => { 
      getUserFollowsUp()
    }, [])

    return ( 
        <div>
            <div className="custom-header">
                <div className="header-container">
                <div id="modals-container">
                        <AddNewFollowUp updateTable={getUserFollowsUp}/>
                        <SendEmail/>
                </div>
                </div>
            </div>
    
        <div className="search-bar">
            <input type="text" placeholder="Buscar seguimientos..." />
        </div>
    
        <div id="table-container">
            <FollowsUpTable userFollowsUpData={userFollowsUpData}/>
        </div>


            </div>
    )
}

export default MainfollowsUp