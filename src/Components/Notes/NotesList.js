import React from "react";
import Note from "./Note";
import classes from "./Notes.module.css";

function NotesList(props) {

  return (
    <ul className={classes.noteList}>
      {props.notes.map((note, index) => (
        <Note
          key={index}
          id={note.id}
          description={note.description}
          title={note.title}
          content={note.content}
        ></Note>
      ))}
    </ul>
  );
}

export default NotesList;
