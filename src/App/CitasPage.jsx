import React from 'react'
import Citas from './DashboardCitas/citas'
import Border from './BorderTemplate/Border'
import '../css/dashboard-init.css'



class CitasPage extends React.Component {
    render() {
        return (
            <div className="content-wrapper">
                <Border></Border>
                <Citas />
            </div>
        );
    };
};


export default CitasPage;
