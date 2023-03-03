import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import './SignupForm.css'

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.createUser({
        email,
        username,
        firstName,
        lastName,
        image,
        password
      })).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors(['Passwords do not match.']);
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <div className='modal signup'>
      <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/Pirate_ship.svg"></img>
      <h2>Hope you got the sea legs for this</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx} className='validation-error'>
            {error}
          </li>)}
        </ul>
        <label>
          Email
          <input
            className="text-upload-form"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label>
        <label>
          Username
          <input
            className="text-upload-form"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          First Name
          <input
            type='text'
            className="text-upload-form"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type='text'
            className="text-upload-form"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Profile Image
          <input
            type='file'
            className="file-upload-form"
            onChange={updateFile}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            className="text-upload-form"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            className="text-upload-form"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
