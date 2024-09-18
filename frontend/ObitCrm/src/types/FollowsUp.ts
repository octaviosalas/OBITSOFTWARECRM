import { clientPersonalDataType } from "./Clients"

export type userFollowsUpType = { 
   clientData: clientPersonalDataType,
   clientId: number,
   contactDate:string
   createdAt:string
   id:3
   nextContactDate: string
   note:string
   updatedAt:string
   userId:1
}

export type newFollowUpType = { 
   contactDate:string
   nextContactDate: string
   note:string
}