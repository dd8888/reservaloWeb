import React from 'react'
import CitasDetalladas from './Dashboard/DashboardCitasDetalladas/citasDetalladas'
import Border from './Dashboard/BorderTemplate/Border'



class CitaDetallada extends React.Component {
    render() {
        return (
            <div className="content-wrapper">
                <Border></Border>
                <CitasDetalladas />
            </div>
        );
    };
};


export default CitaDetallada;