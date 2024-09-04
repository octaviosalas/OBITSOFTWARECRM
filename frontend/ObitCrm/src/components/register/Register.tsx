import React, { useState } from 'react'
import "./register.css"
import apiBackendUrl from '../../lib/axiosData'
import { newUserTypeData } from '../../types/User'
import { shootSuccesToast } from '../../utils/succesToastFunction'
import { useNavigate } from 'react-router-dom'
import handleError from '../../utils/axiosErrorHanlder'
import SpinnerComponent from '../Spinner/Spinner'

const Register = () => {

  const [load, setLoad] = useState<boolean>()
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [password_confirmation, setPassword_confirmation] = useState<string>("")
  const [rol, setRol] = useState<string>("")

  const navigate = useNavigate()

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setName(e.target.value)
  }

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setEmail(e.target.value)
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setPassword(e.target.value)
  }

  const handleChangePasswordConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setPassword_confirmation(e.target.value)
  }

  const handleChangeRol= (e: React.ChangeEvent<HTMLSelectElement>) => { 
    setRol(e.target.value)
  }
  
  const createUser = async (e: any) => { 
    e.preventDefault()
    setLoad(true)
    const userData : newUserTypeData= ({ 
       name,
       email,
       password,
       password_confirmation,
       rol
    })
    try {
      const {data, status} = await apiBackendUrl.post("/user/createUser", userData)
      if(status === 200) { 
        shootSuccesToast(data)
        navigate("/login")
        setLoad(false)
      }
    } catch (error) {
       handleError(error, setLoad)
    }
  }


  return (
    <body>
      <main className="main-content">
        <div className="form-container">
          <h2>Registro de Cuenta</h2>
          <form className="registration-form" onSubmit={createUser}>
            <div className="form-group">
              <label htmlFor="first-name">Nombre</label>
              <input
                type="text"
                id="first-name"
                name="firstName"
                onChange={handleChangeName}
                value={name}
                required
              />
            </div>
           
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChangeEmail}
                value={email}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChangePassword}
                value={password}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                onChange={handleChangePasswordConfirmation}
                value={password_confirmation}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Rol</label>
              <select
                id="role"
                name="role"
                onChange={handleChangeRol}
                value={rol}
                required
              >
                <option value="" disabled>Selecciona un rol</option>
                <option value="admin">Administrador</option>
                <option value="developer">Desarrollo</option>
                <option value="designer">Diseño</option>
                <option value="sales">Ventas</option>
              </select>
            </div>
            {!load ? <button type="submit" className="submit-button">Registrar</button> : <SpinnerComponent/>}
          </form>
        </div>
      </main>
    </body>
  )
}

export default Register
