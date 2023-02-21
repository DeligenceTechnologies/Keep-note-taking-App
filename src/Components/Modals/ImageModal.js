import ReactDOM from "react-dom";
import React from "react";
import classes from "./Modals.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};
const ModalOverlay = (props) => {
  return (
    <div className={`${classes.Card} ${classes.modal}`}>
      <div className={classes.content}>
        <img src={props.content[props.image]} alt="firebase-uploaad-expand" />
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

const ImageModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
        content={props.content}
          image={props.image}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};
//import ListCom from "../List/ListCom";
export default ImageModal;
