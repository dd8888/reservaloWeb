import React from 'react'
import CrearCita from './DashboardCrearCita/crearCita'
import Border from './BorderTemplate/Border'



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