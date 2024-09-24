import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const ChatComponent: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log("ejecuto useffect")
    const socketIo = io("http://localhost:4000");
    setSocket(socketIo);
    setIsConnected(true);

    socketIo.on('connect', () => {
      console.log('Conectado al servidor');
    });

    socketIo.on('chat message', (msg: string) => {
      console.log("Nuevo mensaje recibido:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socketIo.on('disconnect', () => {
      console.log('Desconectado del servidor');
      setIsConnected(false);
    });

    socketIo.on('reconnect', () => {
      console.log('Reconectado al servidor');
      setIsConnected(true);
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (socket && isConnected) {
        console.log("?")
        socket.emit("ping", Date.now());
      }
    }, 5000); // Envía ping cada 5 segundos

    return () => clearInterval(timer);
  }, [socket, isConnected]);

  const handleChangeMessageData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    if (socket) {
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  const handleSendMessage = async () => {
    try {
      await sendMessage();
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Component</h1>
      {!isConnected && <p>Conectando...</p>}
      {isConnected && (
        <>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md overflow-y-auto max-h-64">
            {messages.length === 0 ? (
              <p>No hay mensajes</p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="mb-2 p-2 bg-blue-100 rounded">
                  {msg}
                </div>
              ))
            )}
          </div>
          <input
            type="text"
            value={message}
            onChange={handleChangeMessageData}
            placeholder="Escribe un mensaje..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleSendMessage}
            disabled={!socket || !isConnected}
            className={`ml-2 px-4 py-2 ${
              !socket || !isConnected
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
            } rounded`}
          >
            Enviar
          </button>
        </>
      )}
    </div>
  );
};

export default ChatComponent;



