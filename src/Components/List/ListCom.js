import React from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import classes from "./List.module.css"

const ListCom = (props) => {
 

  return (
    <div className={classes.todo_style}>
      <span onClick={props.toggleChecked}>
        {!props.isChecked && <CheckBoxOutlineBlankIcon className={classes.deleteIcon} />}
        {props.isChecked && <CheckBoxIcon className={classes.deleteIcon}/>}
      </span>

      <li style={{ textDecoration: props.isChecked ? "line-through" : "none" }}>
        {props.text}
      </li>
    </div>
  );
};

export default ListCom;
