import React, { useState } from 'react';
import "./navbar.css"
import obitLogo from "../../images/obitLogo.png"
import notification from "../../images/notification.png"
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { userStore } from '../../store/UserAccount';
import { notificationsType } from '../../types/User';
import { useNavigate } from 'react-router-dom';
import apiBackendUrl from '../../lib/axiosData';
import { shootErrorToast } from '../../utils/succesToastFunction';

const Navbar: React.FC = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const PROJECT_URL = import.meta.env.VITE_PROJECT_URL;

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const navigate = useNavigate()
    const {userNotifications, markNotificationAsRead} = userStore()

    const markNotificationAsReadIntoDataBase = async (notificationId: number) => { 
        try {
            const {data, status} = await apiBackendUrl.put(`/user/updateNotificationAsRead/${notificationId}`)
            if(status === 200) { 
               console.log("Marcada como leida")
               console.log(data)
            }
        } catch (error) {
            shootErrorToast("Ocurrio un error al querer marcar la notificacion como leida")
        }
    }

    const redirectProjectNotification = (projectId: number, notificationId: number) => { 
        navigate(`/projectDetail/${projectId}`)
        markNotificationAsRead(notificationId)
        markNotificationAsReadIntoDataBase(notificationId)
    }

    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="flex navbar-logo">
                    <img className="h-6 w-24" src={obitLogo}/>
                </div>
                <nav className="navbar-menu">
                    <button className="menu-toggle" aria-label="Open menu" onClick={toggleMenu}>
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M5 5v1.5h14V5H5zm0 7.8h14v-1.5H5v1.5zM5 19h14v-1.5H5V19z"></path>
                        </svg>
                    </button>
                    <ul className={`menu ${menuOpen ? 'open' : ''}`}>
                        <li><a href={`${PROJECT_URL}/`}>Clientes</a></li>
                        <li><a >Seguimientos</a></li>
                        <li><a href={`${PROJECT_URL}/projects`}>Proyectos</a></li>
                        <li><a >Servicios</a></li>
                        <li><a onClick={() => console.log(userNotifications)}>Mi equipo</a></li>
                    </ul>
                    <button className="profile-button"><a href={`${PROJECT_URL}/`}>Mi perfil</a></button>
                    <Dropdown>
                        <DropdownTrigger>
                            <img className="h-6 w-6" src={notification}/>
                        </DropdownTrigger>                  
                        <DropdownMenu aria-label="Static Actions" className="w-72">
                            {userNotifications.map((not: notificationsType) => (
                                <DropdownItem key={not.id} className="w-72 break-words" onClick={() => redirectProjectNotification(not.projectId, not.id)}>
                                   {not.message}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
