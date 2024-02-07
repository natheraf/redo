import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//TODO: make a working login page where it has a textboox to input username and password and a button to submit
//warning if shit aint right
//When they sign up then, store user info into local storage
export const Login = () => {
    return (
        <div className="Login" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ textAlign: 'center' }}>
                Login
            </h1>
            
            <input type="Username" style={{ marginBottom: '10px' }}/>

            <input type="password" style={{ marginBottom: '10px' }}/>

        </div>
    );
}