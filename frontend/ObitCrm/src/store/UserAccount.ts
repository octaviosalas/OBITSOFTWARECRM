import { create } from "zustand";
import { UserTypeData } from "../types/User";

type UserAccountStore = { 
    user: UserTypeData | null;
    setUserAccountData: (data: UserTypeData | null) => void;
};

export const userStore = create<UserAccountStore>((set) => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    setUserAccountData: (data: UserTypeData | null) => {
        set({ user: data });
        localStorage.setItem('user', JSON.stringify(data));
    },
}));