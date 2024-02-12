import {Landing} from './Landing.js';
import {Login} from './Login.js';
import { Home } from './Home.js';
import './App.css';
import storeUserDataSetup from './testUserData.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

storeUserDataSetup(); // This is for testing purposes only. This is not a secure way to store user data.

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Landing/>} />     
        <Route path="/login" element = {<Login/>} />
        <Route path="/home" element = {<Home/>} />
      </Routes>
    </BrowserRouter>

  );
}
export default App;
