import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from "react-router-dom";
import * as firebase from 'firebase'
import DatePicker from 'react-datepicker'
import '../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import '../../css/dashboard-init.css'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Auth';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
require('react-big-calendar/lib/css/react-big-calendar.css');

var firebaseConfig = {
    apiKey: "AIzaSyC9I5kCCmOyHoORv_x4o9fJXnleDCa22V0",
    authDomain: "pruebafirebase-44f30.firebaseapp.com",
    databaseURL: "https://pruebafirebase-44f30.firebaseio.com",
    projectId: "pruebafirebase-44f30",
    storageBucket: "pruebafirebase-44f30.appspot.com",
    messagingSenderId: "846026419673",
    appId: "1:846026419673:web:c51e352b34394338d83dc8",
    measurementId: "G-W90PWGXKTN"
};
// Initialize Firebase

const messages = {
    allDay: 'Todo el día',
    previous: '<',
    next: '>',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Tiempo',
    event: 'Evento',
    showMore: total => `+ Total (${total})`
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.firestore();

const HorariosUser = () => {
    const localizer = momentLocalizer(moment)

    //Comprobar usuario ----
    var BreakException = {};
    const { currentUser } = useContext(AuthContext);
    const [empleados, setEmpleados] = useState([]);
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState();
    useEffect(() => {
        database.collection('EmpleadosDev').get()
            .then(response => {
                const fetchedEmpleados = [];
                const emails = [];
                response.forEach(document => {
                    const fetchedEmpleado = {
                        id: document.id,
                        ...document.data()
                    };
                    fetchedEmpleados.push(fetchedEmpleado);
                    fetchedEmpleados.forEach(element => {
                        emails.push(element.Email)
                    });
                    if (!emails.includes(currentUser.email)) {
                        alert('Este usuario no tiene permisos de acceso. Serás redirigido al login');
                        firebase.auth().signOut();
                        throw BreakException;
                    } else {
                        setEmpleadoSeleccionado(fetchedEmpleados[emails.indexOf(currentUser.email)])
                    }
                });
                setEmpleados(fetchedEmpleados);
            })

    }, []/*judas*/)
    //----Termina comprobar usuario
    const history = useHistory();


    const myEventsList = [
        {
            id: 1,
            title: 'Turno 1',
            start: new Date(2020, 7, 3, 10),
            end: new Date(2020, 7, 3, 11),
        },
        {
            id: 2,
            title: 'Turno 2',
            start: new Date(2020, 7, 3, 16),
            end: new Date(2020, 7, 3, 20),
        }
    ]

    return <div className="App">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <a className="link-color" href="dashboard-main.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Horarios</li>
        </ol>
        <div className="card mb-3 col-lg-12">
            <div className="card-header">
                <i className="fa fa-table"></i> Horarios
            </div>

            <div className="card-body" >
                <Calendar
                    views={['month', 'day', 'week']}

                    messages={messages}
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    style={{
                        height: '700px',
                    }}
                />
            </div>
        </div>

        <footer className="sticky-footer">
            <div className="container">
                <div className="text-center">
                    <small>Copyright © Resérvalo 2020</small>
                </div>
            </div>
        </footer>
        <a className="scroll-to-top rounded" href="#page-top">
            <i className="fa fa-angle-up"></i>
        </a>
    </div >

};

export default HorariosUser;