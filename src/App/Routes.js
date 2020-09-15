import React, { useContext } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { AuthContext } from './Auth';
import CitasPage from './CitasPage';
import CitaDetallada from './CitasDetalladas';
import CrearCitasPage from './CitasCrear';
import CitasaPDF from './CitasPDF';
import Index from './Indice';
import Horarios from './Horarios';
import Perfil from './Perfil';
import EditarCitas from './EditarCitas';
import Services from './Servicios';
import Producto from './Productos';
import FicharEmpleado from './Fichar';
import PageNotFound from './PageNotFound';
import { useIsAuthenticated } from 'react-auth-kit';

const Routes = () => {
  const isAuthenticated = useIsAuthenticated();
  console.log(isAuthenticated());

  if (isAuthenticated()) {
    return (
      <Switch>
        <Route path="/404" component={PageNotFound}></Route>
        <Redirect to="/404" />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/login" component={Index} />
        <Redirect to="/login" />
      </Switch>
    );
  }
};

export default Routes;

/*<Route path="/horarios" component={Horarios}></Route>
        <Route path="/editarCita" component={EditarCitas}></Route>
        <Route path="/servicios" component={Services}></Route>
        <Route path="/fichar" component={FicharEmpleado}></Route>
        <Route path="/productos" component={Producto}></Route>
        <Route path="/citas" component={CitasPage} />
        <Route path="/citaDetallada" component={CitaDetallada} />
        <Route path="/crearCita" component={CrearCitasPage} />
        <Route path="/exportarPDF" component={CitasaPDF} />*/
