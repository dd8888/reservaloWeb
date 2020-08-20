import React from 'react'
import CrearCita from './Dashboard/DashboardCrearCita/crearCita'
import Border from './Dashboard/BorderTemplate/Border'



class CrearCitasPage extends React.Component {
    render() {
        return (
            <div className="content-wrapper">
                <Border></Border>
                <CrearCita />
            </div>
        );
    };
};


export default CrearCitasPage;