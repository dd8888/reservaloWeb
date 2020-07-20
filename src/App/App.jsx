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
        <div>
            <AuthProvider>
                <Router>
                    <Route path="/citas" exact>
                        <CitasPage />
                    </Route>
                    <Route path="/citasDetalladas" exact>
                        <CitaDetallada />
                    </Route>
                    <Route path="/crearCita" exact>
                        <CrearCitasPage />
                    </Route>
                    <PrivateRoute path="/index" exact>
                        <Index />
                    </PrivateRoute>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
