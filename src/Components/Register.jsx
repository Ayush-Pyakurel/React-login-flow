//react hook imports
import { useEffect, useState, useRef } from "react";

//font-awesome font imports
import {
  faCheck,
  faTimes,
  faInfoCircle,
  fas,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//regex pattern for email and password
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errorRef = useRef();

  //state for email input field
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  //state for password input field
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  //state for confirm password input field
  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  const [errorsMsg, setErrorsMsg] = useState("");
  const [success, setSuccess] = useState(false);

  //useEffect to auto focus on email field first time page loads
  useEffect(() => {
    userRef.current.focus();
  }, []);

  //useEffect to check the enter email is valid or not everytime the email state changes
  useEffect(() => {
    const checkEmail = USER_REGEX.test(user);
    setValidName(checkEmail);
  }, [user]);

  //useEffect to check password validation, and if password and confirm password are same or not; everytime password and matchPassword value change this useEffect will be fire
  useEffect(() => {
    const checkPassword = PWD_REGEX.test(password);
    setValidPassword(checkPassword);
    const match = password === matchPassword;
    setValidMatchPassword(match);
    console.log(password);
    console.log(checkPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrorsMsg("");
  }, [user, password, matchPassword]);

  return (
    <section>
      <p
        ref={errorRef}
        className={errorsMsg ? "errmsg" : "offscreen"}
        arial-live="assertive"
      >
        {errorsMsg}
      </p>
      <h1>Register</h1>
      <form>
        {/* input field for username */}
        <label htmlFor="username">
          Username:
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !user ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        {/* if the field is invalid for accessibility 'aria-describedby' reads the instruction and the error is connect with 'aria-describedby' with the ID attached to it */}
        <p
          id="uidnote"
          className={
            userFocus && user && !validName ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters. <br />
          Must begin with a letter. <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>

        {/* input field for password */}
        <label htmlFor="password">
          Password:
          <span className={validPassword ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPassword || !password ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={validPassword ? "false" : "true"}
          aria-describedby="pswId"
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        <p
          id="pswId"
          className={
            passwordFocus && !validPassword ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character. <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>
          <span aria-label="at symbol">@</span>
          <span aria-label="hashtag">#</span>
          <span aria-label="dollar sign">$</span>
          <span aria-label="percentage">%</span>
        </p>

        <label htmlFor="matchPassword">Match Password: </label>
        <input
          type="password"
          id="matchPassword"
          required
          onChange={(e) => setMatchPassword(e.target.value)}
          aria-invalid={validMatchPassword ? "false" : "true"}
          aria-describedby="matchPwd"
          onFocus={() => setMatchPasswordFocus(true)}
          onBlur={() => setMatchPasswordFocus(false)}
        />
        <p id="matchPwd" className={matchPassword && !validMatchPassword ? 'instructions' : 'hide'}>
          <FontAwesomeIcon icon={faInfoCircle} /> Match password field must
          match with password!
        </p>
      </form>
    </section>
  );
};

export default Register;
