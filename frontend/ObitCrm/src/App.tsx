
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
 
          <Route path="/" element={<MainClient />} />      
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