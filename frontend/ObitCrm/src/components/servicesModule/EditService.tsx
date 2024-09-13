import {Modal, ModalContent, ModalBody, useDisclosure} from "@nextui-org/react";
import "./styles.css"
import { UnifiedProjectType } from "../../types/Services"
import { useCallback, useState, useEffect } from "react";
import { shootErrorToast } from "../../utils/succesToastFunction";
import apiBackendUrl from "../../lib/axiosData";
import { userStore } from "../../store/UserAccount";
import { servicesType } from "../../types/Services";
import { servicesDataType } from "../../types/Services";
import { formatDateInputElement } from "../../utils/transformDate";

interface Props { 
    servicesData: UnifiedProjectType,
    service: servicesDataType
}

const EditService = ({servicesData, service}: Props) => { 

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [serviceType, setServiceType] = useState<servicesDataType>(service);
    const {user} = userStore()
    const [load, setLoad] = useState<boolean>(false)
    const [availableServices, setAvailableServices] = useState<servicesType[] | []>([])
    const [serviceStartDate, setServiceStartDate] = useState<string>(servicesData.projectData.services[0].startDate)
    const [serviceEndDate, setServiceEndDate] = useState<string>(servicesData.projectData.services[0].endDate)
    const [serviceAmount, setServiceAmount] = useState<number>(servicesData.projectData.services[0].amount)


    const handleOpen = () => { 
        onOpen()
        console.log("servicesData", servicesData)
        console.log("objeto servicve", service)
        getServices()
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
       const serviceSelected = availableServices.filter((serv) => serv.name === e.target.value)
       if(serviceSelected) { 
        setServiceType(serviceSelected[0])
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




  return ( 
    <>
      <button className="btn-action edit"  onClick={handleOpen}><i className="fas fa-pencil-alt"></i></button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
              <form id="serviceForm">
                     <h2>Editar Servicio</h2>
                          <div className="form-group mt-4">
                              <label >Referencia del Cliente:</label>
                              <input type="text" id="clientRef" name="clientRef" className="bg-gray-200" value={servicesData.projectData.clientData.name} disabled/>
                          </div>

                          <div className="form-group">
                              <label >Referencia al Proyecto:</label>
                              <input type="text" id="projectRef" name="projectRef" className="bg-gray-200" value={servicesData.projectData.name} disabled/>
                          </div>

                          <div className="form-group">
                              <label >Tipo de Servicio:</label>
                                <select id="serviceType" name="serviceType" required aria-placeholder={serviceType.name} value={serviceType.name} onChange={handleChangeServiceType}>
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

                          <div className="form-buttons">
                              <button type="submit" className="btn-submit">Guardar</button>
                              <button type="button" className="btn-cancel" id="closeServiceSection">Cancelar</button>
                          </div>
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