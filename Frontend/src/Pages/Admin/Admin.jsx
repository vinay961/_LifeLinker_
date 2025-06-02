import './Admin.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Admin() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            alert("You are not authenticated. Please log in.");
            navigate('/login');
            return null; 
        } 
    }, [navigate]);

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <p>Welcome back, Admin!</p>

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h3>Total Employees</h3>
                    <p>3</p>
                </div>
                <div className="dashboard-card">
                    <h3>Departments</h3>
                    <p>3</p>
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
