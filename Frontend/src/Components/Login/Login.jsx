import './Login.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        };

        try {
            const response = await axios.post('http://localhost:5000/api/user/loginUser', userData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true 
            });

            if (response.status === 200) {
                console.log(response.data.user.username);

                // Storing user data in localStorage or context
                localStorage.setItem('user', JSON.stringify(response.data.user.username));
                alert('Login successful!');
                navigate('/'); 
            }
        } catch (error) {
            alert('Login failed. Please check your credentials and try again.');
            console.error(error);
        }
    }
    return (
        <div className="login-container">
            <h1>Login</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} required />
                </div>
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    );
}

export default Login;