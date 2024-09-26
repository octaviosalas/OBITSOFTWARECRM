
import './App.css'
import MainClient from './components/ClientsModule/MainClient'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useLocation  } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Register from './components/register/Register';
import ProjectMainDetail from './components/proyect/ProjectMainDetail';
import ProjectMain from './components/proyect/MainProject/ProjectMain';
import MainServices from './components/servicesModule/MainServices';
import MainfollowsUp from './components/FollowsUp/MainFollowsUp';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import Token from './components/forgotPassword/Token';
import ChatComponent from './components/Chat/Chat';
import MainTeam from './components/Chat/Team';
import { userStore } from './store/UserAccount';
import { Navigate } from 'react-router-dom';
import MainUsers from './components/users/MainUsers';
import MainMyProfile from './components/MyProfile/MainMyProfile';

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
          <Route path="/followsUp" element={<MainfollowsUp />} />   
          <Route path="/token" element={<Token />} />   
          <Route path="/forgot-password" element={<ForgotPassword />} />   
          <Route path="/chat/:userAccountId/:userId" element={<ChatComponent />} />   
          <Route path="users" element={<MainUsers />} />   
          <Route path="obitUsersTeam" element={<MainTeam />} />   
          <Route path="myProfile" element={<MainMyProfile />} />   

        </Routes>
    <ToastContainer />
  </div>
    
  )
}

export default App

