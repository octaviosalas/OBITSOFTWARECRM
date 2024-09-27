import { useState } from "react"
import axios from "axios"

const UseUserProfileImage = () => { 

    const [image, setImage] = useState("")
    const [loadImage, setLoadImage] = useState<boolean>(false)

    const sendImage = (files : any) => {
        console.log("FILES", files)
        setLoadImage(true)
          const uploaders = files.map((file: any) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('tags', `codeinfuse, medium, gist`);
            formData.append('upload_preset', 'App-Cars');
            formData.append('api_key', '687985773113572');
           
            return axios
              .post('https://api.cloudinary.com/v1_1/dgheotuij/image/upload', formData, {
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
              })
              .then((res) => {
                const data = res.data;
                const fileURL = data.secure_url;
                console.log(fileURL);
                setImage(fileURL)
                setLoadImage(false)
              });
          });
          return uploaders
    };

    return {sendImage, image, loadImage}
}

export default UseUserProfileImage