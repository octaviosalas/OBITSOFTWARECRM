import { clientPersonalDataType } from "./Clients"
import { serviceUserProjectType } from "./Services"

export type newUserTypeData = { 
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    rol: string
}

export type UserTypeData = { 
    id: number,
    name: string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string,
    rol: string | null
}

export type userLoginType = Omit<UserTypeData, 'id' | 'name' | 'createdAt' | 'updatedAt'>;

export type usersDataProjectType = { 
    id: number,
    name: string,
}

export type projectDataUserPersonalType = { 
    amount: number,
    client: number,
    createdAt: string,
    id: number,
    name: string,
    startDate: string,
    updatedAt: string,
    clientData: clientPersonalDataType,
    description: string,
    services: serviceUserProjectType[] | []
}

export type userPersonalProjectsType = { 
    createdAt: string,
    projectId: number,
    id: number,
    updatedAt: string,
    userId: number,
    projectData: projectDataUserPersonalType
}

export type usersWithAccesData = Omit<userPersonalProjectsType, "projectData"> & {
    userData: UserTypeData;
  };

