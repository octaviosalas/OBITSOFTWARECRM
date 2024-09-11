import { create } from "zustand";
import { UserTypeData } from "../types/User";
import { notificationsType } from "../types/User";

type UserAccountStore = { 
    user: UserTypeData | null;
    setUserAccountData: (data: UserTypeData | null) => void;
    userNotifications: notificationsType[] | [];
    updateNotifications: (data: notificationsType[] | []) => void;
    markNotificationAsRead: (id: number) => void; 

};

export const userStore = create<UserAccountStore>((set) => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),

    setUserAccountData: (data: UserTypeData | null) => {
        set({ user: data });
        localStorage.setItem('user', JSON.stringify(data));
    },

    userNotifications: [],

    updateNotifications: (data: notificationsType[] | []) => { 
        console.log("Estas son las notificaciones que recibio el store para setearlas", data)
        set({userNotifications: data})
        localStorage.setItem('notifications', JSON.stringify(data));
    },

    markNotificationAsRead: (id: number) => {
        console.log("Me llego este id para eliminar del store de notifiaciones1", id)
        set((state) => {
            const updatedNotifications = state.userNotifications.filter(
                (notification : notificationsType) => notification.id !== id
            );

            localStorage.setItem('notifications', JSON.stringify(updatedNotifications));

            return { userNotifications: updatedNotifications };
        });
    }

}));