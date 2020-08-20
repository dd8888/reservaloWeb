import React from 'react'
import Citas from './Dashboard/DashboardCitas/citas'
import Border from './Dashboard/BorderTemplate/Border'
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
