import {Modal, ModalContent, ModalBody, useDisclosure} from "@nextui-org/react";
import "./styles.css"
import { ServiceWithProjectType } from "../../types/Services"
import { useCallback, useState, useEffect } from "react";
import { shootErrorToast, shootSuccesToast } from "../../utils/succesToastFunction";
import apiBackendUrl from "../../lib/axiosData";
import { userStore } from "../../store/UserAccount";
import { servicesType } from "../../types/Services";
import { formatDateInputElement } from "../../utils/transformDate";
import handleError from "../../utils/axiosErrorHanlder";
import SpinnerComponent from "../Spinner/Spinner";

interface Props { 
    servicesData: ServiceWithProjectType,
    service: ServiceWithProjectType,
    updateTable: () => void
}

const EditService = ({servicesData, service, updateTable}: Props) => { 

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [serviceType, setServiceType] = useState<ServiceWithProjectType>(service);
    const {user} = userStore()
    const [load, setLoad] = useState<boolean>(false)
    const [availableServices, setAvailableServices] = useState<servicesType[] | []>([])
    const [serviceStartDate, setServiceStartDate] = useState<string>(servicesData.startDate)
    const [serviceEndDate, setServiceEndDate] = useState<string>(servicesData.endDate)
    const [serviceAmount, setServiceAmount] = useState<number>(servicesData.amount)


    const handleOpen = () => { 
        onOpen()
        getServices()
        console.log(servicesData)
    }

    const getServices = useCallback(async () => { 
      try {
        const {data, status} = await apiBackendUrl.get(`/project/dataToCreateProjects/${user?.id}`)
        if(status === 200) {         
           console.log(data.services)
           setAvailableServices(data.services)
           setLoad(false)
        }
      } catch (error) {
          shootErrorToast("error")
      }
    }, [user])


    const handleChangeServiceType = (e: React.ChangeEvent<HTMLSelectElement>) => {
      console.log(e.target.value)
      const serviceSelected = availableServices.filter((serv) => serv.name === e.target.value)
       if(serviceSelected) { 
         
       }
    };

    const handleChangeServiceStartDate= (e: React.ChangeEvent<HTMLInputElement>) => {
      setServiceStartDate(e.target.value)
     };

    const handleChangeServiceEndDate= (e: React.ChangeEvent<HTMLInputElement>) => {
        setServiceEndDate(e.target.value)
    };
    
    const handleChangeServiceAmount= (e: React.ChangeEvent<HTMLInputElement>) => {
      setServiceAmount(Number(e.target.value))
    };

    useEffect(() => { 
       console.log(serviceType)
    }, [serviceType])
    
    const updateService = async () => { 
      console.log(servicesData.projectServiceId)
      console.log(servicesData.projectId)
      setLoad(true)
      const dataToUpdated = ({ 
        amount: serviceAmount,
        endDate: serviceEndDate,
        startDate: serviceStartDate,
        serviceData: serviceType
      })
      console.log(dataToUpdated)
      try {
        const {data, status} = await apiBackendUrl.put(`/service/updateProjectServiceData/${servicesData.projectServiceId}/${servicesData.projectId}`, dataToUpdated)
        if(status === 200) { 
            setLoad(false)
            shootSuccesToast(data)
            updateTable()
        }
      } catch (error) {
         handleError(error, setLoad)
      }
    }

   
    useEffect(() => { 
     console.log(serviceAmount)
    }, [serviceAmount])

    useEffect(() => { 
      console.log(serviceEndDate)
     }, [serviceEndDate])

     useEffect(() => { 
      console.log(serviceStartDate)
     }, [serviceStartDate])

     useEffect(() => { 
      console.log(serviceType)
     }, [serviceType])

  return ( 
    <>
      <button className="btn-action edit"  onClick={handleOpen}><i className="fas fa-pencil-alt" style={{color:"#28a745"}}></i></button> 
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
              <form id="serviceForm">
                     <h2>Editar Servicio</h2>
                          <div className="form-group mt-4">
                              <label >Referencia del Cliente:</label>
                              <input type="text" id="clientRef" name="clientRef" className="bg-gray-200" value={servicesData.clientName} disabled/>
                          </div>

                          <div className="form-group">
                              <label >Referencia al Proyecto:</label>
                              <input type="text" id="projectRef" name="projectRef" className="bg-gray-200" value={servicesData.projectName} disabled/>
                          </div>

                          <div className="form-group">
                              <label >Tipo de Servicio:</label>
                                <select id="serviceType" name="serviceType" required aria-placeholder={service.serviceName} value={service.serviceName} onChange={handleChangeServiceType}>
                                    {availableServices.map((av : servicesType) => ( 
                                      <option value={av.name} key={av.id}>{av.name}</option>
                                    ))}                          
                                </select>
                          </div>

                          <div className="form-group">
                              <label >Fecha de Contratación:</label>
                              <input type="date" id="contractDate" name="contractDate" required value={formatDateInputElement(serviceStartDate)} onChange={handleChangeServiceStartDate}/>
                          </div>

                          <div className="form-group">
                              <label >Fecha de Renovación:</label>
                              <input type="date" id="contractDate" name="contractDate" required value={formatDateInputElement(serviceEndDate)} onChange={handleChangeServiceEndDate}/>
                          </div>

                          <div className="form-group">
                              <label> Monto: </label>
                              <input type="number" id="contractDate" name="contractDate" required value={serviceAmount} onChange={handleChangeServiceAmount}/>
                          </div>

                         {!load ?
                          <div className="form-buttons">
                              <button type="submit" className="btn-submit" onClick={()=> updateService()}>Guardar</button>
                              <button type="button" className="btn-cancel" id="closeServiceSection">Cancelar</button>
                          </div>: 
                          <div className="flex items-center justify-center mt-4 mb-2">
                             <SpinnerComponent/>
                          </div>}
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditService