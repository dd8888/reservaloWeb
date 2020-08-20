import React from 'react'
import Editar from './Dashboard/DashboardEditarCita/editar'
import Border from './Dashboard/BorderTemplate/Border'
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