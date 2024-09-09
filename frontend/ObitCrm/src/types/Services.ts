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