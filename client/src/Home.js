//upon sucessful login, the user should be redirected to the home page.
//the user should also see a logout button which will redirect the user back to the landing page
//The user should see an option to create a new to do list
//The user should see a list of to do items that they have created
//The user should be able to complete/delete a to do items
//The user should be able to edit a to do item

import React from 'react';

export const Home = () => {
    return (
        <div className="Home" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', marginTop: '-20vh' }}>
            <header className="Home-header">
                <h1>Welcome to the Home Page</h1>
                


                <a href="/">Logout</a>
                
            </header>
        </div>
    );
}