import { useCallback, useState } from "react"
import { useEffect } from "react"
import apiBackendUrl from "../../lib/axiosData"
import { userStore } from "../../store/UserAccount"
import handleError from "../../utils/axiosErrorHanlder"
import SpinnerComponent from "../Spinner/Spinner"
import { historicEmailType } from "../../types/email"
import { formateDate } from "../../utils/transformDate"
import "./styles/clientModule.css"

interface Props { 
    clientId: number | undefined
}

const ClientHistoricEmails = ({clientId}: Props) => { 

    const {user} = userStore()
    const [load, setLoad] = useState<boolean>(false)
    const [userEmails, setUserEmails] = useState<historicEmailType[] | []>([])
    const [everyEmails, setEveryEmails] = useState<historicEmailType[] | []>([])

    const getEmails = useCallback(async () => { 
        console.log("getEmails useCallback")
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.get(`/client/historicEmails/${clientId}/${user?.id}`)
            if(status === 200) { 
                console.log(data)
                setEveryEmails(data.everyEmails)
                setUserEmails(data.userEmails)
                setLoad(false)
            }
        } catch (error) {
            handleError(error, setLoad)
        }
    }, [clientId])

    useEffect(() => { 
        getEmails()
    }, [getEmails])

  return ( 
    <div className="trackings">
        {load ? <SpinnerComponent/> :
         <table className="trackings-table">
                <thead >
                    <tr>
                        <th>Fecha</th>
                        <th>Enviado por</th>
                        <th>Mensaje</th>
                    </tr>
                </thead>
                <tbody>
                   {everyEmails.map((em : historicEmailType) => (  
                    <tr key={em.id}>
                        <td>{formateDate(em.emailDate)}</td>
                        <td>{em.userData.name}</td>
                            <td className="border b-2">
                                <div className="flex items-center gap-1">
                                    {em.emailMessage.length > 50
                                        ? `${em.emailMessage.slice(0, 50)}... `
                                        : em.emailMessage}
                                    {em.emailMessage.length > 50 && (
                                        <p>ver..</p>
                                    )}
                                </div>
                            </td>                        
                       
                    </tr>
                   ))}
                </tbody>
           </table>
      }
    </div>
  )
}

export default ClientHistoricEmails