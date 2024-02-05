import {Landing} from './Landing.js';
import {Login} from './Login.js';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Landing/>} />
        
        <Route path="/login" element = {<Login/>} />
      </Routes>
    </BrowserRouter>

  );
}
export default App;
