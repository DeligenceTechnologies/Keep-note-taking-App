import React, { useState } from "react";
import classes from "./List.module.css";
import { Button } from "@mui/material";

import ListCom from "./ListCom";
import { UserContext } from "../Context/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import Header from "../Header/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function List() {
  const [item, setItem] = useState("");
  const [newItem, setNewItem] = useState([]);
  const { userId } = UserContext();
  const navigation = useNavigate();

  const backHandler = () => {
    navigation("/home");
  };

  const listOfItems = () => {
    const itemList = {
      id: new Date().getTime(),
      text: item,
      isChecked: false,
    };
    if (item !== "") {
      setNewItem((prevValue) => {
        return [...prevValue, itemList];
      });
     
      setItem("");
    }
  
  };
  const toggleChecked = (id) => {
    let updatedItems = [...newItem].map(item => {
        if(item.id === id){
            item.isChecked = !item.isChecked
        }

        return item
    })

    setNewItem(updatedItems)
}

  const note = {
    id: Date.now() + Math.random(),
    title: "",
    content: newItem,
  };


  const saveHandler = async () => {
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
     navigation("/home");
  };

  return (
    <>
      <Header></Header>

      <div className={classes.main_div}>
        <button onClick={backHandler} className={classes.backIcon}>
          <ArrowBackIcon />
        </button>
        <div className={classes.center_div}>
          <br />
          <input
            type="text"
            className={classes.listInput}
            value={item}
            placeholder="Add an Items"
            onChange={(e) => setItem(e.target.value)}
          />

          <Button className={classes.newBtn} onClick={listOfItems}>
            <AddIcon />
          </Button>

          <br />

          <ol className={classes.list}>
            {newItem.map((item) => (
              <ListCom key={item.id} text={item.text} isChecked={item.isChecked} toggleChecked={() => toggleChecked(item.id)} />
            ))}
          </ol>

          <br />
          <button className={classes["upload-btn"]} onClick={saveHandler}>
            SAVE
          </button>
        </div>
      </div>
    </>
  );
}

export default List;
