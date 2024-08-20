import {Sequelize} from "sequelize-typescript"
import dotenv from "dotenv"
dotenv.config()

const database = new Sequelize(process.env.POSTGRE_URL!, { 
    models: [__dirname + "/../models/**/*.ts"], 
    logging: false
})

const connectDatabase = async () => { 
    try {
        await database.authenticate()
        await database.sync({ alter: true });
        console.log("PostgreSQL DataBase OBITCRM is connected on Supabase Server")
    } catch (error) {
       console.log("Error en la conexión a la base de datos", error)
    }
}

export default connectDatabase
export { database };