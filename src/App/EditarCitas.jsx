import React from 'react'
import Editar from './DashboardEditarCita/editar'
import Border from './BorderTemplate/Border'
import '../css/dashboard-init.css'



class EditarCitas extends React.Component {
    render() {
        return (
            <div className="content-wrapper">
                <Border></Border>
                <Editar />
            </div>
        );
    };
};


export default EditarCitas;