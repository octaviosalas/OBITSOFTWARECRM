import AddNewFollowUp from "./AddNewFollowUp"
import FollowsUpTable from "./FollowsUpTable"
import SendEmail from "./SendEmail"
import "./styles.css"
import { userStore } from "../../store/UserAccount"
import apiBackendUrl from "../../lib/axiosData"
import { useEffect, useState } from "react"
import { userFollowsUpType } from "../../types/FollowsUp"
import handleError from "../../utils/axiosErrorHanlder"
import SpinnerComponent from "../Spinner/Spinner"
import TodayCalls from "./TodayCalls"

const MainfollowsUp = () => { 
    
    const {user} = userStore()
    const [userFollowsUpData, setUserFollowsUpData] = useState<userFollowsUpType[] | []>([])
    const [todayRemembers, setTodayRemembers] = useState<userFollowsUpType [] | []>([])
    const [load, setLoad] = useState<boolean>(false)
    const [hasCallsToday, setHasCallsToday] = useState<boolean>(false)


    const getUserFollowsUp = async () => { 
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.get(`/client/myHistoricFollowsUp/${user?.id}`)
            if(status === 200) { 
                console.log(data)
                setUserFollowsUpData(data)
                setLoad(false)
            }
        } catch (error) {
            handleError(error, setLoad)
        }
    }

    const getTodayNoticies = async () => { 
        try {
            const {data, status} = await apiBackendUrl.get(`/user/userComunicationsForToday/${user?.id}`)
            if(status === 200) { 
                console.log(data)
                if(data.length > 0) { 
                    setTodayRemembers(data)
                    setHasCallsToday(true)
                } else { 
                    setTodayRemembers(data)
                    setHasCallsToday(false)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { 
      getUserFollowsUp()
      getTodayNoticies()
    }, [])


    return ( 
        <div>

           {!load ? 
           <>
           <div className="custom-header">
                <div className="header-container">
                    <div id="modals-container">
                            <AddNewFollowUp updateTable={getUserFollowsUp} getTodayNoticies={getTodayNoticies}/>
                            <SendEmail/>
                            {hasCallsToday ? <TodayCalls todayRemembers={todayRemembers}/> : null}
                    </div>
                </div>
            </div>
    
            <div className="search-bar">
                <input type="text" placeholder="Buscar seguimientos..." />
            </div>
        
            <div id="table-container">
                <FollowsUpTable userFollowsUpData={userFollowsUpData} updateTable={getUserFollowsUp}/>
            </div>
           </>  : 
           <div className="mt-36">
             <SpinnerComponent/>
           </div>
           }

        </div>
    )
}

export default MainfollowsUp