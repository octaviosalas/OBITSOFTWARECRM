import "./styles.css"
import { ServiceWithProjectType } from "../../types/Services"
import { formateDate } from "../../utils/transformDate"
import EditService from "./EditService"
import { useState } from "react"
import apiBackendUrl from "../../lib/axiosData"
import handleError from "../../utils/axiosErrorHanlder"

interface Props { 
    servicesData: ServiceWithProjectType[] | [],
    updateTable: () => void
}

interface endDateType { 
    endDateNew: string 
}

const ServicesTable =  ({servicesData, updateTable}: Props) => { 
    
    const [chooseEndDateId, setChooseEndDateId] = useState<number>()
    const [load, setLoad] = useState<boolean>(false)
    const [newEndDate, setNewEndDate] = useState<string>("")

    const chooseEndDateNow = (serviceId: number) => { 
        setChooseEndDateId(serviceId)
    }

    const handleChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setNewEndDate(e.target.value)
    }

    const updateServiceEndDate = async (serviceId: number) => { 
        console.log(serviceId)
        const newEndData : endDateType = ({ 
            endDateNew: newEndDate
        })
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.put(`/service/updateServiceEndDate/${serviceId}`, newEndData)
            if(status === 200) { 
                updateTable()
                console.log(data)
                setLoad(false)
            }
        } catch (error) {
            console.log(error)
            handleError(error, setLoad)
        }
    }

  return ( 
     <div>
       <table className="services-table">
            <thead>
                <tr>
                    <th>Servicio</th>
                    <th>Proyecto</th>
                    <th>Vencimiento</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {servicesData.map((serv : ServiceWithProjectType) => ( 
                    <tr key={serv.serviceId}>
                        <td>{serv.serviceName}</td>
                        <td>{serv.projectName} </td>
                        {serv.endDate !== null ? 
                            <td>{formateDate(serv.endDate )}</td>
                             : serv.endDate === null && chooseEndDateId !== serv.serviceId ? (
                                <td onClick={() => chooseEndDateNow(serv.serviceId)} className="underline text-blue-800 text-md font-semibold cursor-pointer hover:text-red-600">Seleccionar fecha</td>
                             ) : chooseEndDateId === serv.serviceId ? ( 
                                <td className="flex gap-3"> 
                                    <input type="date" className="w-2/4 border" onChange={handleChangeEndDate}/> 
                                    <button className="bg-blue-800 text-white" onClick={() => updateServiceEndDate(serv.projectServiceId)}>Confirmar</button>
                                    <button className="bg-red-600 text-white" onClick={() => setChooseEndDateId(0)}>Cancelar</button>
                                </td>
                             ) : null
                        }
                        <td>
                            <EditService updateTable={updateTable} servicesData={serv} service={serv}/>
                            <button className="btn-action delete"><i className="fas fa-trash-alt"></i></button>
                            <button className="btn-action details"><i className="fas fa-eye"></i></button>
                            <button className="btn-action configure-alert" id="openAlertSection"><i className="fas fa-bell"></i></button>
                        </td>
                   </tr>
                ))}
            </tbody>
      </table>
     </div>
  )
}

export default ServicesTable