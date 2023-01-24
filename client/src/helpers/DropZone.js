import { useDropzone } from 'react-dropzone'
import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

const DropZone = ({ formFields, setFormFields  }) => {

  const [ files, setFiles ] = useState([])

  const onDrop = useCallback(files => setFiles(files), [setFiles])

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } = useDropzone({ onDrop })

  // const fileInput = acceptedFiles.map((file) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ))

  useEffect(() => {
    const getFiles = async () => {
      if (files.length > 0)
        try {
          const formData = new FormData()
          // Appends the file information of the file to be uploaded
          formData.append('file', files[0])
          // Appends the upload preset information
          formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
          // Sends the file data to the cloudinary serve
          const { data } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData)
          console.log('DATA', data)
          setFormFields({ ...formFields, profile_image: data.secure_url })
        } catch (err) {
          console.log(err)
        }
    }
    getFiles()
  }, [files])

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input className="profile-image-input" {...getInputProps()} />
      <div className="profile-image-input">
        <div className="thumbsContainer">
          <img
            className="thumb-img"
            src={formFields.profile_image}
            alt="user input"
            // Revoke data uri after image is loaded
            onLoad={() => { 
              URL.revokeObjectURL(formFields.profile_image) 
            } }
          />
        </div>
        { isDragActive ? 
          <p className="dropzone-content">
          Release to drop the files here</p>
          :
          <p className="dropzone-content">
            Drag and drop image here, or click here to select image
          </p>
        }
      </div>
    </div>  
  )
}

export default DropZone