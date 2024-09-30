
import { create } from "zustand";
import { UserTypeData } from "../types/User";
import { notificationsType } from "../types/User";
import { userAlertsType } from "../types/Alerts";
import { io, Socket } from "socket.io-client";

type UserAccountStore = { 
    user: UserTypeData | null;
    setUserAccountData: (data: UserTypeData | null) => void;
    userNotifications: notificationsType[] | [];
    updateNotifications: (data: notificationsType[] | []) => void;
    markNotificationAsRead: (id: number) => void; 
    userAlerts: userAlertsType[] | [];
    setUserAlertsData: (data: userAlertsType[] | []) => void;
    socket: Socket | null;
    connectSocket: (userId: string) => void;
    disconnectSocket: () => void;
};

export const userStore = create<UserAccountStore>((set) => {

    const initialUser = JSON.parse(localStorage.getItem('user') || 'null');
    const initialNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const initialAlerts = JSON.parse(localStorage.getItem('userAlerts') || '[]');

    return {
        user: initialUser,
        userNotifications: initialNotifications,
        userAlerts: initialAlerts,
        socket: null,

        setUserAccountData: (data: UserTypeData | null) => {
            set({ user: data });
            localStorage.setItem('user', JSON.stringify(data));
        },

        setUserAlertsData: (data: userAlertsType[] | []) => {
            set({ userAlerts: data });
            localStorage.setItem('userAlerts', JSON.stringify(data));
        },

        updateNotifications: (data: notificationsType[] | []) => { 
            set({ userNotifications: data });
            localStorage.setItem('notifications', JSON.stringify(data));
            console.log("updateNotifications", data);
        },

        markNotificationAsRead: (id: number) => {
            set((state) => {
                const updatedNotifications = state.userNotifications.filter(
                    (notification: notificationsType) => notification.id !== id
                );

                localStorage.setItem('notifications', JSON.stringify(updatedNotifications));

                return { userNotifications: updatedNotifications };
            });
        },
    
        connectSocket: (userId: string) => {
            const socket = io("http://localhost:4000");
            socket.emit("connection", { userId });
            set({ socket });
        },
        
        disconnectSocket: () => {
            set((state) => {
              if (state.socket) {
                state.socket.emit("disconnect");
                state.socket.disconnect();
              }
              return { socket: null };
            });
        }
    
    };
});