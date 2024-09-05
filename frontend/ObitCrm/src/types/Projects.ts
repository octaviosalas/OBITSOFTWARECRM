import { clientPersonalDataType } from "./Clients"
import { UserTypeData } from "./User"
import { usersDataProjectType } from "./User"

export type projectDataType = { 
    amount: number,
    client: number,
    createdAt: string,
    id: number,
    name: string,
    startDate: string,
    updatedAt: string,
    clientData: clientPersonalDataType,
    description: string
}

export type userAccesProjectType = { 
    createdAt: string
    id: number
    projectId: number
    updatedAt: string,
    userData: UserTypeData,
    userId: number
}

export type projectRemindersType = { 
    userData: UserTypeData,
    updatedAt: string,
    clientData: clientPersonalDataType,
    date: string,
    id: number,
    proejctId: number,
    reminderData: string,
    userId: number
}


export type newReminderData = { 
    date: string,
    reminderData: string
}

export type projectMessagesType = { 
    userData: UserTypeData,
    updatedAt: string,
    createdAt: string,
    clientData: clientPersonalDataType,
    date: string,
    id: number,
    message: string,
    userId: number,
    projectId: number
}

export type newMessageProjectType = { 
    date: string,
    message: string
}

export type usersNewProjectsType = { 
    id: number
}

export type servicesNewProjectsType = { 
    id: number,
    name: string
}

export type newProjectDataType = { 
   amount: number,
   name: string,
   description: string,
   startDate: string,
   usersWithAcces: usersDataProjectType[] | [],
   services: servicesNewProjectsType[] | []
}
