import { useState, } from "react";
import GoogleButton from "react-google-button";
import { Alert } from "react-bootstrap";
import classes from "./Form.module.css";
import { UserContext } from "../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  // const [minutes, setMinutes] = useState(3);
  // const [seconds, setSeconds] = useState(30);
  const [result, setResult] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { googleSignIn, phoneSignIn, logIn } = UserContext();

  const LoginHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);

      navigate("/home");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
      console.log(error);
    }
  };

  const LoginWithOtp = async () => {
    console.log(number);
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await phoneSignIn(number);
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (seconds > 0) {
  //       setSeconds(seconds - 1);
  //     }

  //     if (seconds === 0) {
  //       if (minutes === 0) {
  //         clearInterval(interval);
  //       } else {
  //         setSeconds(59);
  //         setMinutes(minutes - 1);
  //       }
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [seconds]);

  const cancelOtp = () => {
    setFlag(false);
  };

  const verifyOtp = async (e) => {
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  // const resendOtp = async() => {
  //   setError((prevState)=>prevState="")
  //   setMinutes(3);
  //   setSeconds(30);
  //    cancelOtp()
  //   // try {
  //   //   const response = await phoneSignIn(number);
  //   //   setResult(response);
  //   //   setFlag(true);
  //   // } catch (err) {
  //   //   setError(err.message);
  //   // }
  // };

  const handleGoogleSignIn = async (event) => {
    event.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };
  // useEffect(() => {
  //   if (user != null) {
  //     navigate("/home");
  //   }
  // }, [user]);


  return (
    <>
      <section className={classes.auth}>
        <h1>Login</h1>
        <br />
        {error && <Alert variant="danger">{error}</Alert>}
        {!flag && (
          <form autoComplete="off" autoSave="off" >
            <div className={classes.control}>
              <label htmlFor="email">Your Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                required
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Your Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                required
              />
            </div>
            <div className={classes.actions}>
              <button onClick={LoginHandler} type="button">Login</button>
            </div>
          </form>
        )}
        <div>
          <div style={{ display: !flag ? "block" : "none" }}>
            <br />
            <h3>or</h3>
            <div className={classes.control}>
              <label htmlFor="phone">Phone number</label>
              <PhoneInput
                defaultCountry="IN"
                value={number}
                onChange={setNumber}
              />
              <div className={classes.actions} id="recaptcha-container" />
            </div>
            <div className={classes.actions}>
              <button onClick={LoginWithOtp}>Get OTP</button>
            </div>
          </div>

          <div style={{ display: flag ? "block" : "none" }}>
            <br />

            <div className={classes.control}>
              <label htmlFor="phone">Enter OTP</label>
              <input
                type="number"
                id="number"
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <div id="recaptcha-container" />
            </div>
            <div className={`${classes.actions} ${classes.centerRow}` }>
              <button style={{margin:"auto"}} onClick={verifyOtp}>Verify OTP</button>
             

              <button style={{margin:"auto"}} onClick={cancelOtp}>Cancel</button>
            </div>
            <br></br>
            {/* <div>
              {seconds > 0 || minutes > 0 ? (
                <p>
                  Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </p>
              ) : (
                <p>Didn't recieve code?</p>
              )}
              <div className={classes.actions}>
                <button
                  disabled={seconds > 0 || minutes > 0}
                  onClick={resendOtp}
                >
                  Resend OTP
                </button>
              </div> */}
            {/* </div> */}
          </div>
          {!flag && (
            <div>
              <br />
              <h3>or</h3>
              <div className={classes.actions}>
                <GoogleButton onClick={handleGoogleSignIn} />
              </div>
            </div>
          )}
        </div>

        <div className={classes.actions}>
          <Link to="/signup" className={classes.toggle}>
            Create new account
          </Link>
        </div>
      </section>
    </>
  );
};

export default Login;
