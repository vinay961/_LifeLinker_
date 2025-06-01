import './Employees.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';


function Employees() {
  const navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchEmployees = async () => {
    try {
      const response = await fetch('https://lifelinker.onrender.com/api/employee/allEmployee', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include' 
      });
      console.log("Response status:", response.status); // Debugging line to check the response status
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchEmployees()
      .then(response => response.json())
      .then(data => {
        if (data && data.employees) {
          setEmployeeList(data.employees);
        } else {
          console.error("No employees found in the response");
        }
      })
      .catch(error => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const filteredEmployees = employeeList.filter(emp =>
    emp.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    emp.mobile.toString().includes(searchKeyword) ||
    emp.courses.some(course =>
      course.toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  }

  const handleDelete = (id) => {
    const response = window.confirm("Are you sure you want to delete this employee?");
    if(response) {
      axios.delete(`https://lifelinker.onrender.com/api/employee/deleteEmployee/${id}`, {
        withCredentials: true
      })
      .then(res => {
        if (res.status === 200) {
          alert("Employee deleted successfully");
          setEmployeeList(employeeList.filter(emp => emp._id !== id));
        } else {
          alert("Failed to delete employee");
        }
      })
      .catch(err => {
        console.error("Error deleting employee:", err);
        alert("Failed to delete employee");
      });
    }
  }

  const AddEmployee = () => {
    navigate('/create-employee');
  };

  return (
    <div className="employee-list-container">

      <div className="highlight">Employee List</div>

      <div className="top-controls">
        <span>Total Employees: {filteredEmployees.length}</span>
        <button className="create-btn" onClick={AddEmployee}>Create Employee</button>
      </div>

      <div className="search-box">
        <label>Enter Search Keyword</label>
        <input type="text" placeholder="Search..." onChange={(e) => setSearchKeyword(e.target.value)} />
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(emp => (
            <tr key={emp._id}>
              <td>{emp._id}</td>
              <td><img src={emp.image} alt="profile" className="emp-image" style={{borderRadius:"50%"}} /></td>
              <td>{emp.name}</td>
              <td><a href={`mailto:${emp.email}`}>{emp.email}</a></td>
              <td>{emp.mobile}</td>
              <td>{emp.designation}</td>
              <td>{emp.gender}</td>
              <td>{emp.courses.join(', ')}</td>
              <td>{new Date(emp.createdAt).toLocaleDateString()}</td>
              <td>
                <button className="action-btn" onClick={() => handleEdit(emp._id)}>Edit</button>
                <button className="action-btn delete" onClick={() => handleDelete(emp._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;
