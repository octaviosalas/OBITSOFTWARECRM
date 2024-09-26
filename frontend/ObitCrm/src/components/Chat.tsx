import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
import apiBackendUrl from "../lib/axiosData";
import { userStore } from "../store/UserAccount";
import "./chatpruebacss.css"

export type messageType = { 
  msg: string,
  userName: string
}

const ChatComponent: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<messageType[] | []>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const { userAccountId, userId } = useParams();
  const {user} = userStore()

  useEffect(() => { 
    console.log(messages)
  }, [messages])

    const getUserData = async () => { 
      try {
        const {data, status} = await apiBackendUrl.get(`/user/userData/${userId}`)
        if(status === 200) { 
          console.log(data)
          setUserName(data.name)
        }
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(() => {
      console.log("ejecuto useffect")
      const socketIo = io("http://localhost:4000");
      setSocket(socketIo);
      setIsConnected(true);

      socketIo.on('connect', () => {
        console.log('Conectado al servidor');
      });

      socketIo.emit('join-room', { userAccountId, userId })

      
      socketIo.on("chat message", ({ msg, roomId, writtenBy }) => {
        console.log("Nuevo mensaje recibido:", msg, writtenBy, roomId);
        setMessages((prevMessages) => [...prevMessages, { msg: msg, userName: writtenBy }]);
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
      getUserData()
    }, [userAccountId, userId]);


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

    const handleSendMessage = async () => {
      try {
        await sendMessage(user?.name);
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
      }
    };

    const sendMessage = async (userName: string | undefined) => {
      if (!message.trim()) return;
      if (socket) {
        const roomId = [userAccountId, userId].sort().join('-');
        const writtenBy = userName
        console.log("Enviando mensaje", { msg: message, roomId, writtenBy });
        socket.emit("chat message", { msg: message, roomId, writtenBy });
        setMessage("");
      }
    };

  

  return (
    <div className="mi-chat-container mx-auto p-4">
    <h1 className="mi-chat-title">Chat entre {user?.name} - {userName}</h1>
    {!isConnected && <p className="mi-chat-status">Conectando...</p>}
    {isConnected && (
      <>
        <div className="mi-chat-messages max-h-[400px] 2xl:max-h-[700px] overflow-y-auto w-full p-4">
          {messages.map((msg) => (
            <div
              key={msg.msg}
              className={`mi-chat-message flex ${
                msg.userName === user?.name ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              <div
                className={`flex ${
                  msg.userName === user?.name ? 'flex-row-reverse' : 'flex-row'
                } items-start max-w-[80%]`}
              >
                <div
                  className={`mi-chat-bubble mx-2 p-3 rounded-lg ${
                    msg.userName === user?.name ? 'bg-blue-600 text-white' : 'bg-black text-white'
                  }`}
                >
                  <p className="mi-chat-username font-semibold text-sm">{msg.userName}</p>
                  <p className="mi-chat-text mt-1">{msg.msg}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mi-chat-input-container flex items-center mt-4">
          <input
            type="text"
            value={message}
            onChange={handleChangeMessageData}
            placeholder="Escribe un mensaje..."
            className="mi-chat-input w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleSendMessage}
            disabled={!socket || !isConnected}
            className={`mi-chat-send-button ml-2 px-4 py-2 rounded ${
              !socket || !isConnected ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300'
            }`}
          >
            Enviar
          </button>
        </div>
      </>
    )}
  </div>
  );
};

export default ChatComponent;






