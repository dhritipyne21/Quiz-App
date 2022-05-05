import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {

  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import APIStarter from './components/APIStarter';
import HomePage from './components/HomePage';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/questions" element={<APIStarter />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

