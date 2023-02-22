import React, { useState, useRef } from "react";
import classes from "./Notes.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import Modal from "../Modals/Modals";
import CollectionsIcon from '@mui/icons-material/Collections';
import { UserContext } from "../Context/AuthContext";
import ListCom from "../List/ListCom";

function Note(props) {
  const [isClicked, setIsClicked] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const { userId } = UserContext();
 
  const data = useRef(null);
  data.current = isClicked;

  // const toShow = props.content.substring(0, 200) + "...";

  

  async function deleteHandler() {
    setIsClicked(!data.current);
  }

  const undoHandler = async () => {
    setIsClicked(!data.current);
  };

  
 setTimeout(async () => {
    if (data.current) {

      await fetch(
        `https://keep-clone-f178f-default-rtdb.firebaseio.com/users/${userId}/notes/${props.id}.json`,
        {
          method: "DELETE",
        }
      );
    }
  }, 10000);


  const openModal = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };
  // console.log(props.title)
  const noteClasses = isClicked ? classes.deletednote : classes.note;
  return (
    <>
      <div className={noteClasses}>
        <div onClick={openModal}>
          <h5> {props.title}<span className={classes.mgl}>{props.title==="images" && (props.content.length!==1 ? <CollectionsIcon/>:"")}</span></h5>

          {props.title === "images" && (
            <img
              src={props.content}
              height="200px"
              width="200px"
              alt="firebase-uploaded-file"
            ></img>
          )}
         

          {props.title === "" && (
            <ol className={classes.list}>
              {props.content.map((item) => {
              
                return <ListCom key={item.id} text={item.text} isChecked={item.isChecked}  />;
              })}
            </ol>
          ) }
          
          {props.title!=="images" &&props.title!=="" && (
            <p>
              {props.content.length <= 200
                ? `${props.content}`
                : `${props.content.substring(0, 200) + "..."}`}
              {props.content.length > 200 && (
                <button className={classes.readMore} onClick={openModal}>
                  Read more
                </button>
              )}
            </p>)
          }
        </div>
        {!isClicked && (
          <button  className={classes.deleteIcon+ ' ' + classes.button} onClick={deleteHandler}>
            <DeleteIcon />
          </button>
        )}
        {isClicked && (
          <button  className={classes.deleteIcon+ ' ' + classes.button} onClick={undoHandler}>
            <RestoreIcon />
          </button>
        )}
      </div>

      {isModal && (
        <Modal
          title={props.title}
          message={props.content}
       id={props.id}
          onConfirm={closeModal}
        ></Modal>
      )}
    </>
  );
}

export default Note;
