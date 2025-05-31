import React from 'react';
import './Admin.css';

function Admin() {
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <p>Welcome back, Admin!</p>

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h3>Total Employees</h3>
                    <p>120</p>
                </div>
                <div className="dashboard-card">
                    <h3>Departments</h3>
                    <p>5</p>
                </div>
                <div className="dashboard-card">
                    <h3>Recent Additions</h3>
                    <p>3 this week</p>
                </div>
            </div>
        </div>
    );
}

export default Admin;
