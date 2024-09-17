import { create } from "zustand";
import { UserTypeData } from "../types/User";
import { notificationsType } from "../types/User";
import { userAlertsType } from "../types/Alerts";

type UserAccountStore = { 
    user: UserTypeData | null;
    setUserAccountData: (data: UserTypeData | null) => void;
    userNotifications: notificationsType[] | [];
    updateNotifications: (data: notificationsType[] | []) => void;
    markNotificationAsRead: (id: number) => void; 
    userAlerts: userAlertsType[] | [];
    setUserAlertsData: (data: userAlertsType[] | []) => void;
};

export const userStore = create<UserAccountStore>((set) => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),

    setUserAccountData: (data: UserTypeData | null) => {
        set({ user: data });
        localStorage.setItem('user', JSON.stringify(data));
    },

    setUserAlertsData: (data: userAlertsType[] | []) => {
        set({ userAlerts: data });
        localStorage.setItem('userAlerts', JSON.stringify(data));
    },

    userNotifications: [],

    userAlerts: [],

    updateNotifications: (data: notificationsType[] | []) => { 
        set({userNotifications: data})
        localStorage.setItem('notifications', JSON.stringify(data));
    },

    markNotificationAsRead: (id: number) => {
        set((state) => {
            const updatedNotifications = state.userNotifications.filter(
                (notification : notificationsType) => notification.id !== id
            );

            localStorage.setItem('notifications', JSON.stringify(updatedNotifications));

            return { userNotifications: updatedNotifications };
        });
    }

}));