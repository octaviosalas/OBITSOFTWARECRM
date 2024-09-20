import React, { useState } from 'react'
import "../login/login.css"
import apiBackendUrl from '../../lib/axiosData'
import { shootSuccesToast } from '../../utils/succesToastFunction'
import { useNavigate } from 'react-router-dom'
import handleError from '../../utils/axiosErrorHanlder'
import SpinnerComponent from '../Spinner/Spinner'

type userEmailType = { 
    email: string
}

const ForgotPassword = () => {

    const [load, setLoad] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const navigate = useNavigate()

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setEmail(e.target.value)
    }

    const sendEmail = async () => { 
        setLoad(true)
        const userEmail : userEmailType = ({ 
            email: email
        })
        try {
            const {data, status} = await apiBackendUrl.post("/user/missedPassword", userEmail)
            if(status === 200) { 
                shootSuccesToast(data)
                navigate("/token")
                setLoad(false)
            }
        } catch (error) {
            handleError(error, setLoad)
        }
    }

  return (
    <div>
        <main className="main-content">
                    <div className="form-container">     
                        <div className='flex items-center justify-center'>
                           <h2 className="p-6">Recuperacion de Contraseña</h2>                         
                        </div>             
                        <form className="login-form" >
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required onChange={handleChangeEmail}/>
                            </div>
                            {!load ? 
                                <div>
                                    <button className="submit-button" onClick={() => sendEmail()}>Recibir Token</button>
                                </div> 
                                :
                                <div>
                                    <SpinnerComponent/>
                                </div>
                            }                   
                        </form>
                    </div>
            </main>
    </div>
  )
}

export default ForgotPassword