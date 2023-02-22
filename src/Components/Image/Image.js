import React, { useState } from "react";
import Header from "../Header/Header";
import classes from "./Image.module.css";
import { storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UserContext } from "../Context/AuthContext";

function Image() {
  const { userId } = UserContext();
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);

  const [progress, setProgress] = useState(0);
  const navigation = useNavigate();

  const backHandler=()=>{
    navigation("/home")
  }

  const onSelectFile = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setSelectedImages((prevState) => [...prevState, newImage]);
    }
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setPreviewImage((previousImages) => previousImages.concat(imagesArray));
  };

  function deleteHandler(image) {
    setPreviewImage(previewImage.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  return (
    <div>
      <Header></Header>
      <section className={classes.ImageSection}>
      <button onClick={backHandler} className={classes.backIcon}>
    <ArrowBackIcon/>
    </button>
    <br/>
    <br/>
        <progress value={progress} max="100" />

        <label className={classes.ImageLabel}>
          + Add Images
          <br />
          <span>up to 10 images</span>
          <input
            style={{ display: "none" }}
            type="file"
            name="images"
            onChange={onSelectFile}
            multiple
            accept="image/*"
          />
        </label>
        <br />
        {previewImage.length > 0 &&
          (previewImage.length > 10 ? (
            <p className={classes.error}>
              You can't upload more than 10 images! <br />
              <span>
                please delete <b> {previewImage.length - 10} </b> of them{" "}
              </span>
            </p>
          ) : (
            <button
              className={classes["upload-btn"]}
              onClick={() => {
                const promises = [];
                let content = [];
                selectedImages.map((image) => {
                  const storageRef = ref(
                    storage,
                    `${userId}/images/${image.name}`
                  );
                  const uploadTask = uploadBytesResumable(storageRef, image);
                  promises.push(uploadTask);

                  uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                      const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                      );
                      setProgress(progress);
                    },
                    (error) => {
                      console.log(error);
                    },
                    async function url() {
                      await getDownloadURL(uploadTask.snapshot.ref).then(
                        (urls) => {
                          content.push(urls);
                        }
                      );
                      promises.push(url);
                    }
                  );
                });

                Promise.all(promises)
                  .then(() => {
                    console.log(content);

                    let note = {
                      id: Date.now() + Math.random(),
                      title: "images",
                      content: content,
                    };
                    console.log(note.content);
                    fetch(
                      `https://keep-clone-f178f-default-rtdb.firebaseio.com/users/${userId}/notes/.json`,
                      {
                        method: "POST",
                        body: JSON.stringify(note),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    alert("All images uploaded");
                    navigation("/home");
                  })
                  .catch((err) => console.log(err));
              }}
            >
              UPLOAD {previewImage.length} IMAGE
              {previewImage.length === 1 ? "" : "S"}
            </button>
          ))}
        <div className={classes.images}>
          {previewImage &&
            previewImage.map((image) => {
              return (
                <div key={image} className={classes.image}>
                  <img src={image} height="200" alt="upload" />
                  <button onClick={() => deleteHandler(image)}>
                    delete image
                  </button>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
}

export default Image;
