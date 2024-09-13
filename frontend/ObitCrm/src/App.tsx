
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
import { userStore } from './store/UserAccount';
import { Navigate } from 'react-router-dom';

function App() {

  const location = useLocation(); 

  const noNavbarRoutes = ['/', '/register'];
  const {user} = userStore()


  return (
    <div className='h-screen w-screen'>
           {!noNavbarRoutes.includes(location.pathname) && <Navbar />}

       <Routes>       
          <Route path="/" element={!user? <Navigate to="/" replace /> : <Login />} />   
          <Route path="/Login" element={<Login />} />    
          <Route path="/MainClient" element={<MainClient />} />      
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

