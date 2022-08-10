import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SignInBasic from "./componentsInUse/login/index"
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from "./componentsInUse/registration/Registration";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <React.StrictMode>
            <BrowserRouter>
                <AuthProvider>
                    <App />
                    {/*<Routes>*/}
                    {/*    <Route path="/*" element={<App />} />*/}
                    {/*    <Route path="/login" element={<Login />} />*/}
                    {/*    <Route path="/registration" element={<Registration />} />*/}
                    {/*</Routes>*/}
                </AuthProvider>
            </BrowserRouter>
        </React.StrictMode>

);

// root.render(
//     <BrowserRouter>
//         <App/>
//     </BrowserRouter>
// )
