import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import connectDatabase from "./database/db"
import UserRoutes from "./routes/userRoutes"
import ClientRoutes from "./routes/clientsRoutes"
import ServicesRoutes from "./routes/servicesRoutes"
import ProjectRoutes from "./routes/projectRoutes"
import MessagesRoutes from "./routes/messages"
import AlertsRoutes from "./routes/alertsRoutes"
import logger from "morgan"
import { Server } from "socket.io"
import {createServer} from "node:http"
import tokenCleanupJob from "./cron/tokenCleanupJob"

const port = process.env.PORT || 4000
dotenv.config()
const app = express()  
const server = createServer(app)

const io = new Server(server, {
     cors: {
       origin: "*", 
       methods: ["GET", "POST", "PUT", "DELETE"]
     }
});


io.on("connection", (socket) => { 
     console.log("A user has been conected")

     socket.on("disconnect", () => { 
          console.log("A User haas beeen desconected")
     })

     socket.on("chat message", (msg : string) => { 
          console.log("New  message detected", msg)
          io.emit("chat message", msg)
     })

})

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"))
app.use("/api/user", UserRoutes);
app.use("/api/client", ClientRoutes);
app.use("/api/service", ServicesRoutes);
app.use("/api/project", ProjectRoutes);
app.use("/api/message", MessagesRoutes);
app.use("/api/alert", AlertsRoutes);

tokenCleanupJob()

server.listen(port, () => { 
     console.log(`REST API CRM OBIT SOFTWARE RUNNING ON PORT ${port}`)
     connectDatabase()
     console.log(new Date())
})

export default app