import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginStatus, setLoginStatus] = useState('');
    const navigate = useNavigate();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Retrieve users from localStorage
        const users = JSON.parse(localStorage.getItem('testUserData')) || [];
        // Check if user exists and password matches
        const userExists = users.find(user => user.username === username && user.password === password);
    
        if (userExists) {
            // User found and password matches
            navigate('/home'); // Redirect on successful login
        } else {
            // User not found or password does not match
            setLoginStatus('Invalid username or password. Please try again.');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                // login form container which contains elements for username, password, login button and go back button
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                // avatar icon below |
                //                   V
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> 
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                        // username field    
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                        // password field
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    // Show/hide password button
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={toggleShowPassword}
                                            onMouseDown={(e) => e.preventDefault()} // Prevents focus loss on click
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            // button component to submit the form (login button)
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        {loginStatus && (
                            <Typography color="error" variant="body2" align="center">
                                {loginStatus}
                            </Typography>
                        )}
                        <Button
                            // button component to navigate back to the landing page
                            fullWidth
                            variant="text"
                            sx={{ mt: 1, mb: 2 }}
                            onClick={() => navigate('/')} // Use navigate to go back to the landing page
                        >
                            Go Back
                        </Button>
                        <Button
                            // button component to navigate to the register page
                            fullWidth
                            variant="text"
                            sx={{ mt: 1, mb: 2 }}
                            onClick={() => navigate('/register')} // Use navigate to go to the register page
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
