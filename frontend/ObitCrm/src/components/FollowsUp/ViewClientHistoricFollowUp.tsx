import {Modal, ModalContent, ModalHeader, ModalBody, useDisclosure} from "@nextui-org/react";
import apiBackendUrl from "../../lib/axiosData";
import { useState } from "react";
import handleError from "../../utils/axiosErrorHanlder";
import { userStore } from "../../store/UserAccount";
import SpinnerComponent from "../Spinner/Spinner";
import "../ClientsModule/styles/clientModule.css"
import {clientHistoricFollowUpType} from "../../types/FollowsUp"
import { formateDate } from "../../utils/transformDate";

interface Props { 
    clientId: number,
    clientName: string,
    type: string
}

const ViewClientHistoricFollowUp = ({clientId, clientName, type}: Props) => {

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [load, setLoad] = useState<boolean>(false)
  const [clientFollowsUpData, setClientFollowUpData] = useState<clientHistoricFollowUpType [] | []>([])
  const [filteredFollowsUp, setFilteredFollowsUp] = useState<clientHistoricFollowUpType [] | []>([])
  const {user} = userStore()

  const handleOpen = async () => { 
    onOpen()
    setLoad(true)
    try {   
        const {data, status} = await apiBackendUrl.get(`/client/myCustomerClientTracking/${clientId}/${user?.id}`)
        if(status === 200) { 
            console.log(data) 
            setLoad(false)
            setClientFollowUpData(data)
            setFilteredFollowsUp(data)
        }
    } catch (error) {
        handleError(error, setLoad)
    }
  }

  const handleChangeWord = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const word = e.target.value
    const filteredFollowUp = clientFollowsUpData.filter((note) => note.note.includes(word))
    setFilteredFollowsUp(filteredFollowUp)
  }

  return (
    <>
      {type === "onTable" ? 
        <button className="btn-action details" data-client="Cliente A"><i onClick={handleOpen} className="fas fa-eye" style={{color:"blue"}}></i></button>
         : 
        <p onClick={handleOpen} className="open-history-modal cursor-pointer underline" style={{color:"#003366"}}>Ver Histórico</p>
       }
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"3xl"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Seguimientos de {clientName}
                       <form id="client-form">
                           <input type="text" placeholder="Filtrar por palabra clave" className="text-xs font-medium text-black" onChange={handleChangeWord}/>
                        </form>
                </ModalHeader>
              <ModalBody>
                 {!load && clientFollowsUpData.length > 0 ? ( 
                      <div className="modal-content">
                      <table id="clientes-table" className="max-h-[100px] overflow-y-auto">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Nota</th>
                            </tr>
                        </thead>
                          <tbody>                         
                            {filteredFollowsUp.map((c : clientHistoricFollowUpType) => ( 
                              <tr key={c.id}>
                                <td>{formateDate(c.contactDate)}</td>
                                <td>{c.note}</td>
                               </tr>
                            ))}                                         
                          </tbody>
                      </table>
                  </div>
                    ) : !load && clientFollowsUpData.length === 0 ? ( 
                        <p>No hay seguimientos cargados sobre este cliente</p>
                    ) : load ? ( 
                      <SpinnerComponent/>
                    ) : null 
                    }
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ViewClientHistoricFollowUp