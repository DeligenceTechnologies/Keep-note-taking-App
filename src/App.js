//import HomePage from "./Components/test";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import Login from "./Components/Form/Login";
import Signup from "./Components/Form/Signup";
import Protected from "./Components/Protected";
import { AuthContextProvider } from "./Components/Context/AuthContext";
import List from "./Components/List/List";
import Image from "./Components/Image/Image";

function App() {
  
  

  return (
    
          <AuthContextProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  <Protected>
                    <HomePage />
                  </Protected>
                }
              />
              <Route path="/" element={<Login />} />
              <Route path="/image" element={<Image />} />
              <Route path="/list" element={<List />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </AuthContextProvider>
        
  );
}

export default App;
