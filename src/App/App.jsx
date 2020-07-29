import React, { useState } from 'react';
import { AuthProvider } from './Auth'
import Routes from './Routes';
import {
    BrowserRouter as Router
} from "react-router-dom";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes />
            </Router>
        </AuthProvider>
    );
}

export default App;
