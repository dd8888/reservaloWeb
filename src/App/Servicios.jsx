import React from 'react'
import Servicios from './DashboardServicios/servicios'
import Border from './BorderTemplate/Border'
import '../css/dashboard-init.css'
import '../css/perfil-usuario.css'


class Services extends React.Component {
    render() {
        return (
            <div className="content-wrapper">
                <Border></Border>
                <Servicios />
            </div>
        );
    };
};


export default Services;