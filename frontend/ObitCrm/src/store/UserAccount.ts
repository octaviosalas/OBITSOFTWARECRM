import { UserTypeData } from "../types/User"
import {create} from "zustand"


type userAccountStore = { 
   user: UserTypeData | null,
   setUserAccountData: (data: UserTypeData | null) => void,
}


export const userStore = create<userAccountStore>((set) => ({ 
     user: null,
     setUserAccountData: (data: UserTypeData | null) => set({ user: data }),
}))
