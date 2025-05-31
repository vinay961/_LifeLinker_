import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
    const user = JSON.parse(localStorage.getItem("user")); 

    return (
        <div className="home-container">
            <h1>Welcome to Employee Management System</h1>
            <p>
                Manage your employees efficiently — add, view, and organize all records securely and easily.
            </p>

            <div className="home-buttons">
                {user ? (
                    <>
                        <Link to="/dashboard">
                            <button className="btn-primary">Go to Dashboard</button>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="btn-primary">Login</button>
                        </Link>
                        <Link to="/signup">
                            <button className="btn-secondary">Sign Up</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
