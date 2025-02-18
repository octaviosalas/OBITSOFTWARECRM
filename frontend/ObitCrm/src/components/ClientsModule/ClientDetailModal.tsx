
import {Modal, ModalContent, Spinner, useDisclosure} from "@nextui-org/react";
import "./styles/clientModule.css"
import { useState } from "react";
import { clientPersonalDataType } from "../../types/Clients";
import SpinnerComponent from "../Spinner/Spinner";
import handleError from "../../utils/axiosErrorHanlder";
import { getClientData } from "../../utils/getClientData";
import ClientEditDataModal from "./ClientEditDataModal";
import { formateDate } from "../../utils/transformDate";
import { useNavigate } from "react-router-dom";

interface Props { 
  clientId: number,
  resetTable: () => void
}

const ClientDetailModal = ({clientId, resetTable}: Props) => {

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [clientPersonalData, setClientPersonalData] = useState<clientPersonalDataType>()
  const [load, setLoad] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleOpen = async () => { 
         onOpen()
         try {
            const clientDetail = await getClientData(clientId, setLoad)
            console.log(clientDetail)
            setClientPersonalData(clientDetail.clientData)
            setLoad(false)  
          } catch (error) {
            handleError(error, setLoad)
          }
  }



  return (
    <>
      <button className="btn-btn" onClick={handleOpen}>Detalle</button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
            <ModalContent>
            {() => (
                <>              
               {load ?
                <div className="flex justify-center items-center m-4">
                   <SpinnerComponent/> 
                </div> : 
                <div id="details-modal" className="modal">
                        <div  className="modal-content">          
                           <div className="flex justify-betweem">
                              <h2>Detalles del Cliente</h2>
                              <ClientEditDataModal clientData={clientPersonalData} resetTable={resetTable} closeChildrenModal={onClose}/>
                           </div>                
                            <form id="client-form" className="mt-4">
                                  <p><strong>Nombre:</strong> {clientPersonalData?.name}</p>
                                  <p><strong>Teléfono:</strong> {clientPersonalData?.phone}</p>
                                  <p><strong>Email:</strong> {clientPersonalData?.email}m</p>
                                  <p><strong>Fecha de Creación:</strong> {formateDate(clientPersonalData?.dischargeDate)}</p>
                                  <p><strong>Estado:</strong> {clientPersonalData?.active === true ? "Activo" : "Inactivo"}</p>

                                  {clientPersonalData?.socialNetworks.instagram === null ? 
                                    <p><strong>Instagram:</strong> - </p>  : 
                                    <p><strong>Instagram:</strong> {clientPersonalData?.socialNetworks.instagram}</p>
                                   }
                                   
                                   {clientPersonalData?.socialNetworks.facebook === null ? 
                                    <p><strong>Facebook:</strong> - </p>  : 
                                    <p><strong>Facebook:</strong> {clientPersonalData?.socialNetworks.facebook}</p>
                                   }

                         
                                    <div className="flex items-center gap-2 mt-4">
                                      <button className="mt-2">Ir a Proyectos</button>
                                      <button className="mt-2" onClick={() => navigate("/followsUp")}>Ir a Seguimientos</button>
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