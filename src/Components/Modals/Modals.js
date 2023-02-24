import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import ListCom from "../List/ListCom";
import classes from "./Modals.module.css";
import { UserContext } from "../Context/AuthContext";
import ImageModal from "./ImageModal";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  const { userId } = UserContext();
  const [imageModal, setImageModal] = useState(false);
  const [image, setImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const contentRef = useRef();
  // var content = props.message;
  const toggleChecked = (id) => {
    const promises = [];
    let updatedItems = props.message.map((item) => {
      if (item.id === id) {
        item.isChecked = !item.isChecked;
      }

      return item;
    });

    promises.push(updatedItems);

    Promise.all(promises).then(() => {
      const note = {
        id: Date.now() + Math.random(),
        title: "",
        content: updatedItems,
      };

      fetch(
        `https://keep-clone-f178f-default-rtdb.firebaseio.com/users/${userId}/notes/${props.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(note),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });
  };

  // console.log(props.id)
  const expandImage = (index) => {
    setImageModal(true);

    setImage((prevState) => (prevState = props.message[index]));
  };
  const closeModal = () => {
    setImageModal(false);
  };

  const contentChangeHandler = () => {
   
    setIsEdit(true);
   
   // content = contentRef.current.value;
  };

  const saveHandler = () => {
    const note = {
      id: props.id,
      title: props.title,
      content: contentRef.current.value,
    };
    fetch(
      `https://keep-clone-f178f-default-rtdb.firebaseio.com/users/${userId}/notes/${props.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(()=>{
      props.onConfirm()
    })
  };

  const deleteHandler = (index) => {
    fetch(
      `https://keep-clone-f178f-default-rtdb.firebaseio.com/users/${userId}/notes/${props.id}/content/${index}.json`,
      {
        method: "DELETE",
      }
    );
  };
  //console.log(props.description)
  return (
    <>
      {imageModal && (
        <ImageModal image={image} onConfirm={closeModal}></ImageModal>
      )}
      <div className={`${classes.Card} ${classes.modal}`}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          {props.title === "images" && (
            <>
              <div className={classes.images}>
                {props.message.map((message, index) => {
                  if (message !== null) {
                    return (
                      <div key={index} className={classes.image}>
                        <img
                          onClick={() => expandImage(index)}
                          id={index}
                          src={message}
                          height="200px"
                          width="250px"
                          alt="upload"
                        />
                        <button onClick={() => deleteHandler(index)}>
                          delete image
                        </button>
                      </div>
                    );
                  }
                })}
              </div>
              <br />
              <br />
              <p>{props.description}</p>
            </>
          )}
          {props.title !== "" && props.title !== "images" && (
            <textarea
              ref={contentRef}
              onChange={contentChangeHandler}
              className={classes.message}
               defaultValue={props.message}
            ></textarea>
          )}
          {props.title === "" && (
            <ol className={classes.list}>
              {props.message.map((item) => {
                return (
                  <ListCom
                    key={item.id}
                    text={item.text}
                    isChecked={item.isChecked}
                    toggleChecked={() => toggleChecked(item.id)}
                  />
                );
              })}
            </ol>
          )}
        </div>
        <footer className={classes.actions}>
          {isEdit && (
            <button
              className={classes.button}
              onClick={saveHandler}
              type="button"
            >
              Save
            </button>
          )}
          &nbsp;
          <button
            className={classes.button}
            onClick={props.onConfirm}
            type="button"
          >
            Close
          </button>
        </footer>
      </div>
    </>
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          id={props.id}
          title={props.title}
          message={props.message}
          description={props.description}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default Modal;
