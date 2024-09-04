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
