import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import addMember from "../../images/addMember.png"
import { userAccesProjectType } from "../../types/Projects"
import "./proyectDetail.css"
import apiBackendUrl from "../../lib/axiosData";
import { UserTypeData } from "../../types/User";
import { userStore } from "../../store/UserAccount";
import { useEffect, useState } from "react";
import { shootErrorToast, shootSuccesToast } from "../../utils/succesToastFunction";
import handleError from "../../utils/axiosErrorHanlder";
import SpinnerComponent from "../Spinner/Spinner";

interface Props { 
    usersWithAcces: userAccesProjectType[] | undefined,
    projectId: number | undefined,
    getProjectData: () => void
}

const AddNewMember = ({usersWithAcces, projectId, getProjectData}: Props) => {

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const {user} = userStore()
    const [availableUsers, setAvailableUsers] = useState<UserTypeData [] | []>([])
    const [userId, setUserId] = useState<number>()
    const [disabledUser, setDisabledUser] = useState<boolean>(false)
    const [load, setLoad] = useState<boolean>(false)

    const getEveryUsers = async () => { 
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.get("/user/everyUsersData")
            if(status === 200) { 
                console.log("Users", data)
                const filterUserAccountId = data.filter((us : UserTypeData) => us.id !== user?.id)
                setAvailableUsers(filterUserAccountId) 
                setLoad(false)
            }
        } catch (error) {
            shootErrorToast("Ocurrio un error al querer obtener los usuarios del sistema")
        }
    }

    const handleOpen = async () => { 
        onOpen()
        await getEveryUsers()
        console.log(usersWithAcces)
    } 

    const chooseUser = (userId: number) => { 
        console.log("recibi a", userId)
       const checkIfExist = usersWithAcces?.some((us) => us.userId === userId)
       if(checkIfExist) { 
        setDisabledUser(true)
        return shootErrorToast("El usuario ya es miembro del proyecto")
       }
       setUserId(userId)
       setDisabledUser(false)
    }
    
    const createNewMemberAcces = async () => { 
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.post(`/user/createNewUserAcces/${projectId}/${userId}`)
            if(status === 200) { 
                shootSuccesToast(data)
                onClose()
                getProjectData()
                setLoad(false)
            }
        } catch (error) {
            handleError(error, setLoad)
        }
    }


  return (
    <>
      <img src={addMember} className="h-8 w-8 cursor-pointer" title="Agregar miembro" onClick={handleOpen}/>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agregar nuevo miembro al Proyecto</ModalHeader>
              <ModalBody>
                <div className="modal-content">
                    <div className="form-group">
                       <select onChange={(e) => chooseUser(Number(e.target.value))}>
                            {availableUsers.map((us : UserTypeData) => ( 
                                <option key={us.id} value={us.id}>{us.name}</option>
                            ))}
                       </select>
                    </div>
                </div>
              </ModalBody>
             {!load ?
              <div className="flex items-center justify-center mb-4">
                        {!disabledUser ? 
                            <button className="btn-submit" onClick={() => createNewMemberAcces()}>Confirmar</button> 
                            : 
                            null
                        }
                  <button className="btn-cancel">Confirmar</button> 
              </div> : 
              <div className="mb-4">
                <SpinnerComponent/>
              </div>
              }
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddNewMember
