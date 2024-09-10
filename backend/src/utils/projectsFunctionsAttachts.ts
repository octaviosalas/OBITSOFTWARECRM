import UserAccesModel from "../models/userAcces"

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

/* 
    const deleteOldUsersPromises = actualMembers.map(async (member) => {
        const isStillMember = newMembers.some(user => user.id === member.userId);
        
        if (!isStillMember) {
            // Eliminar el miembro del modelo `UserAccesModel`
            await UserAccesModel.destroy({
                where: {
                    projectId: projectId,
                    userId: member.userId
                }
            });
        }

        return null;
    });

    // 3. Ejecutar ambas operaciones en paralelo
    await Promise.all([...addNewUsersPromises, ...deleteOldUsersPromises]);
*/