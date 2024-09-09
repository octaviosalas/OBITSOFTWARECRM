//saber si tiene proximo llamado a algun cliente hoy
//saber si hay alguna notificacion hoy

import { useState } from "react"
import apiBackendUrl from "../../lib/axiosData"
import { userLoginType } from "../../types/User"
import { useNavigate } from "react-router-dom"
import handleError from "../../utils/axiosErrorHanlder"
import { shootSuccesToast } from "../../utils/succesToastFunction"
import SpinnerComponent from "../Spinner/Spinner"
import { userStore } from "../../store/UserAccount"
import "./login.css"

const Login = () => { 

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [load, setLoad] = useState<boolean>(false)
    const navigate = useNavigate()

    const {setUserAccountData} = userStore()


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
                 console.log(data)
                 setLoad(false)
                 shootSuccesToast(data.message)
                 navigate(`/projects`)
                 setUserAccountData(data.data)
            }
        } catch (error) {
           setEmail("")
           setPassword("")
           handleError(error, setLoad)   
        }
    }

    return ( 
        <main className="main-content">
        <div className="form-container">
          <h2>Inicio de Sesión</h2>
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
    )
}

export default Login

