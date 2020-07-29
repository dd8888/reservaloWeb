import React from 'react'
import CitasPDF from './CitasToPDF/citasPDF'
import Border from './BorderTemplate/Border'
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