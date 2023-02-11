import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllRoutes from './AllRoutes';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    {/* <Socket/> */}
 <AllRoutes/>

    {/* <App /> */}
  </BrowserRouter>
);

reportWebVitals();
