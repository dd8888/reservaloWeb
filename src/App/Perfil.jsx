import React from 'react'
import MainPerfil from './Dashboard/DashboardPerfil/perfil'
import Border from './Dashboard/BorderTemplate/Border'
import '../css/dashboard-init.css'
import '../css/perfil-usuario.css'


class PerfilPage extends React.Component {
    render() {
        return (
            <div className="content-wrapper">
                <Border></Border>
                <MainPerfil />
            </div>
        );
    };
};


export default PerfilPage;