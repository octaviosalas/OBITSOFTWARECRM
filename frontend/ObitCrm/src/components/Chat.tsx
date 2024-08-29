import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const ChatComponent = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [everyMessages, setEveryMessages] = useState<string[]>([]);

  useEffect(() => {
    const socketIo = io("http://localhost:4000");
    setSocket(socketIo);

    socketIo.on('connect', () => {
      console.log('Conectado al servidor');
    });

    socketIo.on('disconnect', () => {
      console.log('Desconectado del servidor');
    });

    socketIo.on('chat message', (msg: string) => {
      console.log("Nuevo mensaje recibido:", msg);
      setEveryMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socketIo.disconnect();
    };
  }, [socket]);

  const handleChangeMessageData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (socket && message.trim().length > 0) {
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  useEffect(() => { 
     console.log(everyMessages)
  }, [everyMessages])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Component</h1>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        {everyMessages.length === 0 ? (
          <p>No hay mensajes</p>
        ) : (
          everyMessages.map((msg, index) => (
            <div key={index} className="mb-2">
              {msg}
            </div>
          ))
        )}
        <input
          type="text"
          value={message}
          onChange={handleChangeMessageData}
          placeholder="Escribe un mensaje..."
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;



