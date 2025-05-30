import React from 'react';
import './Signup.css';

function SignUp() {
    return (
        <div className="login-container">
            <h1>Sign Up</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default SignUp;
