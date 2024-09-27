import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import alertRemember from "./../../images/alertRemember.png"
import { userFollowsUpType } from '../../types/FollowsUp';
import "./today.css"

interface Props { 
    todayRemembers: userFollowsUpType[]
}

const TodayCalls = ({todayRemembers}: Props) => {


  return (
<div>
      <Dropdown>
        <DropdownTrigger>
          <img
            className="h-9 w-9 cursor-pointer"
            title="Tienes fechas de próximo contacto hoy"
            src={alertRemember}
            alt="Recordatorio"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Acciones Estáticas" className="w-96 max-h-[250px] overflow-y-auto">
          {todayRemembers.map((t: userFollowsUpType, index) => (
            <DropdownItem key={index} className="flex flex-col items-start justify-start">
              <div className="flex flex-col justify-start items-start">
                <p>
                  <b style={{ color: "#003366" }}>Cliente:</b> {t.clientData.name}
                </p>
                <p className="break-words" style={{ wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '100%' }}>
                  <b style={{ color: "#003366" }}>Última nota: </b>
                  {t.note}
                </p>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default TodayCalls