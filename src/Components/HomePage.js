import React, { useState, useCallback, useEffect } from "react";
import Header from "./Header/Header";
import CreateNotes from "./Notes/CreateNotes";
import Modal from "./Modals/Modals";
import NotesList from "./Notes/NotesList";
import Count from "./Count/Count";
import { UserContext } from "./Context/AuthContext";

function HomePage() {
  const [note, setNote] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);
const {userId} = UserContext();

 

  const fetchNoteHandler = useCallback(async () => {
    try {
      const response = await fetch(
        `https://keep-clone-f178f-default-rtdb.firebaseio.com/users/${userId}/notes.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedNotes = [];

      for (const key in data) {
        //console.log(key)
        loadedNotes.push({
          id: key,
          title: data[key].title,
          content: data[key].content,
          description:data[key].description,
          image_title:data[key].image_title
        });
      }

      setNote(loadedNotes);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  });
 
  useEffect(() => {
    fetchNoteHandler();
  }, [fetchNoteHandler]);

  async function addNoteHandler(note) {
    // console.log(movie);
    setIsLoading(true);
    const response = await fetch(
      `https://keep-clone-f178f-default-rtdb.firebaseio.com/users/${userId}/notes.json`,
      {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);
    setIsLoading(false);
  }
  function ErrorHandler() {
    setError(null);
  }

  return (
    <div>
      <Header></Header>
      <Count count={note.length}></Count>
      <CreateNotes onAddNotes={addNoteHandler}></CreateNotes>
      {error && (
        <Modal
          message="Something went wrong!!"
          onConfirm={ErrorHandler}
        ></Modal>
      )}
      {isLoading && <Modal message="Loading..."></Modal>}
      {!error && !isLoading && <NotesList notes={note}></NotesList>}
    </div>
  );
}

export default HomePage;
