import cron from "node-cron";
import TokenModel from "../models/token";  // Ajusta la ruta según la estructura de tu proyecto
import { Op } from "sequelize";

const tokenCleanupJob = () => {
  cron.schedule("* * * * *", async () => {
    const expirationTime = new Date(Date.now() - 15 * 60 * 1000); 
    await TokenModel.destroy({
      where: {
        createdAt: {
          [Op.lt]: expirationTime,
        },
      },
    });
    console.log("Tokens expirados eliminados");
  });
};

export default tokenCleanupJob;