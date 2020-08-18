import React from 'react'
import Fichar from './DashboardFichar/fichar'
import Border from './BorderTemplate/Border'
import '../css/dashboard-init.css'



class FicharEmpleado extends React.Component {
    render() {
        return (
            <div className="content-wrapper">
                <Border></Border>
                <Fichar />
            </div>
        );
    };
};


export default FicharEmpleado;