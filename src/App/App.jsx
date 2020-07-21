import React, { useState } from 'react';
import CitasPage from './CitasPage';
import CitaDetallada from './CitasDetalladas';
import CrearCitasPage from './CitasCrear'
import Index from './Indice'
import { AuthProvider } from './Auth'
import PrivateRoute from './PrivateRoute';

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
                <div>
                    <Route path="/citas" exact>
                        <CitasPage />
                    </Route>
                    <Route path="/citasDetalladas" exact>
                        <CitaDetallada />
                    </Route>
                    <PrivateRoute path="/crearCita" exact>
                        <CrearCitasPage />
                    </PrivateRoute>
                    <PrivateRoute path="/index" exact >
                        <Index />
                    </PrivateRoute>
                </div>
            </Router>

        </AuthProvider>
    );
}

export default App;
