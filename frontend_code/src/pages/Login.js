import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const baseUrl = 'http://localhost:3000';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}/user/signin`, formData);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken); // Store JWT token
            navigate('/dashboard');
        } catch (error) {
            console.error('Error during login', error);
        }
    };

    return (
        <div className="container">
            <h2>Login Page</h2> {/* Page name */}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
                <button type="submit">Login</button>
            </form>
        </div>
)
    ;
};

export default Login;
