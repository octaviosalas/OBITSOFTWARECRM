import {useState} from "react"
import SpinnerComponent from "../Spinner/Spinner"
import apiBackendUrl from "../../lib/axiosData"
import { shootSuccesToast } from "../../utils/succesToastFunction"
import { useNavigate } from 'react-router-dom'
import handleError from "../../utils/axiosErrorHanlder"

type tokenNumber = { 
    tokenNumber: number
}

const Token = () => { 

    const [tokenValue, setTokenValue] = useState<number>()
    const [load, setLoad] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleChangeToken = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setTokenValue(Number(e.target.value))
    }

    const sendToken = async () => { 
        setLoad(true)
        const tokenData : tokenNumber = ({ 
            tokenNumber: Number(tokenValue)
        })
        console.log(tokenData)
        try {
            const {data, status} = await apiBackendUrl.post("/user/validateToken", tokenData)
            if(status === 200) { 
                shootSuccesToast(data)
                navigate("/recoverPassword")
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
                                    <h2 className="p-6">Escribe el Token recibido en el correo</h2>                         
                                    </div>             
                                    <form className="login-form" >
                                        <div className="form-group">
                                            <label htmlFor="email">Token</label>
                                            <input type="number" required onChange={handleChangeToken}/>
                                        </div>
                                        {!load ? 
                                            <div>
                                                <button className="submit-button" onClick={() => sendToken()}>Validar</button>
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

export default Token