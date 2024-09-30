import { useState } from "react"
import apiBackendUrl from "../../lib/axiosData"
import { userLoginType } from "../../types/User"
import { useNavigate } from "react-router-dom"
import handleError from "../../utils/axiosErrorHanlder"
import { shootSuccesToast } from "../../utils/succesToastFunction"
import SpinnerComponent from "../Spinner/Spinner"
import { userStore } from "../../store/UserAccount"
import "./login.css"
import obitLogo from "../../images/obitLogo.png"

const Login = () => { 

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [load, setLoad] = useState<boolean>(false)
    const navigate = useNavigate()

    const {setUserAccountData, updateNotifications, setUserAlertsData, connectSocket} = userStore()


    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setEmail(e.target.value)
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setPassword(e.target.value)
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        setLoad(true) 
        const userData : userLoginType = ({ 
            email,
            password
        })
        try {
            const {data, status} = await apiBackendUrl.post("/user/loginUserAccount", userData)
            if(status === 200) { 
                 setLoad(false)
                 navigate(`/projects`)
                 setUserAccountData(data.data)
                 updateNotifications(data.notifications)
                 connectSocket(data.data.id)
                 setUserAlertsData(data.dateAlerts)
                 if(data.notifications.length > 0 ) { 
                  const quantityNotifications = data.notifications.length
                    {quantityNotifications === 1 ? 
                      shootSuccesToast(`Tenes ${quantityNotifications} notificacion sin leer`) :  
                      shootSuccesToast(`Tenes ${quantityNotifications} notificaciones sin leer`)
                    }               
                  }
                  if(data.dateAlerts.length > 0) { 
                    shootSuccesToast(`Tenes alertas registradas para hoy`) 
                  }
            }
        } catch (error) {
           setEmail("")
           setPassword("")
           handleError(error, setLoad)   
        }
    }

    return ( 
      <> 
       
        <main className="main-content">
            <div className="form-container">
              <div className="flex items-center justify-center">
                  <img src={obitLogo} className="h-14 w-14"/>
              </div>
              <h2 className="mt-4">Inicio de Sesión</h2>
              <form className="login-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required value={email} onChange={handleChangeEmail}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" name="password" required value={password} onChange={handleChangePassword}/>
                  </div>
                    {!load ? <button type="submit" className="submit-button">Iniciar Sesión</button> : <SpinnerComponent/>}
                  <div className="forgot-password">
                    <a href="/forgot-password" className="link">¿Olvidaste tu contraseña?</a>
                  </div>
                  <div className="register-link">
                    <a href="/register" className="link">¿Aún no tienes cuenta? Regístrate</a>
                  </div>
              </form>
            </div>
      </main>
      </>
    )
}

export default Login

