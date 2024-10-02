import { Avatar } from "@nextui-org/react"
import {userWithAccesType} from "../../types/User"
import userIcon from "../../images/user.png"

interface Props { 
    usersData : userWithAccesType[] | []
}

const UsersList = ({usersData} : Props) => { 
    return ( 
        <div>
            { usersData.map((us: userWithAccesType) => (
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

export default UsersList