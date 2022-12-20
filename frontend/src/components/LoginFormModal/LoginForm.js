import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data.statusCode === 401) setErrors(data.message);
            }
        );
    };
    
    return (
        <div className="modal login">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/Pirate_ship.svg"></img>
            <h2>Welcome back ye' scurvy dog!</h2>
            <form className='login-form' onSubmit={handleSubmit}>
                <ul>
                    {errors.length > 1 &&
                    <li className="validation-error">{errors}</li>}
                </ul>
                <label>
                    Username or Email
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <p>By logging in you agree to surrender all your loot and plunder to the captain</p>
                <button type="submit">Set Sail</button>
            </form>
        </div>
    );
}

export default LoginForm;
