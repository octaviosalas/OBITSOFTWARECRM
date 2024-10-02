import { userAccesProjectType } from "../../types/Projects"
import { Avatar } from "@nextui-org/react"
import userIcon from "../../images/user.png"
import deleteProjectMember from "../../images/deleteProjectMember.png"
import { useState } from "react"

interface Props { 
    usersData: userAccesProjectType[] | undefined,
}


const DeleteProjectMember = ({usersData}: Props) => { 

    const [selectedUser, setSelectedUser] = useState<userAccesProjectType | null>(null)

   const chooseUserToBeDeleted = (userSelected: userAccesProjectType) => { 
    setSelectedUser(userSelected)
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
                        <div className="flex flex-col">
                            <p className="text-md">{selectedUser.userData.name}</p>
                            <p className="flex items-center gap-2 text-md">{selectedUser.userData.rol} </p>
                            <button className="bg-red-600 text-white text-sm h-8 w-auto  rounded-xl">Eliminar</button>

                        </div>                      
                    </div>
            </div> : null}
        </div>
    )
}

export default DeleteProjectMember