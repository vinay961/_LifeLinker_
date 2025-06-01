import React from 'react';
import './Employees.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

// const employees = [
//   {
//     id: 1,
//     name: 'hukum',
//     email: 'hcgupta@cstech.in',
//     mobile: '954010044',
//     designation: 'HR',
//     gender: 'Male',
//     course: 'MCA',
//     date: '13-Feb-21',
//     image: 'https://via.placeholder.com/40'
//   },
//   {
//     id: 2,
//     name: 'manish',
//     email: 'manish@cstech.in',
//     mobile: '954010033',
//     designation: 'Sales',
//     gender: 'Male',
//     course: 'BCA',
//     date: '12-Feb-21',
//     image: 'https://via.placeholder.com/40'
//   },
//   {
//     id: 3,
//     name: 'yash',
//     email: 'yash@cstech.in',
//     mobile: '954010022',
//     designation: 'Manager',
//     gender: 'Male',
//     course: 'BSC',
//     date: '11-Feb-21',
//     image: 'https://via.placeholder.com/40'
//   },
//   {
//     id: 4,
//     name: 'abhishek',
//     email: 'abhishek@cstech.in',
//     mobile: '954010033',
//     designation: 'HR',
//     gender: 'Male',
//     course: 'MCA',
//     date: '13-Feb-21',
//     image: 'https://via.placeholder.com/40'
//   }
// ];

function Employees() {
  const navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employee/allEmployee', {
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

  const AddEmployee = () => {
    navigate('/create-employee');
  };

  return (
    <div className="employee-list-container">

      <div className="highlight">Employee List</div>

      <div className="top-controls">
        <span>Total Employees: {employeeList.length}</span>
        <button className="create-btn" onClick={AddEmployee}>Create Employee</button>
      </div>

      <div className="search-box">
        <label>Enter Search Keyword</label>
        <input type="text" placeholder="Search..." />
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
          {employeeList.map(emp => (
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
                <button className="action-btn">Edit</button>
                <button className="action-btn delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;
