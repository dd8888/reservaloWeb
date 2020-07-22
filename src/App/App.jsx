import React, { useState } from 'react';
import CitasPage from './CitasPage';
import CitaDetallada from './CitasDetalladas';
import CrearCitasPage from './CitasCrear'
import Index from './Indice'
import { AuthProvider } from './Auth'
import PrivateRoute from './PrivateRoute';
import Routes from './Routes';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
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
