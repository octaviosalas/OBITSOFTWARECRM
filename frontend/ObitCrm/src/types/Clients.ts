export type userSocialNetworksType = { 
    instagram: string,
    facebook: string
}



export type clientPersonalDataType = { 
    id: number,
    name: string,
    phone: string,
    email: string,
    dischargeDate: string,
    active: boolean,
    socialNetworks: userSocialNetworksType,
    createdAt: string,
    updatedAt: string
}

export type clientProjectsDataType = { 
    id: number,
    name: string,
    startDate: string,
    amount: number,
    client: number,
    createdAt: string,
    updatedAt: string,
    clientData: clientPersonalDataType,
}

export type clientFollowUpDataType = { 
    id: number,
    userId: number,
    clientId: number,
    contactDate: string,
    nextContactDate: string,
    note: string,
    createdAt: string,
    updatedAt: string,
    clientData: clientProjectsDataType
}

export type newClientDataType = Omit<clientPersonalDataType, 'createdAt' | 'updatedAt' | 'id'>;



export type clientDataType = { 
    clientData: clientPersonalDataType,
    clientId: number
    createdAt: string
    id: number
    updatedAt: string
    userId: number
}


//clientProjectsDataType
export type clientPersonalDataServiceType = Omit<clientProjectsDataType, "updatedAt" | "createdAt">