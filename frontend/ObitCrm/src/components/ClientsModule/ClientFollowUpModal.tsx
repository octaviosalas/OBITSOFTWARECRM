import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import "./styles/clientModule.css"
import { useState } from "react";
import { getClientData } from "../../utils/getClientData";
import handleError from "../../utils/axiosErrorHanlder";
import { clientFollowUpDataType } from "../../types/Clients";
import SpinnerComponent from "../Spinner/Spinner";
import { formateDate } from "../../utils/transformDate";

interface Props { 
    clientId: number
  }

const ClientFollowUpModal = ({clientId}: Props) => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [clientFollowUpData, setClientFollowUpData] = useState<clientFollowUpDataType[] | []>()
    const [load, setLoad] = useState<boolean>(false)


    const handleOpen = async () => { 
        onOpen()
        try {
           const clientDetail = await getClientData(clientId, setLoad)
           console.log(clientDetail.clientFollowUp)
           setClientFollowUpData(clientDetail.clientFollowUp)
           setLoad(false)  
         } catch (error) {
           handleError(error, setLoad)
         }
 }


  return (
    <div>
         <button className="btn-btn" onClick={handleOpen}>Seguimientos</button>
         <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"2xl"}>
            <ModalContent>
            {(onClose) => (
                <>
                
                <div id="projects-modal" className="modal">
                   {load ?  
                   <div className="flex justify-center items-center m-4">
                       <SpinnerComponent/> 
                    </div> : 
                    <div className="modal-content">
                     
                                    <h2>Seguimientos del Cliente</h2>
                                  {clientFollowUpData && clientFollowUpData.length > 0 ?
                                    <table id="clientes-table">
                                        <thead>
                                            <tr>                                
                                                <th>Fecha</th>
                                                <th>Comentario</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {clientFollowUpData?.map(followUp => (
                                                <tr key={followUp.id}>
                                                    <td>{formateDate(followUp.createdAt)}</td>
                                                    <td>{followUp.note}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table> : 
                                    <div className="flex items-center justify-center">
                                        <p>No hay seguimientos</p>
                                    </div>
                                    }
                  
                    </div>}
                </div>
                
                </>
            )}
            </ModalContent>
        </Modal>
    </div>
  )
}

export default ClientFollowUpModal
