import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import connectDatabase from "./database/db"
import UserRoutes from "./routes/userRoutes"
import ClientRoutes from "./routes/clientsRoutes"
import ServicesRoutes from "./routes/servicesRoutes"
import ProjectRoutes from "./routes/projectRoutes"

const port = process.env.PORT || 4000

dotenv.config()
const app = express()  
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", UserRoutes);
app.use("/api/client", ClientRoutes);
app.use("/api/service", ServicesRoutes);
app.use("/api/project", ProjectRoutes);

app.listen(port, () => { 
     console.log(`REST API CRM OBIT SOFTWARE RUNNING ON PORT ${port}`)
     connectDatabase()
     console.log(new Date())
})

export default app