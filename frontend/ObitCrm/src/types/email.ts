import { UserTypeData } from "./User"

export type emailTypeData = { 
      emailTitle: string,
      emailMessage: string,
      destinationEmail: string,
      emailDate: string,
}
export type historicEmailType = { 
      clientId: number
      createdAt: string
      destinationEmail: string
      emailDate: string
      emailMessage: string
      emailTitle: string
      id: number
      updatedAt: string
      userId: number
      userData: UserTypeData,
}
