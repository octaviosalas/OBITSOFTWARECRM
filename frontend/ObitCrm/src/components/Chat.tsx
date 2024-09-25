import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
import apiBackendUrl from "../lib/axiosData";
import { userStore } from "../store/UserAccount";

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat entre {user?.name} - {userName}</h1>
      {!isConnected && <p>Conectando...</p>}
      {isConnected && (
        <>
         <div className="max-h-[400px] 2xl:max-h-[700px] overflow-y-auto w-full p-4">
                {messages.map((message) => (
                <div
                    key={message.msg}
                    className={`flex ${
                    message.userName === user?.name ? 'justify-end' : 'justify-start'
                    } mb-4`}
                >
                    <div
                    className={`flex ${
                      message.userName === user?.name ?  'flex-row-reverse' : 'flex-row'
                    } items-start max-w-[80%]`}
                    >            
                  
                    <div
                        className={`mx-2 p-3 rounded-lg ${
                          message.userName === user?.name 
                            ? 'bg-black text-white'
                            : 'bg-blue-600 text-white' 
                        }`}
                    >
                        <p className="font-semibold text-sm">{message.userName}</p>
                        <p className="mt-1">{message.msg}</p>
                    </div>
                    </div>
                </div>
                ))}
         </div>
          <input type="text" value={message} onChange={handleChangeMessageData} placeholder="Escribe un mensaje..." className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <button type="button" onClick={handleSendMessage} disabled={!socket || !isConnected} className={`ml-2 px-4 py-2 ${   !socket || !isConnected ? "bg-gray-300 cursor-not-allowed": "bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"} rounded`}>
            Enviar
          </button>
        </>
      )}
    </div>
  );
};

export default ChatComponent;






