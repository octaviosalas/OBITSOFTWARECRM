export type UserTypeData = { 
    id: number,
    name: string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string
}

export type userLoginType = Omit<UserTypeData, 'id' | 'name' | 'createdAt' | 'updatedAt'>;
