import React, { useState } from 'react';

// TEMP - this will be replaced with a call to the server
const usersDataUrl = '/users.json';

export const Login = () => {
    // currently reading from a local file to simulate, this will not make it to production
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginStatus, setLoginStatus] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch(usersDataUrl);
            const users = await response.json();
            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                setLoginStatus('Login Successful');
                // TODO: redirect the user or change the state as needed upon successful login
            } else {
                setLoginStatus('Invalid username or password');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoginStatus('An error occurred. Please try again later.');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

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
}
