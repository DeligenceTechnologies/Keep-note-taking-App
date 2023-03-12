import React, { useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "../../Components/Modals/Modals";
import classes from "./Notes.module.css";
import { useNavigate } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import ListAltIcon from "@mui/icons-material/ListAlt";

//import { Button } from "@mui/material";
//import ListCom from "../List/ListCom";

function CreateNotes(props) {
  const [error, setError] = useState(undefined);
  const [addForm, setAddForm] = useState(true);

  const titleRef = useRef();
  const contentRef = useRef();
  const navigation = useNavigate();

  const addEvent = async (event) => {
    event.preventDefault();

    const note = {
      id: Date.now() + Math.random(),
      title: titleRef.current.value,
      content: contentRef.current.value,
    };

    if (note.title.trim().length === 0 || note.content.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a title and content (non-empty inputs) ",
      });
      return;
    }
    props.onAddNotes(note);
    titleRef.current.value = "";
    contentRef.current.value = "";
  };

  function ErrorHandler() {
    setError(null);
  }

  const addFormHandler = () => {
    setAddForm((prevState) => {
      prevState = !prevState;
    });
  };

  const uploadImage = () => {
    navigation("/image", {
      state: {
        image_title: titleRef.current.value,
        image_description: contentRef.current.value,
      },
    });
  };

  const addList = () => {
    navigation("/list");
    // setList(true);
  };

  return (
    <>
      {error && (
        <Modal
          title={error.title}
          message={error.message}
          onConfirm={ErrorHandler}
        ></Modal>
      )}

      <div className={classes.createNotes}>
        <form>
          {addForm && (
            <input
              type="text"
              name="addForm"
              onClick={addFormHandler}
              className={classes.addForm}
              placeholder="Click to add notes..."
            ></input>
          )}
          {!addForm && (
            <>
              <button
                onClick={addFormHandler}
                className={classes.closeButton + " " + classes.button}
              >
                <CloseIcon></CloseIcon>
              </button>

              <input
                type="text"
                name="title"
                ref={titleRef}
                placeholder="Title"
              ></input>
              <br />
              <br />

              <textarea
                rows="5"
                name="content"
                ref={contentRef}
                placeholder="Write a note..."
              ></textarea>

              <div className={classes.tooltip}>
                <button
                  type="button"
                  onClick={uploadImage}
                  className={classes.imageButton + " " + classes.button}
                >
                  <ImageIcon></ImageIcon>
                  <span className={classes.tooltiptext}>Add image</span>
                </button>
              </div>
              <div className={classes.tooltip}>
                <button
                  type="button"
                  onClick={addList}
                  className={classes.listButton + " " + classes.button}
                >
                  <ListAltIcon></ListAltIcon>
                  <span className={classes.tooltiptext}>Add list</span>
                </button>
              </div>
              <button
                onClick={addEvent}
                className={classes.addButton + " " + classes.button}
              >
                <AddIcon></AddIcon>
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default CreateNotes;
