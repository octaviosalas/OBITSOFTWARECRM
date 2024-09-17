import { useState } from "react";
import "./styles.css"
import {Modal, ModalContent, ModalBody, useDisclosure} from "@nextui-org/react";
import { userStore } from "../../store/UserAccount";
import apiBackendUrl from "../../lib/axiosData";
import { shootSuccesToast } from "../../utils/succesToastFunction";
import handleError from "../../utils/axiosErrorHanlder";
import SpinnerComponent from "../Spinner/Spinner";

type newAlertType = { 
    message: string;
    date: string
}

const AddNewAlert = () => { 

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [date, setDate] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [load, setLoad] = useState<boolean>(false)
    const {user} = userStore()

    const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => { 
        setMessage(e.target.value)
    }

    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setDate(e.target.value)
    }

    const createAlert = async () => { 
        setLoad(true)
        const alertData : newAlertType= ({ 
            message: message,
            date: date
        })
        try {
            const {data, status} = await apiBackendUrl.post(`/alert/createAlert/${user?.id}`, alertData)
            if(status === 200) { 
                shootSuccesToast(data)
                setLoad(false)
                onClose()
            }
        } catch (error) {
            handleError(error, setLoad)
        }
    }

   return ( 
        <> 
        <button className="btn-toggle-tables" onClick={onOpen}>Configurar Alerta</button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            {(onClose) => (
            <>
            <ModalBody>
               <div>
                    <form id="alertForm">
                        <h2>Crear Alerta</h2>
                        <div className="form-group">
                            <label >Fecha</label>
                            <input type="date" id="alertDateTime" name="alertDateTime" required onChange={handleChangeDate}/>
                        </div>

                        <div className="form-group">
                            <label >Mensaje de Alerta:</label>
                            <textarea id="alertMessage" name="alertMessage" required  onChange={handleChangeMessage}></textarea>
                        </div>

                        {!load ? 
                        <div className="form-buttons">
                            <button type="submit" className="btn-submit" onClick={() => createAlert()}>Configurar</button>
                            <button type="button" className="btn-cancel" id="closeAlertSection">Cancelar</button>
                        </div> :
                             <div className="flex items-center justify-center mt-2 mb-2">
                                <SpinnerComponent/> 
                            </div>
                        }
                    </form>
               </div>
            </ModalBody>
            </>
            )}
        </ModalContent>
        </Modal>
        </>
   )
}

export default AddNewAlert