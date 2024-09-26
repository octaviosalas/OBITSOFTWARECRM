import React, { useState } from 'react'
import "./register.css"
import apiBackendUrl from '../../lib/axiosData'
import { newUserTypeData } from '../../types/User'
import { shootSuccesToast } from '../../utils/succesToastFunction'
import { useNavigate } from 'react-router-dom'
import handleError from '../../utils/axiosErrorHanlder'
import SpinnerComponent from '../Spinner/Spinner'
import Dropzone from 'react-dropzone';
import UseUserProfileImage from "../../hooks/UseUserProfileImage";
import { PhotoIcon } from '@heroicons/react/24/solid'

const Register = () => {

  const [load, setLoad] = useState<boolean>()
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [password_confirmation, setPassword_confirmation] = useState<string>("")
  const [rol, setRol] = useState<string>("")
  const {sendImage, image, loadImage} = UseUserProfileImage()

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
       rol,
       profileImage: image
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
      <main className="main-contentt">
        <div className="form-container">
          <h2>Registro de Cuenta</h2>
          <form className="registration-form" onSubmit={createUser}>

          <div className="flex w-full items-center justify-center ">
              <Dropzone onDrop={(acceptedFiles) => {
                            sendImage(acceptedFiles);  
                           }}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} />
                                        <div className="mt-2 flex justify-center rounded-xl border border-gray-900/25 px-2 py-2" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
                                          <div className="text-center">
                                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-green-800 focus-within:outline-none  "
                                                    >
                                                    <span>Sube una foto</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                              </div>
                                          </div>
                                      </div>
                                  </div> )}
                  </Dropzone>
            </div>

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
    
  )
}

export default Register
