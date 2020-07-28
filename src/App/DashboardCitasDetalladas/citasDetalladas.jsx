import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import * as firebase from 'firebase'
import Moment from 'react-moment';
import '../../css/dashboard-init.css'
import CheckUserLoggedIn from '../Restrict'

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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.firestore();

const CitasDetalladas = (id) => {
    CheckUserLoggedIn();
    const location = useLocation();
    const [citas, setCitas] = useState([]);
    const cita = citas[location.state.id]
    const [users, setUsers] = useState([])

    useEffect(() => {
        database.collection('NegociosDev').doc(location.state.empleadoref.split('/')[1]).collection('Negocios').doc(location.state.empleadoref.split('/')[3]).collection('citas').get()
            .then(response => {
                const fetchedCitas = [];
                response.forEach(document => {
                    const fetchedCita = {
                        id: document.id,
                        ...document.data()
                    };
                    if (fetchedCita.CheckIn.split(' ')[0] === location.state.date) {
                        fetchedCitas.push(fetchedCita);
                    }
                });
                setCitas(fetchedCitas);
            })
        database.collection('UsuariosDev').get()
            .then(response => {
                const fetchedUsers = [];
                response.forEach(document => {
                    const fetchedUser = {
                        id: document.id,
                        ...document.data()
                    };
                    fetchedUsers.push(fetchedUser);
                });
                setUsers(fetchedUsers);
            })


    }, [location]);


    function isEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }

        return true;
    }
    function horaEntrada() {
        if (!isEmpty(cita)) {
            return cita.CheckIn.split(" ")[1].split(".")[0];
        }
    }
    function servicio() {
        if (!isEmpty(cita)) {
            return cita.Servicio;
        }
    }
    function horaSalida() {
        if (!isEmpty(cita)) {
            return cita.CheckOut.split(" ")[1].split(".")[0];
        }
    }
    function info() {
        if (!isEmpty(cita)) {
            return cita.extraInformation;
        }
    }
    function userGetNombre() {
        let nombre = "null";
        if (!isEmpty(cita)) {
            users.map((us) => {
                if (us.id == cita.idUsuario)
                    nombre = us.Nombre
            });
        }
        return nombre;
    }
    function userGetTelefono() {
        let telefono = "null";
        if (!isEmpty(cita)) {
            users.map((us) => {
                if (us.id == cita.idUsuario)
                    telefono = us.Telefono
            });
        }
        return telefono;
    }
    function duracion() {
        if (!isEmpty(cita)) {
            //const date = new Date(cita.CheckOut);
            const horasIn = cita.CheckIn.split(" ")[1].split(".")[0].split(":")[0];
            const minutosIn = cita.CheckIn.split(" ")[1].split(".")[0].split(":")[1];
            return <div>
                <Moment subtract={{ hours: horasIn, minutes: minutosIn }} format='HH:mm'>{cita.CheckOut}</Moment>
            </div>

        }

    }

    return <div>
        <div className="container-fluid">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <a className="link-color" href="dashboard-main.html">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Citas</li>
            </ol>
            <div className="card mb-3 col-lg-12">
                <div className="card-header">
                    <i className="fa fa-table"></i> Cita {location.state.date}
                </div>
                <div className="wrap" data-pos="0">
                    <div className="headbar">
                        <i className="zmdi zmdi-arrow-left btnBack"></i> <span>Cita</span>
                    </div>
                    <div className="header">
                        <div className="bg"></div>
                        <div className="filter"></div>
                        <div className="title">
                            <div className="fromPlace">
                                {horaEntrada()}
                            </div>
                            <span className="separator"><i className="fa fa-location-arrow"></i></span>
                            <div className="toPlace">
                                {horaSalida()}
                            </div>
                        </div>
                        <div className="map"></div>
                    </div>

                    <div className="content">
                        <section>
                            <div className="form">
                                <div className="control select">
                                    <div className="control-head">
                                        <i className="fa fa-mobile-phone"></i>
                                        <span className="close"><i className="fa fa-mobile-phone"></i></span>
                                        <div>
                                            <h6>Teléfono</h6>
                                            <span className="airport-name" data-role="from">{userGetTelefono()}</span>
                                        </div>
                                    </div>

                                </div>
                                <div className="control select">
                                    <div className="control-head">
                                        <i className="fa fa-user" style={{ fontSize: '1.2em' }}></i>
                                        <span className="close"><i className="fa fa-user"></i></span>
                                        <div>
                                            <h6>Nombre</h6>
                                            <span className="airport-name" data-role="to">{userGetNombre()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="control select">
                                    <div className="control-head">
                                        <i className="fa fa-tag" style={{ fontSize: '1.2em' }}></i>
                                        <span className="close"><i className="fa fa-tag"></i></span>
                                        <div>
                                            <h6>Servicio</h6>
                                            <span className="airport-name" data-role="to">{servicio()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="control select">
                                    <div className="control-head">
                                        <i className="fa fa-clock-o" style={{ fontSize: '1.2em' }}></i>
                                        <span className="close"><i className="fa fa-clock-o"></i></span>
                                        <div>
                                            <h6>Duración</h6>
                                            <span className="airport-name" data-role="to">{duracion()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="control select">
                                    <div className="control-head">
                                        <i className="fa fa-id-card " style={{ fontSize: '1.2em' }}></i>
                                        <span className="close"><i className="fa fa-id-card "></i></span>
                                        <div>
                                            <h6>Profesional</h6>
                                            <span className="airport-name" data-role="to">{info()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="control select">
                                    <div className="control-head">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-offset-3 col-md-6 text-center">
                                                    <button style={{ backgroundColor: '#E6495A', marginTop: '1%' }} className="btn btn-default">Editar
                          cita</button>
                                                </div>
                                                <div className="col-md-offset-3 col-md-6 text-center">
                                                    <button style={{ backgroundColor: '#E6495A', marginTop: '1%' }} className="btn btn-default">Lo otro</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
        < footer className="sticky-footer" >
            <div className="container">
                <div className="text-center">
                    <small>Copyright © Resérvalo 2020</small>
                </div>
            </div>
        </footer >
        <a className="scroll-to-top rounded" href="#page-top">
            <i className="fa fa-angle-up"></i>
        </a>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">¿Ya te vas?</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">¿Estás seguro de querer cerrar sesión?</div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                        <a className="btn btn-primary" style={{ backgroundColor: 'E6495A', borderColor: 'E6495A' }} href="login.html">Sí</a>
                    </div>
                </div>
            </div>
        </div>
    </div >
};
export default CitasDetalladas;