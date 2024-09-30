import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import "./styles.css"
import React, { useState } from "react";
import { newFollowUpType, userFollowsUpType } from "../../types/FollowsUp";
import apiBackendUrl from "../../lib/axiosData";
import { userStore } from "../../store/UserAccount";
import handleError from "../../utils/axiosErrorHanlder";
import SpinnerComponent from "../Spinner/Spinner";
import { shootSuccesToast } from "../../utils/succesToastFunction";
import ViewClientHistoricFollowUp from "./ViewClientHistoricFollowUp";

interface Props { 
    updateTable: () => void,
    followUpData: userFollowsUpType
}

const EditFollowUp = ({updateTable, followUpData}: Props) => {

    const formatDate = (isoString: string) => {
        return new Date(isoString).toISOString().slice(0, 10);
    };

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [load, setLoad] = useState<boolean>(false)
    const [note, setNote] = useState<string>(followUpData.note)
    const [contactDate, setContactDate] = useState<string>(formatDate(followUpData.contactDate));
    const [nextContactDate, setNextContactDate] = useState<string>(formatDate(followUpData.nextContactDate));

    const {user} = userStore()

    const handleOpen = () => { 
        onOpen()
        console.log("followupdata", followUpData)
    }

    const handleChangeNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => { 
        setNote(e.target.value)
    }

    const updateFollowUpData = async () => {
        setLoad(true)
        const followUpUpdatedData : newFollowUpType = ({ 
            note,
            contactDate,
            nextContactDate
        })
        console.log(followUpData)
       try {
            const {data, status} = await apiBackendUrl.put(`/client/updateMyTrackingData/${followUpData.id}/${followUpData.clientData.id}/${user?.id}`, followUpUpdatedData)
            if(status === 200) { 
                setLoad(false)
                updateTable()
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
      <button className="btn-action edit" data-client="Cliente A"><i className="fas fa-pencil-alt" style={{color:"#28a745"}} onClick={handleOpen}></i></button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"3xl"}>
        <ModalContent>
          {(onClose) => (
            <>
              <div className="full-screen-section" id="trackingSection">
                    <div className="form-section">
                        <button className="btn-close" id="closeTrackingSection" onClick={() => onClose()}>&times;</button>
                        <h2>Agregar/Editar Seguimiento</h2>
                        <div id="trackingForm">
                            <div className="form-row">
                                
                                <div className="form-col">
                                    <div className="form-group">
                                        <label >Fecha de Registro:</label>
                                        <input type="date" id="nextCommDate" name="nextCommDate" required value={contactDate} onChange={(e) => setContactDate(e.target.value)}/>
                                    </div>
                                </div>
                               
                                <div className="form-col">
                                    <div className="form-group">
                                        <label >Próxima Comunicación (Fecha):</label>
                                        <input type="date" id="nextCommDate" name="nextCommDate" required value={nextContactDate} onChange={(e) => setNextContactDate(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <div className="form-group">
                                        <label >Nota del seguimiento</label>
                                        <textarea id="lastCommDetails" name="lastCommDetails" value={note} onChange={handleChangeNote}></textarea>
                                    </div>
                                </div>
                                                            
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <div className="form-group">
                                        <label>Emails:</label>
                                        <a href="#" className="open-email-modal">Ver Emails</a>
                                    </div>
                                </div>
                                <div className="form-col">
                                    <div className="form-group">
                                        <label >Histórico de Comunicaciones:</label>
                                        <ViewClientHistoricFollowUp type="edit" clientId={followUpData.clientData.id} clientName={followUpData.clientData.name}/>
                                    </div>
                                </div>
                            </div>
                            {!load ? 
                            <div className="form-buttons">
                                <button  className="btn-submit" onClick={() => updateFollowUpData()}>Guardar</button>
                                <button type="button" className="btn-cancel" id="closeTrackingSection" onClick={() => onClose()}>Cancelar</button>
                            </div> : 
                            <div className="flex items-center justify-center mt-2 mb-2">
                               <SpinnerComponent/>
                            </div>
                            }
                        </div>
                    </div>
               </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditFollowUp