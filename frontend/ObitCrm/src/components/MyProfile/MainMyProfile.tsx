import "./myProfileStyle.css"
import { userStore } from "../../store/UserAccount"
import { useEffect, useState, useCallback  } from "react"
import Dropzone from 'react-dropzone';
import { PhotoIcon } from '@heroicons/react/24/solid'
import UseUserProfileImage from "../../hooks/UseUserProfileImage";
import apiBackendUrl from "../../lib/axiosData";
import { userDataUpdatedType, userDataUpdatedWithPassType } from "../../types/User";
import { shootErrorToast, shootSuccesToast } from "../../utils/succesToastFunction";
import handleError from "../../utils/axiosErrorHanlder";
import SpinnerComponent from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";

const MainMyProfile = () => {

  const {user} = userStore()
  const [userName, setUserName] = useState<string | undefined>("")
  const [userEmail, setUserEmail] = useState<string | undefined>("")
  const [userProfileImage, setUserProfileImage] = useState<string | null>("")
  const [userPassword, setUserPassword] = useState<string | undefined>("")
  const [lastUserPassword, setLastUserPassword] = useState<string | undefined>("")
  const [load, setLoad] = useState<boolean>(false)
  const [waitingUserData, setWaitingUserData] = useState<boolean>(false)
  const [passwordChanged, setPasswordChanged] = useState<boolean>(false)
  const [passwordRepeated, setPasswordRepeated] = useState<string | undefined>("")
  const [wannaChangeImage, setWanaChangeImage] = useState<boolean>(false)

  const {sendImage, image, loadImage} = UseUserProfileImage()
  const navigate = useNavigate()

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => { 
      setUserName(e.target.value)
  }

  const handleChangeUserEmail= (e: React.ChangeEvent<HTMLInputElement>) => { 
    setUserEmail(e.target.value)
  }

  const handleChangeUserPassword = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setUserPassword(e.target.value)
  }

  const handleChangeUserPasswordRepeated = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setPasswordRepeated(e.target.value)
  }

  const getUserData = useCallback(async () => {
    console.log("ejecutando useCallback")
    setWaitingUserData(true);
    try {
      const { data, status } = await apiBackendUrl.get(`/user/userData/${user?.id}`);
      if (status === 200) { 
        console.log(data);
        setUserName(data.name);
        setUserEmail(data.email);
        setUserProfileImage(data.profileImage);
        setUserPassword(data.password)
        setLastUserPassword(data.password)
        setWaitingUserData(false);
      }
    } catch (error) {
      handleError(error, setWaitingUserData);
    }
  }, [user?.id]); 

  useEffect(() => { 
      if(userPassword !== lastUserPassword) { 
        setPasswordChanged(true)
      } else { 
        setPasswordChanged(false)
      }
  }, [userPassword])

  useEffect(() => { 
    getUserData();
  }, [getUserData]);


  const changeMyData = async () => {
    console.log("changeMyData")
    setLoad(true) 
    const userDataUpdated : userDataUpdatedType = ({ 
      name: userName,
      email: userEmail,
      profileImage: image ? image : userProfileImage,
      password: userPassword
    })
    try {
      const {data, status} = await apiBackendUrl.put(`/user/updateUsertData/${user?.id}`, userDataUpdated)
      if(status === 200) { 
        console.log(data)
        shootSuccesToast(data)
        setLoad(false)
        getUserData()
        setPasswordChanged(false)
        setPasswordRepeated("")
      }
    } catch (error) {
       setPasswordRepeated("")
       handleError(error, setLoad)
    }
  }

  const changeMyDataWithNewPassword = async () => {
    console.log("changeMyDataWithNewPassword")
    setLoad(true) 
    const userDataUpdated : userDataUpdatedWithPassType = ({ 
      name: userName,
      email: userEmail,
      profileImage: image ? image : userProfileImage,
      password: userPassword,
      passwordConfirmation: passwordRepeated
    })
    try {
      const {data, status} = await apiBackendUrl.put(`/user/updateUsertDataWithPassword/${user?.id}`, userDataUpdated)
      if(status === 200) { 
        console.log(data)
        shootSuccesToast(data)
        setLoad(false)
        getUserData()
        setPasswordChanged(false)
        setPasswordRepeated("")
      }
    } catch (error) {
       setPasswordRepeated("")
       handleError(error, setLoad)
    }
  }


  return (
    <div className='flex items-center justify-center mt-6'>
        <div className="mi-perfil-container">
            <h2 className="mi-perfil-title">Mi Perfil</h2>
           <form id="profile-form" className="mi-perfil-form">
             <div className="flex items-center justify-center">
              {!loadImage ? 
                    <Dropzone onDrop={(acceptedFiles) => {
                            sendImage(acceptedFiles);  
                           }}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} />
                                        <div className=" flex justify-center rounded-2xl border w-40 h-40 border-gray-900/25 px-2 py-2" style={{ backgroundImage: `url(${image ? image : userProfileImage})`, backgroundSize: 'cover' }}>
                                          <div className="text-center">
                                              {wannaChangeImage && userProfileImage === null ? 
                                              <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> : 
                                              null}
                                              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-green-800 focus-within:outline-none  "
                                                    >
                                    
                                                    {wannaChangeImage && userProfileImage === null ? 
                                                                      <span>Sube una foto</span> : 
                                                    null}
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="flex items-center justify-center">
                                         <p className="cursor-pointer underline" style={{color: "#4682b4"}}>Cambiar imagen</p>
                                      </div>
                                  </div> )}
                  </Dropzone> : <SpinnerComponent/>}

            </div>
            <div className="mi-perfil-form-group">
              <label htmlFor="firstName" className="mi-perfil-label">Nombre:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Ingrese su nombre"
                required
                className="mi-perfil-input"
                value={userName}
                onChange={handleChangeUserName}
              />
            </div>

            <div className="mi-perfil-form-group">
              <label htmlFor="username" className="mi-perfil-label">Email</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Ingrese su nombre de usuario"
                required
                className="mi-perfil-input"
                value={userEmail}
                onChange={handleChangeUserEmail}
              />
            </div>

            <div className="mi-perfil-form-group">
              <label htmlFor="password" className="mi-perfil-label">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Ingrese su nueva contraseña"
                required
                className="mi-perfil-input"
                value={userPassword}
                onChange={handleChangeUserPassword}
              />
            </div>

             {!load ? 
             <div className="flex flex-col items-center jsutify-center "> 

              {!passwordChanged ? <button type="submit" className="mi-perfil-submit-button" onClick={() => changeMyData()}> Guardar Cambios </button> : 
                  <div className="mi-perfil-form-group">
                    <label htmlFor="password" className="mi-perfil-label">Repite la nueva contraseña</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Ingrese su nueva contraseña"
                        required
                        className="mi-perfil-input"
                        value={passwordRepeated}
                        onChange={handleChangeUserPasswordRepeated}
                      />
              </div>
              }
          
              {!passwordChanged ? 
                <button className="mi-perfil-back-button" onClick={() => navigate("/projects")}> 
                  Volver 
                </button> : 
                <button type="submit" className="mi-perfil-submit-button" onClick={() => changeMyDataWithNewPassword()}>
                  Guardar Cambios 
                </button>}
              </div> : 
              <SpinnerComponent/>
              }

          </form>

        </div>
    </div>
  
  )
}

export default MainMyProfile