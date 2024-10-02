import { userAccesProjectType } from "../../types/Projects"
import { Avatar } from "@nextui-org/react"
import userIcon from "../../images/user.png"

interface Props { 
    usersData: userAccesProjectType[] | undefined
}

const UsersProjectList = ({usersData}: Props) => { 
    return ( 
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
                          <p className="text-sm"><b>Nombre: </b>{us.userData.name}</p>
                          <p className="text-sm"><b>Rol: </b>{us.userData.rol}</p>
                      </div>
                  </div>
            ))}
        </div>
    )
}

export default UsersProjectList

