import React, { useContext } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom';
import { AuthContext } from "./Auth";
import CitasPage from './CitasPage';
import CitaDetallada from './CitasDetalladas';
import CrearCitasPage from './CitasCrear'
import Index from './Indice'
const Routes = () => {
    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        return (
            <Switch>
                <Route path='/citas' component={CitasPage} />
                <Route path='/citaDetallada' component={CitaDetallada} />
                <Route path='/crearCita' component={CrearCitasPage} />
                <Redirect to='/citas' />
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path='/login' component={Index} />
                <Redirect to='/login' />
            </Switch>
        )
    }
}
export default Routes;