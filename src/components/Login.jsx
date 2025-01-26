import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        // Check if email is provided and valid
        if (!email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        // Check if password is provided
        if (!password) {
            newErrors.password = 'Password is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the form before processing
        if (!validateForm()) {
            return;
        }

        // Retrieve users from localStorage (array of user objects)
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.length === 0) {
            alert('No registered users found. Please register first.');
            return;
        }

        // Check if the entered email and password match any user in the list
        const user = users.find((user) => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem('isLogin', 'true'); // Set login status
            navigate('/dashboard'); // Redirect to dashboard
        } else {
            alert('Invalid email or password!');
        }
    };

    return (
        <div className='log'>
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
            <form onSubmit={handleSubmit} className='loginform'>
                <h2>Login</h2>
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

                <button type="submit">Login</button>
                <p>
                    Not a Member? 
                    <NavLink to="/register" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                        Register
                    </NavLink>
                </p>
            </form>
            <footer className="loginfooter">
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

export default Login;
