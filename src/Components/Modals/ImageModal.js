import ReactDOM from "react-dom";
import React from "react";
import classes from "./Modals.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { CloseButton } from "react-bootstrap";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};
const ModalOverlay = (props) => {
  return (
    <div className={`${classes.Card} ${classes.imageModal}`}>
    <header className={classes.actions}>
        <button
          className={classes.closebutton}
          onClick={props.onConfirm}
          type="button"
        >
         <CloseButton/>
        </button>
      </header>
      <div className={classes.content}>
        
        <img src={props.image} alt="firebase-uploaad-expand" height="100%" width="100%" />
      </div>
      
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
       image={props.image}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("imageOverlay-root")
      )}
    </React.Fragment>
  );
};
//import ListCom from "../List/ListCom";
export default ImageModal;
