import React, { useState } from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import classes from "./List.module.css"

const ListCom = (props) => {
  const [line, setLine] = useState(false);

  const cutIt = () => {
    setLine((prevState)=>prevState=!prevState);
  };

  return (
    <div className={classes.todo_style}>
      <span onClick={cutIt}>
        {!line  && <CheckBoxOutlineBlankIcon className={classes.deleteIcon} />}
        {line && <CheckBoxIcon className={classes.deleteIcon}/>}
      </span>

      <li style={{ textDecoration: line ? "line-through" : "none" }}>
        {props.text}
      </li>
    </div>
  );
};

export default ListCom;
