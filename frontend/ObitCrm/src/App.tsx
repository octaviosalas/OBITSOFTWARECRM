
import './App.css'
import MainClient from './components/ClientsModule/MainClient'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Importa los estilos CSS aquí
import { Routes, Route, useLocation  } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Register from './components/register/Register';
import ProjectMainDetail from './components/proyect/ProjectMainDetail';
import ProjectMain from './components/proyect/MainProject/ProjectMain';
import MainServices from './components/servicesModule/MainServices';

function App() {

  const location = useLocation(); 

  const noNavbarRoutes = ['/login', '/register'];

  return (
    <div className='h-screen w-screen'>
           {!noNavbarRoutes.includes(location.pathname) && <Navbar />}

       <Routes>       
          <Route path="/" element={<MainClient />} />    
          <Route path="/login" element={<Login />} />      
          <Route path="/register" element={<Register />} />   
          <Route path="/projects" element={<ProjectMain />} />   
          <Route path="/projectDetail/:projectId" element={<ProjectMainDetail />} />   
          <Route path="/services" element={<MainServices />} />   

        </Routes>
    <ToastContainer />
  </div>
    
  )
}

export default App


/* 

import './App.css'
import MainClient from './components/ClientsModule/MainClient'
import { ToastContainer } from 'react-toastify';
import { Routes, Route, Navigate } from 'react-router-dom';
import { userStore } from './store/UserAccount';

function App() {

  const {user} = userStore()

  return (
    <div className='h-screen w-screen'>
    <Routes>       
      <Route path="/" element={!user? <Navigate to="/login" replace /> : <MainApp />} />   
        <Route path="/register" element={<Register />} />   
        <Route path="/login" element={<Login />} />   
        <Route path="/token" element={<Token />} />   
      </Routes>
    <ToastContainer />
  </div>
    
  )
}

export default App

*/