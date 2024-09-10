import  { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import handleError from '../../../utils/axiosErrorHanlder';
import apiBackendUrl from '../../../lib/axiosData';
import { usersWithAccesData } from '../../../types/User';
import SpinnerComponent from '../../Spinner/Spinner';

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
                console.log(data)
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
                                    <li>{member.userData.name}</li>
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
