import apiBackendUrl from "../../lib/axiosData"
import "./styles/clientModule.css"
import { useEffect, useState } from "react"
import { shootErrorToast, shootSuccesToast } from "../../utils/succesToastFunction"
import handleError from "../../utils/axiosErrorHanlder"
import { UserTypeData } from "../../types/User"
import { usersDataProjectType } from "../../types/User"
import { userStore } from "../../store/UserAccount"
import SpinnerComponent from "../Spinner/Spinner"

interface Props { 
    clientId: number | undefined,
    updateTable: () => void,
    closeModal: () => void
}

const QuestionAfterCreationClient = ({clientId, updateTable, closeModal}: Props) => { 

    const {user} = userStore()
    const [availableUsers, setAvailableUsers] = useState<UserTypeData[] | []>([])
    const [load, setLoad] = useState<boolean>(false)
    const [filteredUserNames, setFilteredUserNames] = useState<UserTypeData[] | []>([])
    const [usersNames, setUsersNames] = useState<usersDataProjectType[] | []>([])

    const getEveryUsers = async () => { 
        try {
            const {data, status} = await apiBackendUrl.get("/user/everyUsersData")
            if(status === 200) { 
                console.log("Users", data)
                const filterUserAccountId = data.filter((us : UserTypeData) => us.id !== user?.id)
                setAvailableUsers(filterUserAccountId) 
            }
        } catch (error) {
            shootErrorToast("Ocurrio un error al querer obtener los usuarios del sistema")
        }
    }

    useEffect(() => { 
        getEveryUsers()
    }, [])
 
    const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const name = e.target.value.toLowerCase();
        if(name.length === 0) { 
            setFilteredUserNames([]);
        } else { 
            const filteredUsers = availableUsers.filter(user => 
                user.name.toLowerCase().includes(name) 
            );
            console.log(filteredUsers);
            setFilteredUserNames(filteredUsers);
        }
    };
    
    const chooseUser= (id: number, name: string) => { 
         const userExist = usersNames.some((us) => us.id === id)
         if(userExist) { 
            setFilteredUserNames([])
            return shootErrorToast("El usuario ya forma parte del projecto")
         }
         const users : usersDataProjectType = ({
             name: name,
             id: id
         })
         setUsersNames((prevState) => [...prevState, users])
         setFilteredUserNames([]);
    
    }

    const removeUser= (id: number) => { 
        const filtered = usersNames.filter((us) => us.id !== id)
        console.log(filtered)
        setUsersNames(filtered)
    }

    const createClientAcces = async () => {
        setLoad(true)
        const newAccesData = ({ 
            usersData: usersNames
        }) 
        try {
            const {data, status} = await apiBackendUrl.post(`/user/newUserClientAccess/${clientId}`, newAccesData)
            if(status === 200) { 
                console.log(data)
                updateTable()
                setLoad(false)
                shootSuccesToast(data)
                closeModal()
            }
        } catch (error) {
            handleError(error, setLoad)
        }
    }

    const cancelOperation = () => { 
        closeModal()
        updateTable()
    }


    

    return ( 
        <div>
            <h3 className="text-blue-800 font-medium text-lg">¿Deseas dar acceso a otro usuario?</h3>
            <div className="modal">
                    <form id="client-form">
                        <input type="text" onChange={handleSearchUser}/>          
                        {filteredUserNames.length === 0 && usersNames.length === 0 ? <button className="btn-cancel-btn" onClick={() => closeModal()}>Cancelar</button> : null}                

                        {filteredUserNames.length > 0 ?
                            <div className="flex flex-col mt-2 bg-gray-100 rounded-sm shadow-xl">
                                {filteredUserNames.map((us: UserTypeData) => (  
                                    <p key={us.id} className="cursor-pointer bg-gray-200" onClick={() => chooseUser(us.id, us.name)}>{us.name}</p>
                                ))}
                            </div> : null}

                        {usersNames.length > 0 ? 
                            usersNames.map((us : usersDataProjectType) => ( 
                            <div className="flex w-full items-center justify-between max-h-[25px] overflow-y-auto mt-1 bg-gray-100">
                                <p>{us.name}</p>
                                <p onClick={() => removeUser(us.id)} className="cursor-pointer text-sm mr-2">X</p>
                            </div>
                        ))
                        : null}

                        {usersNames.length > 0 ?                  
                            <div className="flex w-full mt-5 gap-6 items-center justify-center">
                                <button onClick={() => createClientAcces()}>Dar Acceso</button>
                                <button onClick={() => cancelOperation()} >Cancelar</button>
                            </div>              
                        : null}
                   </form>  

                  {!load ? null : <div className="p-4"> <SpinnerComponent/> </div>}

              
            </div>
        </div>
    )
}

export default QuestionAfterCreationClient