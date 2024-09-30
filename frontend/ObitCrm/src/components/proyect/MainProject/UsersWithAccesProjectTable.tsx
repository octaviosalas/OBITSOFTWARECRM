import  { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Avatar} from "@nextui-org/react";
import handleError from '../../../utils/axiosErrorHanlder';
import apiBackendUrl from '../../../lib/axiosData';
import { usersWithAccesData } from '../../../types/User';
import SpinnerComponent from '../../Spinner/Spinner';
import userIcon from "../../../images/user.png"

interface Props { 
    projectId: number
}

const UsersWithAccesProjectTable = ({projectId}: Props) => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [load, setLoad] = useState<boolean>(false)
    const [data, setData] = useState<usersWithAccesData[] | []>([])

    const handleOpen = async () => { 
        onOpen()
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.get(`/project/userWithAccesData/${projectId}`)
            if(status === 200) { 
                setData(data)
                setLoad(false)
                console.log("userWithAccesData", data)
            }
        } catch (error) {
            handleError(error, setLoad)
        }
    }

  return (
    <div>
        <p className='cursor-pointer font-semibold text-blue-800 underline' onClick={handleOpen}>Ver usuarios con acceso</p>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Usuarios con Acceso</ModalHeader>
                    <ModalBody>
                        {!load ? 
                        <div> 
                            {data.length > 0 ? 
                            <div className='flex flex-col justify-center items-start'>
                                {data.map((member : usersWithAccesData) => ( 
                                    <ul className='flex flex-col' key={member.userData.name}>
                                     <div className='flex items-center p-1 gap-3'>
                                        <Avatar className='h-9 w-9' src={member.userData.profileImage !== null ? member.userData.profileImage : userIcon}/>
                                        <li>{member.userData.name}</li>
                                     </div>
                                    </ul>                        
                                ))}
                            </div> : null
                            }
                         </div> : 
                         <div className='flex items-center justify-center'>
                          <SpinnerComponent/>
                        </div>}
                    </ModalBody>                  
                    </>
                )}
                </ModalContent>
            </Modal>
    </div>
  )
}

export default UsersWithAccesProjectTable
