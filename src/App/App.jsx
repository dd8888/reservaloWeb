import React, { useState } from 'react';
import CitasPage from './CitasPage';
import CitaDetallada from './CitasDetalladas';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import CitasDetalladas from './DashboardCitasDetalladas/citasDetalladas';

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/citas" exact>
                        <CitasPage />
                    </Route>
                    <Route path="/citasDetalladas" exact>
                        <CitaDetallada />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
