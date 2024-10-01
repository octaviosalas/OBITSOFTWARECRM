import { useState, useEffect } from "react"
import apiBackendUrl from "../../lib/axiosData"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Avatar, Spinner} from "@nextui-org/react";
import "./styles/clientModule.css"
import { UserTypeData } from "../../types/User";
import handleError from "../../utils/axiosErrorHanlder";
import userIcon from "../../images/user.png"
import {userWithAccesType} from "../../types/User"
import SpinnerComponent from "../Spinner/Spinner";
import { getEveryUsers } from "../../utils/everyUsersData";

interface Props { 
    clientId: number,
    resetTable: () => void,
    clientName: string
}

const CreateClientAcces = ({clientId, resetTable, clientName} : Props) => { 

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [usersData, setUsersData] = useState<userWithAccesType[] | []>([])
    const [load, setLoad] = useState<boolean>(false)
    const [everyUsers, setEveryUsers] = useState<[]>(getEveryUsers())

    const handleOpen = async () => { 
        onOpen()
        setLoad(true)
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

    


    return ( 
        <div>
         <button className="btn-btn" onClick={handleOpen}>Crear Acceso</button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Usuarios con acceso al cliente: {clientName}</ModalHeader>
                    <ModalBody>
                       <div>
                            {!load && usersData.length > 0 ? ( 
                                usersData.map((us: userWithAccesType) => (
                                 <div key={us.userData.id} className="flex items-center gap-2">
                                    <div className="h-full">
                                        {us.userData.profileImage !== null ? (
                                            <Avatar src={us.userData.profileImage} className="h-full" />
                                        ) : (
                                            <Avatar src={userIcon} />
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <p>{us.userData.name}</p>
                                        <p>{us.userData.rol}</p>
                                    </div>
                                 </div>
                              ))
                              ) : load ? ( 
                                <Spinner />
                             ) : (
                                <p>No users available.</p> 
                            )
                            }
                       </div>
                       <div>

                       </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                        Action
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default CreateClientAcces;