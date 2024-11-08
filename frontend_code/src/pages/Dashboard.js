import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const baseUrl = 'http://localhost:3000';

    useEffect(() => {
        const token = localStorage.getItem('token');
            const fetchDashboardData = async () => {
                try {
                    const response = await axios.get(`${baseUrl}/user/dashboard`, {
                        headers: {
                            Authorization: `Bearer ${token}`, // Pass token in the Authorization header
                        },
                    });
                    setDashboardData(response.data.data.userId); // Set the data to state
                } catch (error) {
                    console.error('Error fetching dashboard data', error);
                    if (error.response && error.response.status === 401) {
                        localStorage.removeItem('token');
                        navigate('/login');
                    }
                }
            };
            fetchDashboardData();
    }, [navigate]);

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            {dashboardData ? (
                <div>
                    <p>Login user id: {JSON.stringify(dashboardData)}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Dashboard;
