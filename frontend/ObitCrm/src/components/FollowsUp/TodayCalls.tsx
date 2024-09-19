import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import alertRemember from "./../../images/alertRemember.png"
import { userFollowsUpType } from '../../types/FollowsUp';

interface Props { 
    todayRemembers: userFollowsUpType[]
}

const TodayCalls = ({todayRemembers}: Props) => {

    console.log("me lllega en props todayremembers", todayRemembers)

  return (
    <div>
        <Dropdown>
            <DropdownTrigger>
                <img className="h-9 w-9 cursor-pointer" title="Tenes fechas de proximo contacto hoy" src={alertRemember}/>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" className="w-96 max-h-[250px] overflow-y-auto">
                {todayRemembers.map((t : userFollowsUpType) => ( 
                    <DropdownItem className="flex flex-col items-start justify-start">
                        <div className="flex flex-col justify-start items-start">
                            <p><b style={{color: "#003366"}}>Cliente:</b> {t.clientData.name}</p>
                            <p className="break-words" style={{ wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '100%' }}><b style={{color: "#003366"}}>Mensaje:</b> {t.note} </p>
                        </div>
                    </DropdownItem>
                ))}              

            </DropdownMenu>
        </Dropdown>
    </div>
  )
}

export default TodayCalls