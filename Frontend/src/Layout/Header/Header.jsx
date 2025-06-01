import './Header.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, [navigate]);

  const handleLogout = async () => {

    const response = await axios.post('https://lifelinker.onrender.com/api/user/logoutUser', {}, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      console.log("Logout successful");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    }
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
