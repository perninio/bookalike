import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./imageuploader.css";
import ImageEditorRc from "react-cropper-image-editor";
import "cropperjs/dist/cropper.css";
import { Alert } from "reactstrap";
import { dataserverAPIUserEndpoint } from "../../../../constants/serverEndpoint";

const ImageUploader = () => {
  const [image, setImage] = useState();
  const [imageoriginal, setImageOriginal] = useState();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(true);
  const [counter, setCounter] = useState(1);
  const [info, setInfo] = useState(0);
  const user = useSelector(state => state.auth.user);

  const handleChange = event => {
    setImage(URL.createObjectURL(event.target.files[0]));
    setImageOriginal(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
  };
  const uploadImage = async e => {
    e.preventDefault();
    const files = file;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "book-alike");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/perninio/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    console.log(res);
    const response = await res.json();
    console.log(response.secure_url); //wyświetla się link publiczny do foteczek
    if (response.secure_url != null) {
      let updatedProfile = {
        graphic: response.secure_url
      };
      axios
        .put(dataserverAPIUserEndpoint + "/" + user.id, updatedProfile)
        .then(resp => {
          console.log(resp);
        })
        .catch(err => {
          console.log(err);
        });
      setInfo(1);
    } else {
      setInfo(-1);
    }
    setLoading(false);
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
    <div className="image-uploader">
      <h3>Aktualizuj zdjęcie profilowe</h3>
      {info == 1 ? (
        <Alert color="success">Zdjęcie pomyślnie zaktualizowane</Alert>
      ) : info == -1 ? (
        <Alert color="danger">Wystąpił problem podczas dodawania zdjęcia</Alert>
      ) : null}
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
      <button
        onClick={() => {
          editClick();
          setInfo(0);
        }}
      >
        Tryb edycji
      </button>
      <div>
        <button
          onClick={e => {
            uploadImage(e);
            setInfo(0);
          }}
        >
          Udostępnij
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
