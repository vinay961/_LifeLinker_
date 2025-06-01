import './Header.css';
import React from 'react';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
    } else {
      setUser(JSON.parse(user));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="header-container">
      <div className="logo">
        <img
          src="https://lifelink-oncall.com/wp-content/uploads/2021/03/Lifelink_red_rgb.png"
          height="30px"
          width="110px"
          alt="Logo"
        />
      </div>
      <div className="content">
        <ul>
          {user ? (
            <>
              <div className="left">
                <li><a href="/">Home</a></li>
                <li><a href="/employees">Employee List</a></li>
              </div>
              <div className="right">
                <li className="welcome-msg">Welcome, {user}</li>
                <li>
                    <button className="nav-button logout-btn" onClick={handleLogout}>
                    Logout
                    </button>
                </li>
              </div>
            </>
          ) : (
            <>
              
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
