import React from 'react'
import classes from './Count.module.css'

function Count({count}) {
  return (
    <div className={classes.count}>
      <h5><i>Total notes : {count}</i></h5>
     
    </div>
  )
}

export default Count
