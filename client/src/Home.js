//upon sucessful login, the user should be redirected to the home page.
//temp: after the redirect, the user should see this page with some placeholder text
//the user should also see a logout button which will redirect the user back to the landing page

import React from 'react';

export const Home = () => {
    return (
        <div className="Home">
            <header className="Home-header">
                <h1>Welcome to the Home Page</h1>
                <p>
                    This is a placeholder for the home page. 
                </p>
                <a href="/">Logout</a>
            </header>
        </div>
    );
}