import ProjectServiceModel from "../models/projectServices"
import UserAccesModel from "../models/userAcces"
import { createNotification } from "./notificationCreator"

type usersData = { 
    name: string,
    id: number
}

type newUsersDataType = { 
    userId: number
}

export const checkUsersWhenProjectIsUpdated = async (actualMembers: newUsersDataType[], newMembers: usersData[], projectId: number) => {

    const addNewMembers = newMembers.map(async (user) => {
        const userExists = actualMembers.some(member => member.userId === user.id);
        
        if (!userExists) {
            const newMember = new UserAccesModel({
                projectId: projectId,
                userId: user.id
            });

            await newMember.save();  
            return newMember;
        } 
        
        return null;  
    });

    const deleteOldMembers = actualMembers.map( async (member) => { 
       const memberStill = newMembers.some((mem) => mem.id === member.userId)
       if (!memberStill) {
        await UserAccesModel.destroy({
            where: {
                projectId: projectId,
                userId: member.userId
            }
        });
      }
      return null
    })

    await Promise.all([...addNewMembers, ...deleteOldMembers]);  
    console.log("Agregados:", addNewMembers)
    console.log("Ekliminafos:", deleteOldMembers)

    return { addedUsers: addNewMembers, removedUsers: deleteOldMembers };

};


export const checkIfAnyServiceIsNew = async (services: usersData[], projectId: number) => { 

  console.log("RECIBIIIII A", services)
  const projectActualService = await ProjectServiceModel.findAll({ 
     where: { 
        projectId: projectId
     }
  })
 
  const newServicesPromises = services.map(async (serv) => { 
    const serviceExists = projectActualService.some((s) => s.serviceId === serv.id);
    
    if (!serviceExists) { 
      return ProjectServiceModel.create({
        projectId: projectId,
        serviceId: serv.id,
        startDate: null,
        endDate: null,
        amount: null
      });
    }
  });

  await Promise.all(newServicesPromises);
  return newServicesPromises
}