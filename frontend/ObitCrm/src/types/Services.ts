import { clientPersonalDataServiceType } from "./Clients"

export type servicesType = { 
    createdAt: string,
    id: number,
    name: string,
    updated: string,
}

export type servicesDataType = { 
    id: number,
    name: string,
}

type service = { 
    createdAt: string
    id: number
    name: string
    updatedAt: string
}

export type serviceUserProjectType = { 
    amount: number
    createdAt: string
    endDate:string,
    id: number
    projectId:number
    serviceId: number
    startDate:string
    updatedAt: string
    service: service
}

export type UnifiedProjectType = {
    id: number;
    userId: number;
    projectId: number;
    createdAt: string; 
    updatedAt: string; 
    projectData: {
      id: number;
      name: string;
      description: string;
      startDate: string;
      amount: number;
      client: number;
      services: {
        id: number;
        projectId: number;
        serviceId: number;
        startDate: string; 
        endDate: string;  
        amount: number;
        service: servicesDataType
      }[];
      clientData: clientPersonalDataServiceType
    };
  }