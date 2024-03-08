import { uploadImage } from "../../store/apps/upload"
import { notifyWarn } from "../components/toasts/notifyWarn"

export const handleInputImageChange = (e, setPreviewUrl, setSelectedImage,setImageLinkPayload ) => {
    const fileInput = e.target

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0]

      const fileSize = file.size / 1024 / 1024 // in MB

      if (fileSize > 5) {
        notifyWarn('FILE ERROR', 'file size cannot exceed 5Mb')

        return
      }

      if (file.type.startsWith('image/')) {
        const fileUrl = URL.createObjectURL(file)
        // console.log(fileUrl, 'file url')

        const formData = new FormData();
        formData.append("picture", file);


        uploadImage(formData).then((res)=>{
          if (res) {
            setPreviewUrl(fileUrl)
            setSelectedImage(file)
            setImageLinkPayload(res.url)
            
          } 
        })
      } else {
        notifyWarn('FILE ERROR', 'Selected file is not an image.')
        setPreviewUrl(null)
      }
    } else {
      notifyWarn('FILE ERROR', 'No file selected.')
      setSelectedImage(null)
      setPreviewUrl(null)
    }
  }