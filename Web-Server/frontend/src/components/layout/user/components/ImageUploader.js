import React, { useState } from "react";
import "./imageuploader.css";
import ImageEditorRc from "react-cropper-image-editor";
import "cropperjs/dist/cropper.css";

const ImageUploader = () => {
  const [image, setImage] = useState();
  const [imageoriginal, setImageOriginal] = useState();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(true);
  const [counter, setCounter] = useState(1);

  const handleChange = event => {
    setImage(URL.createObjectURL(event.target.files[0]));
    setImageOriginal(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
  };
  const uploadImage = async e => {
    console.log("e", e);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "book-alike");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/perninio/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    console.log(file.secure_url);
  };

  const editClick = () => {
    if (counter % 2) {
      setCounter(counter + 1);
      setEdit(false);
    } else {
      setCounter(counter + 1);
      setEdit(true);
    }
  };
  const saveedits = e => {
    setImage(e);
    setEdit(true);
    setCounter(counter + 1);
  };
  return (
    <div>
      <h3>Aktualizuj zdjęcie profilowe</h3>
      <div className="image-preview">
        {loading ? (
          <h3>Loading...</h3>
        ) : edit ? (
          <img className="image-uploader-img" src={image} />
        ) : (
          <ImageEditorRc
            crossOrigin="true" // boolean, set it to true if your image is cors protected or it is hosted on cloud like aws s3 image server
            src={imageoriginal}
            aspectRatio={16 / 16}
            className={"Cropper"}
            guides={true}
            rotatable={true}
            imageName="image name with extension to download"
            saveImage={saveedits} // it has to catch the returned data and do it whatever you want
            responseType="blob/base64"
            guides={true}
          />
        )}
      </div>
      <input
        type="file"
        name="file"
        placeholder="Dodaj zdjęcie"
        onChange={handleChange}
      />
      <button onClick={editClick}>Tryb edycji</button>
      <div>
        <button
          onClick={e => {
            uploadImage(e);
          }}
        >
          Udostępnij
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
