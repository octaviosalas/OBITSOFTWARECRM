import axios from 'axios';
import { toast } from 'react-toastify';
import { errorType } from '../types/Errors';
import { shootErrorToast } from './succesToastFunction';

const handleError = (error: unknown, setLoad: (value: boolean) => void) => {
  setLoad(false);
  console.log("error recibido en el hanlder", error)
  if (axios.isAxiosError(error)) {
    console.log("axios.isAxiosError(error)")
        if (error.response && Array.isArray(error.response.data.errors)) {  
            console.log("error.response && Array.isArray(error.response.data.errors)")            
            const errorMessage = error.response.data.errors.map((er: errorType) => er.msg)[0]
            shootErrorToast(errorMessage)
        setLoad(false)
    }  if (error.response && !Array.isArray(error.response)) {
        console.log(error.response.data)       
        shootErrorToast(error.response.data)
        setLoad(false);
  } else { 
    console.log('Unexpected error:', error);
    setLoad(false)
  }
  } else {
    console.log('Unexpected error:', error);
  }
  setLoad(false);
};

export default handleError;
