import React from "react";
import ReactDOM from "react-dom";

import classes from "./Modals.module.css";
import { UserContext } from "../Context/AuthContext";
import ImageModal from "./ImageModal";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  const { userId } = UserContext();

  const expandImage = (image) => {
    return <ImageModal content={props.message} image={image} />;
  };

  const deleteHandler = (index) => {
    fetch(
      `https://keep-clone-f178f-default-rtdb.firebaseio.com/users/${userId}/notes/${props.id}/content/${index}.json`,
      {
        method: "DELETE",
      }
    );
  };
  return (
    <div className={`${classes.Card} ${classes.modal}`}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        {props.title === "images" &&
          props.message.map((message, index) => {
            return (
              <div key={index} className={classes.image}>
                <img
                  onClick={expandImage(index)}
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
          })}
        {props.title !== "" && props.title !== "images" && (
          <p className={classes.message}>{props.message}</p>
        )}
        {
          props.title === "" && <p>Marked as done</p>
          //  <ol className={classes.list}>
          //   {props.message.map((val, index) => {
          //     return <ListCom key={index} text={val} />;
          //   })}
          // </ol>
        }
      </div>
      <footer className={classes.actions}>
        <button
          className={classes.button}
          onClick={props.onConfirm}
          type="button"
        >
          Close
        </button>
      </footer>
    </div>
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
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default Modal;
