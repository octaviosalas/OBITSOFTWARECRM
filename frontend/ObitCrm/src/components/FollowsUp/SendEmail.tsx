import {Modal, ModalContent,  useDisclosure} from "@nextui-org/react";
import { useState } from "react";
import "./styles.css"
import { userStore } from "../../store/UserAccount";
import UseGetUserClients from "../../hooks/UseGetUserClients";
import { clientPersonalDataType } from "../../types/Clients";
import apiBackendUrl from "../../lib/axiosData";
import handleError from "../../utils/axiosErrorHanlder";
import { getCurrentDateWithoutTime } from "../../utils/actualDate";
import { emailTypeData } from "../../types/email";
import SpinnerComponent from "../Spinner/Spinner";
import { shootSuccesToast } from "../../utils/succesToastFunction";
import { shootSuccesWithOutLoginFunction } from "../../utils/succesToastFunction";

const SendEmail = () => {

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const {user} = userStore()
  const {everyClientsData, load, withOutClientsData, getClientsAccesUserData} = UseGetUserClients()

  const [clientId, setClientId] = useState<number>()
  const [destinationEmail, setDestinationEmail] = useState<string>("")
  const [emailTitle, setEmailTitle] = useState<string>("")
  const [emailMessage, setEmailMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const actualDate = getCurrentDateWithoutTime()

  const handleOpen = () => { 
    if(user === null) { 
      return shootSuccesWithOutLoginFunction("Debes iniciar sesion para crear un recordatorio")
   }
    onOpen()
    getClientsAccesUserData(Number(user?.id))
  }

  const chooseClient = (id: number) => { 
    console.log(id)
    const SelectedClientEmail= everyClientsData.filter((c : clientPersonalDataType) => c.id === id)
    const clientEmail = SelectedClientEmail[0].email
    setDestinationEmail(clientEmail)
    setClientId(id)
  }

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setEmailTitle(e.target.value)
  }

  const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => { 
    setEmailMessage(e.target.value)
  }

  const sendEmail = async () => { 
    setLoading(true)
    const emailData : emailTypeData = ({ 
      emailTitle: emailTitle,
      emailMessage: emailMessage,
      destinationEmail: destinationEmail,
      emailDate: actualDate,
    })
    try {
      const {data, status} = await apiBackendUrl.post(`/client/sendEmailToClient/${clientId}/${user?.id}`, emailData)
        if(status === 200) { 
          console.log(data)
          shootSuccesToast(data)
          setLoading(false)
          onClose()
        }
      } catch (error) {
        handleError(error, setLoading)
      }
  }  


  return (
    <>
      <button className="btn-send-email"  onClick={handleOpen}> Enviar Email </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <div className="full-screen-section" id="emailSection">
                <div className="form-section">
                    <button className="btn-close" id="closeEmailSection" onClick={() => onClose()}>&times;</button>
                    <h2>Enviar Email</h2>
                    <form id="emailForm">
                       <div className="form-group">
                            <label>Cliente</label>
                            <select id="clientRef" name="clientRef" required onChange={(e) => chooseClient(Number(e.target.value))}>
                                {everyClientsData.map((ev : clientPersonalDataType) => ( 
                                  <option key={ev.id} value={ev.id}>{ev.name}</option>
                                ))}
                            </select>                          
                        </div>
                        <div className="form-group">
                            <label >Dirección de Email:</label>
                            <input type="email" id="emailTo" name="emailTo" required value={destinationEmail}/>
                        </div>
                        <div className="form-group">
                            <label >Asunto:</label>
                            <input type="text" id="emailSubject" name="emailSubject" required onChange={handleChangeTitle}/>
                        </div>
                        <div className="form-group">
                            <label >Cuerpo del Email:</label>
                            <textarea id="emailBody" name="emailBody" required onChange={handleChangeMessage}></textarea>
                        </div>
                       {!loading ? 
                        <div className="form-buttons">
                            <button type="submit" className="btn-submit" onClick={() => sendEmail()}>Enviar</button>
                            <button type="button" className="btn-cancel" id="closeEmailSection" onClick={() => onClose()}>Cancelar</button>
                        </div> : 
                        <div>
                           <SpinnerComponent/>
                        </div>
                        }
                    </form>
                </div>
            </div>

            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default SendEmail

