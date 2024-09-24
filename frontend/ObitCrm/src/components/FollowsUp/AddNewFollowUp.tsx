import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import "./styles.css"
import React, { useState } from "react";
import { newFollowUpType } from "../../types/FollowsUp";
import apiBackendUrl from "../../lib/axiosData";
import { userStore } from "../../store/UserAccount";
import handleError from "../../utils/axiosErrorHanlder";
import { clientPersonalDataType } from "../../types/Clients";
import { getCurrentDateWithoutTime } from "../../utils/actualDate";
import SpinnerComponent from "../Spinner/Spinner";
import { shootSuccesToast } from "../../utils/succesToastFunction";
import WithOutClients from "../reusableComponents/withOutClients";


interface Props { 
    updateTable: () => void,
    getTodayNoticies: () => void
}

const AddNewFollowUp = ({updateTable, getTodayNoticies}: Props) => {

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [everyClientsData, setEveryClientsData] = useState<clientPersonalDataType[] | []>([])
  const [load, setLoad] = useState<boolean>(false)
  const [note, setNote] = useState<string>("")
  const [contactDate, setContactDate] = useState<string>(getCurrentDateWithoutTime())
  const [nextContactDate, setNextContactDate] = useState<string>("")
  const [clientId, setClientId] = useState<number>()
  const [withOutClientsData, setWithOutClientsData] = useState<boolean>(false)

  const {user} = userStore()

    const handleOpen = () => { 
        getClientsAccesUserData()
        onOpen()
    }

    const getClientsAccesUserData = async () => { 
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.get(`/user/userClientAcces/${user?.id}`)
            if(status === 200) { 
                 if(data.length > 0) { 
                    setWithOutClientsData(false)
                    const clientsOnlyData = data.map((c : any) => { 
                        const onlyClientsData = c.clientData
                        return onlyClientsData
                    })
                    setLoad(false)
                    setEveryClientsData(clientsOnlyData)
                    setClientId(clientsOnlyData[0].id)
                 } else { 
                    setWithOutClientsData(true)
                 }

            }
        } catch (error) {
            console.log(error)
        }
    }

    const chooseClient = (id: number) => { 
        setClientId(id)
    }

    const handleChangeNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => { 
        setNote(e.target.value)
    }

    const createNewFollowUp = async () => {
        setLoad(true)
        const followUpData : newFollowUpType = ({ 
            note,
            contactDate,
            nextContactDate
        })
       
       try {
            const {data, status} = await apiBackendUrl.post(`/client/createClientFollowUp/${clientId}/${user?.id}`, followUpData)
            if(status === 200) { 
                setLoad(false)
                updateTable()
                getTodayNoticies()
                console.log(data)
                onClose()
                shootSuccesToast(data)
            }
        } catch (error) {
            handleError(error, setLoad)
        }
    }



  return (
    <>
      <button className="btn-new-tracking" id="openTrackingSection" onClick={handleOpen}> Agregar Seguimiento </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"3xl"}>
        <ModalContent>
          {(onClose) => (
            <>
             {!withOutClientsData ? 
              <div className="full-screen-section" id="trackingSection">
                    <div className="form-section">
                        <button className="btn-close" id="closeTrackingSection" onClick={() => onClose()}>&times;</button>
                        <h2>Agregar/Editar Seguimiento</h2>
                        <div id="trackingForm">
                            <div className="form-row">
                                <div className="form-col">
                                    <div className="form-group">
                                        <label >Referencia al Cliente:</label>
                                        <select  id="clientRef" name="clientRef" required onChange={(e) => chooseClient(Number(e.target.value))}>
                                           {everyClientsData.map((c : clientPersonalDataType) => ( 
                                              <option key={c.id} value={c.id}>{c.name}</option>
                                           ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-col">
                                    <div className="form-group">
                                        <label >Fecha de Registro:</label>
                                        <input type="date" id="nextCommDate" name="nextCommDate" required value={contactDate} onChange={(e) => setContactDate(e.target.value)}/>
                                    </div>
                                </div>
                               
                                <div className="form-col">
                                    <div className="form-group">
                                        <label >Próxima Comunicación (Fecha):</label>
                                        <input type="date" id="nextCommDate" name="nextCommDate" required onChange={(e) => setNextContactDate(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <div className="form-group">
                                        <label >Nota del seguimiento</label>
                                        <textarea id="lastCommDetails" name="lastCommDetails" onChange={handleChangeNote}></textarea>
                                    </div>
                                </div>
                                                            
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <div className="form-group">
                                        <label >Emails:</label>
                                        <a href="#" className="open-email-modal">Ver Emails</a>
                                    </div>
                                </div>
                                <div className="form-col">
                                    <div className="form-group">
                                        <label >Histórico de Comunicaciones:</label>
                                        <a href="#" className="open-history-modal">Ver Histórico</a>
                                    </div>
                                </div>
                            </div>
                            {!load ? 
                            <div className="form-buttons">
                                <button  className="btn-submit" onClick={() => createNewFollowUp()}>Guardar</button>
                                <button type="button" className="btn-cancel" id="closeTrackingSection" onClick={() => onClose()}>Cancelar</button>
                            </div> : 
                            <div className="flex items-center justify-center mt-2 mb-2">
                               <SpinnerComponent/>
                            </div>
                            }
                        </div>
                    </div>
              </div> : 
              <div className="flex items-center justify-center p-4">
                <WithOutClients close={onClose}/>
              </div> 
               } 
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddNewFollowUp