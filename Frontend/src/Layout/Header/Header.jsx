import './Header.css';
import React from 'react';

function Header() {
  const user = "Vinay";

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="header-container">
      <div className="logo">
        <img
          src="https://purepng.com/public/uploads/large/purepng.com-nike-logologobrand-logoiconslogos-251519940082eoxxs.png"
          height="50px"
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
