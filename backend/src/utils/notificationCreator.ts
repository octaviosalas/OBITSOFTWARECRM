import UserAccesModel from "../models/userAcces";
import ProjectModel from "../models/projects";
import UserModel from "../models/user";
import UserNotificationModel from "../models/userNotifications";


export const createNotification = async (projectId: string, userId: string, notificationType: string) => { 

    const projectData = await ProjectModel.findByPk(projectId);
    const projectName = projectData.name;

    const userData = await UserModel.findByPk(userId);
    const userName = userData.name;

    const projectUsers = await UserAccesModel.findAll({ 
        where: { projectId: projectId }
    }); 

    const notifications = projectUsers.map((userData) => {
        let message: string;

        switch (notificationType) {
            case 'PROJECT_REMINDER':
                message = `${userName} ha creado un nuevo recordatorio en el proyecto ${projectName}`;
                break;
            case 'PROJECT_MESSAGE':
                message = `${userName} ha enviado un nuevo mensaje al canal de mensajeria del proyecto ${projectName}`;
                break;
            case 'PROJECT_PLANIFICATION':
                message = `${userName} ha creado un nuevo documento de planificación en el proyecto ${projectName}`;
                break;
            default:
                throw new Error(`Tipo de notificación desconocido: ${notificationType}`);
        }

        return {
            userId: userData.userId,
            projectId: projectId,
            notificationType: notificationType,
            message: message,
            read: false
        };
    });

     await UserNotificationModel.bulkCreate(notifications);
}

export const createPersonalMessageNotification = async (userId: string, notificationType: string) => { 
   
}
