import { userAccesProjectType } from "../../types/Projects"
import { Avatar, select } from "@nextui-org/react"
import userIcon from "../../images/user.png"
import deleteProjectMember from "../../images/deleteProjectMember.png"
import { useState } from "react"
import apiBackendUrl from "../../lib/axiosData"
import handleError from "../../utils/axiosErrorHanlder"
import SpinnerComponent from "../Spinner/Spinner"
import { shootSuccesToast } from "../../utils/succesToastFunction"
import { projectDataType } from "../../types/Projects"

interface Props { 
    usersData: userAccesProjectType[] | undefined,
    projectInformation: projectDataType | undefined,
    resetData: (ejecuteLoad: boolean) => void
}


const DeleteProjectMember = ({usersData, projectInformation, resetData}: Props) => { 

    const [selectedUser, setSelectedUser] = useState<userAccesProjectType | null>(null)
    const [load, setLoad] = useState<boolean>(false)

   const chooseUserToBeDeleted = (userSelected: userAccesProjectType) => { 
    console.log(projectInformation)
     console.log(selectedUser)
     setSelectedUser(userSelected)
   }

   const deleteMember = async () => { 
    setLoad(true)
    const projectId = projectInformation?.id
    const userId = selectedUser?.userData.id
    console.log(userId, projectId)
    try {
        const {data, status} = await apiBackendUrl.delete(`/project/deleteMember/${projectId}/${userId}`)
        if(status === 200) { 
            console.log(data)
            shootSuccesToast(data)
            resetData(false)
            setLoad(false)
            setSelectedUser(null)
        }
    } catch (error) {
        handleError(setLoad, setLoad)
    }
   }

    return ( 
        <div className="flex flex-col">
            <div className="flex gap-6">
            {usersData?.map((us : userAccesProjectType) => (  
                <div key={us.userData.id} className="flex mt-4 items-center gap-2">
                    <div className="h-full">
                        {us.userData.profileImage !== null ? (
                            <Avatar src={us.userData.profileImage} className="h-full" />
                                ) : (
                            <Avatar src={userIcon} />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <p className="text-md"><b>Nombre: </b>{us.userData.name}</p>
                        <p className="flex items-center gap-2 text-md">
                            <b>Rol: </b>
                            {us.userData.rol}   
                            {<img src={deleteProjectMember} className="w-4 h-full cursor-pointer" title="eliminar miembro" onClick={() => chooseUserToBeDeleted(us)}/> }
                        </p>
                    </div>
                
                </div>
                ))}
            </div>
            {selectedUser !== null ? 
               <div className="mt-6">
                    <div className="flex items-center gap-2">
                        <div className="h-full">
                           {selectedUser.userData.profileImage !== null ? <Avatar src={selectedUser.userData.profileImage} className="h-full" /> : <Avatar src={userIcon} />}
                        </div>
                        <div className="flex flex-col w-full">
                            <p className="text-md">{selectedUser.userData.name}</p>
                            <p className="flex items-center gap-2 text-md">{selectedUser.userData.rol} </p>
                        </div>                      
                    </div>

                    {
                    !load ? 
                     <button className="bg-red-600 text-white text-sm h-8 w-full  rounded-xl" onClick={() => deleteMember()}>Eliminar</button> :
                     <SpinnerComponent/>
                    }

            </div> : null}
        </div>
    )
}

export default DeleteProjectMember