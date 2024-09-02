type userSocialNetworksType = { 
    instagram: string,
    facebook: string
}

export type clientPersonalDataType = { 
    id: number,
    name: string,
    phone: string,
    email: string,
    dischargeDate: string | null,
    active: boolean,
    socialNetworks: userSocialNetworksType,
    createdAt: string,
    updatedAt: string
}

type clientProjectsDataType = { 
    id: number,
    name: string,
    startDate: string,
    amount: number,
    client: number,
    createdAt: string,
    updatedAt: string,
    clientData: clientPersonalDataType,
    
}

type clientFollowUpDataType = { 
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

type everyClientsDataType = { 

}