import './App.css';

import Login from './Components/Login/Login.jsx';
import Header from './Layout/Header/Header.jsx';
import Signup from './Components/SignUp/SignUp.jsx';
import Home from './Pages/Home/Home.jsx';
import Admin from './Pages/Admin/Admin.jsx';
import Employees from './Pages/Employees/Employees.jsx';
import CreateEmployee from './Pages/CreateEmployee/CreateEmployee.jsx';

import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Admin />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
