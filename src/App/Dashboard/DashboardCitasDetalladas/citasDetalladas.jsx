import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import * as firebase from 'firebase'
import Moment from 'react-moment';
import '../../../css/dashboard-init.css'
import CheckUserLoggedIn from '../../Restrict'
import { useHistory } from 'react-router-dom';
import buildFirebase from '../Assets/firebaseBuilder'

const database = buildFirebase()
const CitasDetalladas = (id) => {
    CheckUserLoggedIn();
    const location = useLocation();
    const [citas, setCitas] = useState([]);
    const cita = citas[location.state.id]
    const [users, setUsers] = useState([])
    const [anons, setAnons] = useState([])

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
        database.collection('AnonimosDev').get()
            .then(response => {
                const fetchedAnon = [];
                response.forEach(doc => {
                    const fetchedAn = {
                        id: doc.id,
                        ...doc.data()
                    };
                    fetchedAnon.push(fetchedAn);
                });
                setAnons(fetchedAnon)
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
                if (us.id == cita.idUsuario) {
                    nombre = us.Nombre
                }
            });
            anons.map((an) => {
                if (an.id == cita.idUsuario) {
                    nombre = an.Nombre
                }
            })
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
            anons.map((an) => {
                if (an.id == cita.idUsuario) {
                    telefono = an.Telefono
                }
            })
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
    const history = useHistory();

    const handleClickEdit = () => {
        if (!isEmpty(cita)) {

            history.push({
                pathname: "/editarCita",
                state: {
                    cita_id: cita.id,
                    cita_idUsuario: cita.idUsuario,
                    users: Object.create(users),
                    anons: Object.create(anons),
                    empleadoref: location.state.empleadoref,

                }
            });
        }
    }


    return <div>
        <div className="container-fluid">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <a className="link-color" href="#">Dashboard</a>
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
                                                    <button style={{ backgroundColor: '#E6495A', marginTop: '1%' }} className="btn btn-default" onClick={handleClickEdit}>Editar
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


    </div >
};
export default CitasDetalladas;