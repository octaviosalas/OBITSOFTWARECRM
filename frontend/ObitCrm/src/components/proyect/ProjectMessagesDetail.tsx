import "./proyectDetail.css"
import SendProjectMessage from "./SendProjectMessage"
import { useState } from "react"

const ProjectMessagesDetail = () => { 
     
    const [showSendMessage, setShowSendMessage] = useState<boolean>(false)

    return ( 
        <div className="flex flex-col items-start justify-start">
            <h2>Mensajería</h2>
            <button className="btn"  onClick={() => setShowSendMessage(prev => !prev)}>Enviar Mensaje</button>

              {showSendMessage ? <SendProjectMessage/> : null}

            <div id="messageHistory" className="message-box">
                <h3>Historial de Mensajes</h3>
                <p><strong>Usuario 1:</strong> Hola a todos, tenemos una reunión mañana.</p>
                <p><strong>Usuario 2:</strong> Gracias por el aviso.</p>
            
            </div>
        </div>
    )
}

export default ProjectMessagesDetail