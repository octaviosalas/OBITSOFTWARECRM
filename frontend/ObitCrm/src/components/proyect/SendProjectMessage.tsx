import "./proyectDetail.css"

const SendProjectMessage = () => { 
    return ( 
        <div id="sendMessageForm" className="form-container"  >
            <h3>Enviar Mensaje</h3>
            <div className="form-group">
                <label>Mensaje:</label>
                <textarea id="messageContent" />
            </div>
            <button className="btn" >Enviar Mensaje</button>
            <button className="btn btn-danger">Cancelar</button>
    </div>
    )
}

export default SendProjectMessage