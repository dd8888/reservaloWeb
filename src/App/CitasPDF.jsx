import React from 'react'
import CitasPDF from './Dashboard/CitasToPDF/citasPDF'
import Border from './Dashboard/BorderTemplate/Border'
import '../css/dashboard-init.css'



class CitasaPDF extends React.Component {
    render() {
        return (
            <div className="content-wrapper">
                <Border></Border>
                <CitasPDF />
            </div>
        );
    };
};


export default CitasaPDF;