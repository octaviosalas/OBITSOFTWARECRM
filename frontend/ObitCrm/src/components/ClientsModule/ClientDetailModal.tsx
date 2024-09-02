
import {Modal, ModalContent, Spinner, useDisclosure} from "@nextui-org/react";
import "./styles/clientModule.css"
import apiBackendUrl from "../../lib/axiosData";
import { useState } from "react";
import { clientPersonalDataType } from "../../types/Clients";
import SpinnerComponent from "../Spinner/Spinner";
import handleError from "../../utils/axiosErrorHanlder";

interface Props { 
  clientId: number
}

const ClientDetailModal = ({clientId}: Props) => {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [clientPersonalData, setClientPersonalData] = useState<clientPersonalDataType>()
  const [load, setLoad] = useState<boolean>(false)

  const handleOpen = async () => { 
       setLoad(true)
       onOpen()
       try {
          const {status, data} = await apiBackendUrl.get(`/client/clientData/${clientId}`)
          console.log(data)
          console.log(status)
          setClientPersonalData(data.clientData)
          setLoad(false)
          } catch (error) {
            handleError(error, setLoad)
          }
  }

  return (
    <>
      <button className="btn-btn" onClick={handleOpen}>Detalle</button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {() => (
                <>              
               {load ? <SpinnerComponent/> : 
                <div id="details-modal" className="modal">
                        <div  className="modal-content">          
                           <div className="flex justify-betweem">
                              <h2>Detalles del Cliente</h2>
                              <span className="edit-icon">✎</span>
                           </div>                
                            <form id="client-form" className="mt-4">
                                  <p><strong>Nombre:</strong> {clientPersonalData?.name}</p>
                                  <p><strong>Teléfono:</strong> {clientPersonalData?.phone}</p>
                                  <p><strong>Email:</strong> {clientPersonalData?.email}m</p>
                                  <p><strong>Fecha de Creación:</strong> {clientPersonalData?.dischargeDate}</p>
                                  <p><strong>Estado:</strong> {clientPersonalData?.active === true ? "Activo" : "Inactivo"}</p>
                                  <p><strong>Instagram</strong>  {clientPersonalData?.socialNetworks.instagram === null ? "-" : clientPersonalData?.socialNetworks.instagram}</p>
                                  <p><strong>Facebook</strong> {clientPersonalData?.socialNetworks.facebook === null ? "-" : clientPersonalData?.socialNetworks.facebook}</p>
                                    <div className="flex items-center gap-2 mt-4">
                                      <button className="mt-2">Ir a Proyectos</button>
                                      <button className="mt-2">Ir a Seguimientos</button>
                                    </div>
                            </form>
                        </div>
                </div>
                }
                
                </>
            )}
            </ModalContent>
        </Modal>
    </>
  );
}

export default ClientDetailModal