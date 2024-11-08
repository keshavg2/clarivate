import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', organization: '' });
    const navigate = useNavigate();
    const baseUrl = 'http://localhost:3000';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}/user/signup`, formData);
            navigate('/login');
            alert('Signup successful');
        } catch (error) {
            alert(error);
            console.error('Error during signup', error);
        }
    };

    return (
        <div className="container">
            <h2>Signup Page</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange}/>
                <input type="email" name="email" placeholder="Email" onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
                <input type="text" name="organization" placeholder="Organization" onChange={handleChange}/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
