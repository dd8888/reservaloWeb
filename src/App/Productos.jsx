import React from 'react'
import Productos from './Dashboard/DashboardProductos/productos'
import Border from './Dashboard/BorderTemplate/Border'
import '../css/dashboard-init.css'
import '../css/perfil-usuario.css'


class Producto extends React.Component {
    render() {
        return (
            <div className="content-wrapper">
                <Border></Border>
                <Productos />
            </div>
        );
    };
};


export default Producto;