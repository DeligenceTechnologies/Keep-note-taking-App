
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {UserContext} from "../Context/AuthContext"
import logo from '../Images/logo.jpeg'
import classes from './Header.module.css'


function Header() {
  const {logout} = UserContext();
const navigate=useNavigate();
  const logoutHandler = async()=>{
try{
  await logout()
  navigate("/")
}
catch(error){
  console.log(error)
}
  }
  return (
    <header className={classes.header}>
     
        <div className={classes.logo}> <img src={logo} alt="logo" width='80' height='60'></img> Keep</div>
        <nav>
          <ul>
            
            <li> <button onClick={logoutHandler} >Logout</button></li>
          </ul>
        </nav>
      
      
    </header>
    
  )
}

export default Header




