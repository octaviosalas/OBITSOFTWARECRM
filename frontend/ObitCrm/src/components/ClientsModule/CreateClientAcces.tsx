import { useState } from "react"
import apiBackendUrl from "../../lib/axiosData"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Avatar} from "@nextui-org/react";
import "./styles/clientModule.css"
import { UserTypeData } from "../../types/User";
import handleError from "../../utils/axiosErrorHanlder";
import userIcon from "../../images/user.png"
import {userWithAccesType} from "../../types/User"
import SpinnerComponent from "../Spinner/Spinner";
import { getEveryUsers } from "../../utils/everyUsersData";
import CreatingNewClientAcces from "./CreatingNewClientAcces";
import { userStore } from "../../store/UserAccount";
import UsersList from "../reusableComponents/UsersList";

interface Props { 
    clientId: number,
    resetTable: () => void,
    clientName: string
}

const CreateClientAcces = ({clientId, resetTable, clientName} : Props) => { 

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [usersData, setUsersData] = useState<userWithAccesType[] | []>([])
    const [load, setLoad] = useState<boolean>(false)
    const [everyUsers, setEveryUsers] = useState<UserTypeData[] | []>([])
    const [creatingStep, setCreatingStep] = useState<boolean>(false)
    const {user} = userStore()

    const handleOpen = async () => { 
        onOpen()
        setLoad(true)
        const usersData = await getEveryUsers()
        const filteredUsersData = usersData.filter((us: UserTypeData) => us.id !== user?.id)
        console.log(filteredUsersData)
        setEveryUsers(filteredUsersData)
        try {
            const {data, status} = await apiBackendUrl.get(`/client/userWithClientAcces/${clientId}`)
            if(status === 200) { 
                console.log(data)
                setUsersData(data)
                setLoad(false)
                const justUserData = data.map((data: any) => { 
                    return { 
                        userData: data.userData
                    }
                })
                console.log(justUserData)
            }
        } catch (error) {
            handleError(error, setLoad)
        }
    }

    const handleCloseModalAndRestTableData = () => { 
        resetTable()
        onClose()
    }


    return ( 
        <div>
         <button className="btn-btn" onClick={handleOpen}>Crear Acceso</button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1 text-md">Usuarios con acceso al cliente: {clientName}</ModalHeader>
                    <ModalBody>
                       <div>
                            {!load && usersData.length > 0 ? ( 
                                <UsersList usersData={usersData}/>
                               ) : load ? ( 
                                <SpinnerComponent/>
                               ) : (
                                <p>Ningun usuario tiene acceso a este cliente</p> 
                              )
                            }
                       </div>
                       <div>

                       </div>
                    </ModalBody>
                        <ModalFooter className="flex items-center justify-center">
                        {!creatingStep ? 
                          <button className="w-auto h-12 rounded-lg bg-blue-500 text-white p-1" onClick={() => setCreatingStep(true)}>
                            Generar nuevo acceso
                          </button> : 
                          <CreatingNewClientAcces users={everyUsers} clientId={clientId} actualUsersWithAcces={usersData} close={handleCloseModalAndRestTableData}/>
                        }
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default CreateClientAcces;