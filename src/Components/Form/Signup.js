import { useState } from "react";
import { Alert } from "react-bootstrap";
import classes from "./Form.module.css";
import { UserContext } from "../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { createUser } = UserContext();

  const [error, setError] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    setError("");
    try {
      await createUser(email, password);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
    console.log(error)
  };

  return (
    <section className={classes.auth}>
      <h1>Sign Up</h1>
      <br />
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            required
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">Create Account</button>
        </div>
       
      </form>

      <div className={classes.actions}>
        <Link to="/" className={classes.toggle}>
          Login with existing account
        </Link>
      </div>
    </section>
  );
};

export default Signup;
