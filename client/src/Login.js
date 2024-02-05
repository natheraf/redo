import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//TODO: make a working login page where it has a textboox to input username and password and a button to submit
//warning if shit aint right
//When they sign up then, store user info into local storage
export const Login = () => {
    return (
        <div className="Login" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1>
                Login
            </h1>
        </div>
    );
}