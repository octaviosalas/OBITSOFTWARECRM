import { toast } from 'react-toastify';

export const shootSuccesToast = (data: string) => { 
    toast.success(data, {
        style: { backgroundColor: 'white', color: 'blue' },
        pauseOnHover: false,
        autoClose: 2500
    });
}