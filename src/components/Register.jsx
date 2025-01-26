import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        // Validate username
        if (username.trim() === '') {
            newErrors.username = 'Username is required.';
        }

        // Validate email
        if (!email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = 'Invalid email address.';
        }

        // Validate password
        if (password.trim() === '') {
            newErrors.password = 'Password is required.';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Stop submission if validation fails
        }

        // Retrieve existing users or initialize an empty array
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the email is already registered
        const isExistingUser = users.some((user) => user.email === email);
        if (isExistingUser) {
            alert('Email already registered. Please log in.');
            return;
        }

        // Add the new user
        const newUser = { username, email, password };
        users.push(newUser);

        // Save updated users array to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registration successful!');
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className='reg'>
            <nav className="navbar">
                <div className="navbar-brand">
                    <img src="/img/logo2.png" alt="MyApp Logo" className="navbar-logo" />
                </div>
                <ul className="navbar-links">
                    <li>
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                            Register
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                            Login
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <form onSubmit={handleRegister} className="registerform">
                <h2>Register</h2>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <span className="error-message">{errors.username}</span>}

                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}

                <button type="submit">Register</button>
                <p>
                    Already a Member?{' '}
                    <NavLink to="/login" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                        Login
                    </NavLink>
                </p>
            </form>
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2024 MyApp. All rights reserved.</p>
                    <ul className="footer-links">
                        <li>
                            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-footer-link' : '')}>
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-footer-link' : '')}>
                                Contact
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/privacy" className={({ isActive }) => (isActive ? 'active-footer-link' : '')}>
                                Privacy Policy
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default Register;
