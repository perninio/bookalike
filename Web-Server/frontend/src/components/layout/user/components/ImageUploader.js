import React, { useState } from 'react'
import './imageuploader.css'

const ImageUploader=() => {
  const [image, setImage] = useState()
  const [loading, setLoading] = useState(false)
	
  const viewImage = async e => {
	  const files = e.target.files
	  setImage(e.target.files[0])
	  setLoading(false)
  }
  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'book-alike')
    setLoading(true)
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/perninio/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
	console.log(file.secure_url)
  }

  return (
    <div className="content">
      <h1>Upload Image</h1>
	  	  {loading ? (
        <h3>Loading...</h3>
      ) : (
        <img src={image} style={{ width: '300px' }} />
      )}
      <input
        type="file"
        name="file"
        placeholder="Dodaj zdjęcie"
		onChange={viewImage}
      />
	  <div>
	  <button onChange={uploadImage}>Udostępnij</button>
      </div>
    </div>
  )
}

export default ImageUploader