import React from 'react'
import HorariosUser from './DashboardHorarios/horarios'
import Border from './BorderTemplate/Border'
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