import { useState, useEffect } from "react"
import { UserTypeData, userWithAccesType } from "../../types/User";
import apiBackendUrl from "../../lib/axiosData";
import { shootErrorToast, shootSuccesToast } from "../../utils/succesToastFunction";
import handleError from "../../utils/axiosErrorHanlder";
import SpinnerComponent from "../Spinner/Spinner";

interface Props { 
    users: UserTypeData[] | [],
    clientId: number,
    close: () => void,
    actualUsersWithAcces: userWithAccesType [] | []
}

const CreatingNewClientAcces = ({users, clientId, actualUsersWithAcces,  close}: Props) => { 

    const [userSelectedId, setUserSelectedId] = useState<number>()
    const [showBtn, setShowBtn] = useState<boolean>(false)
    const [load, setLoad] = useState<boolean>(false)

    const chooseUser = (id: number) => { 
        const userAlreadyHasAcces = actualUsersWithAcces.some((us : userWithAccesType) => us.userData.id === id)
        if(userAlreadyHasAcces) { 
            setShowBtn(false)
            return shootErrorToast("El usuario seleccionado ya tiene acceso al cliente")
        }
        setUserSelectedId(id)
        setShowBtn(true)
    }


   const createAccesNow = async () => { 
    setLoad(true)
    const userId = userSelectedId
    try {
        const {data, status} = await apiBackendUrl.post(`/user/newUserClientAccess/${clientId}/${userId}`)
        if(status === 200) { 
            shootSuccesToast(data)
            console.log(data)
            setLoad(false)
            close()
        }
    } catch (error) {
        handleError(error, setLoad)
    }
   }

    return ( 
        <div className="flex flex-col">
               <div className="form-group">
                <select onChange={(e) => chooseUser(Number(e.target.value))}>
                    {users.map((us : UserTypeData) => ( 
                        <option key={us.id} value={us.id}>{us.name}</option>
                    ))}
                </select>
               </div>
            {showBtn ? <button className="bg-blue-500 text-white font-medium w-auto h-12 rounded-xl mt-4" onClick={() => createAccesNow()}>Dar acceso</button> : null}
            {load ? <SpinnerComponent/> : null}
        </div>
    )
}

export default CreatingNewClientAcces

