// a basic landing page with a login button and data field to input user/pass

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export const Landing = () => {
        return (
        <div className="Landing">
            <header className="Landing-header">
            <h1>Todo list with Redo function</h1>
            <p>
                click login to login...duh
            </p>
            <Link to="/login">
                <button className="Landing-button">Login</button>
            </Link>
            </header>
        </div>
        );
    }
