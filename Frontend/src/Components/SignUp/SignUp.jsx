import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            email,
            password
        };

        try {
            const response = await axios.post('http://localhost:5000/api/user/createUser', userData, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                alert('Registration successful!');
                navigate('/login');
            }
        } catch (error) {
            alert('Registration failed. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        required 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default SignUp;
