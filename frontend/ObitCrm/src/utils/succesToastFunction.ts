import { toast } from 'react-toastify';

export const shootSuccesToast = (data: string) => { 
    toast.success(data, {
        style: { backgroundColor: 'white', color: 'blue' },
        pauseOnHover: false,
        autoClose: 2500
    });
}

export const shootSuccesWithOutLoginFunction = (data: string) => { 
    toast.error(data, {
        style: { backgroundColor: 'white', color: 'red' },
        pauseOnHover: false,
        autoClose: 2500
    });
}

export const shootErrorToast = (data: string) => { 
    toast.error(data, {
        style: { backgroundColor: 'white', color: 'red' },
        pauseOnHover: false,
        autoClose: 2500
    });
}