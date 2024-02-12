import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginStatus, setLoginStatus] = useState('');

    const navigate = useNavigate();

    const handleLogin = () => {
        try {
            const storedUsers = localStorage.getItem('users');
            const users = JSON.parse(storedUsers); 
            const userExists = users.some(user => user.username === username && user.password === password);
    
            if (userExists) {
                setLoginStatus('Login Successful');
                // redirect to home page using react-router-dom
                navigate('/home');
            } else {
                setLoginStatus('Invalid username or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setLoginStatus('An error occurred. Please try again later.');
        }
    };

    const toggleShowPassword = () => setShowPassword(!showPassword);

    return (
        <div className="Login" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ textAlign: 'center' }}>Login</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <button onClick={toggleShowPassword} style={{ marginBottom: '10px' }}>
                {showPassword ? 'Hide Password' : 'Show Password'}
            </button>
            <button onClick={handleLogin}>Login</button>
            <div>{loginStatus}</div>
        </div>
    );
};
