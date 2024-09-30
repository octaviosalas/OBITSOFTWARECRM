import { useState, useEffect } from "react"
import apiBackendUrl from "../../lib/axiosData"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import "./styles/clientModule.css"
import { UserTypeData } from "../../types/User";
import handleError from "../../utils/axiosErrorHanlder";

interface Props { 
    clientId: number,
    resetTable: () => void
}

const CreateClientAcces = ({clientId, resetTable} : Props) => { 

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [usersData, setUsersData] = useState<UserTypeData[] | []>([])
    const [load, setLoad] = useState<boolean>(false)

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
         <Button className="btn-btn" onPress={handleOpen}>Crear Acceso</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                    <ModalBody>
                        <p> 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis.
                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                        </p>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis.
                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                        </p>
                        <p>
                        Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                        dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                        Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                        Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                        proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                        </p>
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