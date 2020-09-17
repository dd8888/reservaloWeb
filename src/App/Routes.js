import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
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
import { PrivateRoute } from 'react-auth-kit';
import Home from './Home';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/'} component={Home} exact></Route>
        <Route path="/login" component={Index} exact />
        <PrivateRoute
          path={'/404'}
          component={PageNotFound}
          loginPath={'/login'}
          exact
        />
      </Switch>
    </BrowserRouter>
  );
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
