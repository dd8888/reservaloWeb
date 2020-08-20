import React from 'react'
import HorariosUser from './Dashboard/DashboardHorarios/horarios'
import Border from './Dashboard/BorderTemplate/Border'
import '../css/dashboard-init.css'



class Horarios extends React.Component {
    render() {
        return (
            <div className="content-wrapper">
                <Border></Border>
                <HorariosUser />
            </div>
        );
    };
};


export default Horarios;