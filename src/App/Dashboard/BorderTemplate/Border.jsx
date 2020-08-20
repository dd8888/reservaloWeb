import React, { useState } from 'react'
import '../../../css/dashboard-init.css'
import PropTypes from 'prop-types'
import * as firebase from 'firebase'
import { withRouter, Redirect, Link } from 'react-router'
import { NavLink } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert';

//Buscar citas que no se puede poner porque necesita saber el empleado y solo se puede enviar desde la página de citas
/*
                    <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Link">
                        <NavLink to="/crearCita" activeStyle={{
                            color: '#E6495A'
                        }} className="nav-link">
                            <i className="fa fa-fw fa-link"></i>
                            <span className="nav-link-text">Nueva cita</span>

                        </NavLink>
                    </li>
*/

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

const logo = require('../../../Resources/main-icon.png');
const Border = () => {
    const [isOpen, setOpen] = useState(false);
    const signOutUser = () => {
        firebase.auth().signOut().then(function () {
        }).catch(function (error) {
            alert(error)
        });
    }

    return (<div>
        <SweetAlert
            warning
            showCancel
            show={isOpen} //Notice how we bind the show property to our component state
            confirmBtnText="Sí"
            cancelBtnText='No'
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="danger"
            title="¿Te vas?"
            onConfirm={signOutUser}
            onCancel={() => {
                console.log("bye");
                setOpen(false); // Don't forget to close the modal
            }}
        //focusCancelBtn
        >
            ¿Estás seguro de que quieres salir?
      </SweetAlert>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
            <a className="navbar-brand" href="#">
                <img src={logo} className="icon-top" alt="icon"></img>
            </a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
                    <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Link">
                        <NavLink to="/perfil" activeStyle={{
                            color: '#E6495A'
                        }} className="nav-link">
                            <i className="fa fa-fw fa-user"></i>
                            <span className="nav-link-text"> Perfil</span>

                        </NavLink>
                    </li>
                    <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Tables">
                        <NavLink to="/citas" activeStyle={{
                            color: '#E6495A'
                        }} className="nav-link">
                            <i className="fa fa-fw fa-link"></i>
                            <span className="nav-link-text">Buscar citas</span>

                        </NavLink>
                        <NavLink to="/productos" activeStyle={{
                            color: '#E6495A'
                        }} className="nav-link">
                            <i className="fa fa-list-alt"></i>
                            <span className="nav-link-text"> Mis productos</span>

                        </NavLink>
                    </li>
                    <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Link">
                        <NavLink to="/servicios" activeStyle={{
                            color: '#E6495A'
                        }} className="nav-link">
                            <i className="fa fa-magic"></i>
                            <span className="nav-link-text"> Servicios</span>
                        </NavLink>
                    </li>
                    <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
                        <a className="nav-link" href="generar-factura.html">
                            <i className="fa fa-fw fa-area-chart"></i>
                            <span className="nav-link-text">Generar factura</span>
                        </a>
                    </li>
                    <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Menu Levels">
                        <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMulti"
                            data-parent="#exampleAccordion">
                            <i className="fa fa-fw fa-sitemap"></i>
                            <span className="nav-link-text">Menu Levels</span>
                        </a>
                        <ul className="sidenav-second-level collapse" id="collapseMulti">
                            <li>
                                <a href="#">Second Level Item</a>
                            </li>
                            <li>
                                <a href="#">Second Level Item</a>
                            </li>
                            <li>
                                <a href="#">Second Level Item</a>
                            </li>
                            <li>
                                <a className="nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMulti2">Third Level</a>
                                <ul className="sidenav-third-level collapse" id="collapseMulti2">
                                    <li>
                                        <a href="#">Third Level Item</a>
                                    </li>
                                    <li>
                                        <a href="#">Third Level Item</a>
                                    </li>
                                    <li>
                                        <a href="#">Third Level Item</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>





                    <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Link">
                        <NavLink to="/horarios" activeStyle={{
                            color: '#E6495A'
                        }} className="nav-link">
                            <i className="fa fa-calendar-check-o"></i>
                            <span className="nav-link-text"> Horarios</span>

                        </NavLink>
                    </li>

                    <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Link">
                        <NavLink to="/fichar" activeStyle={{
                            color: '#E6495A'
                        }} className="nav-link">
                            <i className="fa fa-qrcode"></i>
                            <span className="nav-link-text"> Fichar</span>

                        </NavLink>
                    </li>


                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle mr-lg-2" id="messagesDropdown" href="#" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-fw fa-envelope"></i>
                            <span className="d-lg-none">Messages
                <span className="badge badge-pill badge-primary">12 New</span>
                            </span>
                            <span className="indicator text-primary d-none d-lg-block">
                                <i className="fa fa-fw fa-circle"></i>
                            </span>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="messagesDropdown">
                            <h6 className="dropdown-header">New Messages:</h6>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                                <strong>David Miller</strong>
                                <span className="small float-right text-muted">11:21 AM</span>
                                <div className="dropdown-message small">Hey there! This new version of SB Admin is pretty awesome! These
                  messages clip off when they reach the end of the box so they don't overflow over to the sides!</div>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                                <strong>Jane Smith</strong>
                                <span className="small float-right text-muted">11:21 AM</span>
                                <div className="dropdown-message small">I was wondering if you could meet for an appointment at 3:00 instead
                  of 4:00. Thanks!</div>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                                <strong>John Doe</strong>
                                <span className="small float-right text-muted">11:21 AM</span>
                                <div className="dropdown-message small">I've sent the final files over to you for review. When you're able to
                  sign off of them let me know and we can discuss distribution.</div>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item small" href="#">View all messages</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle mr-lg-2" id="alertsDropdown" href="#" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-fw fa-bell"></i>
                            <span className="d-lg-none">Alerts
                <span className="badge badge-pill badge-warning">6 New</span>
                            </span>
                            <span className="indicator text-warning d-none d-lg-block">
                                <i className="fa fa-fw fa-circle"></i>
                            </span>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="alertsDropdown">
                            <h6 className="dropdown-header">New Alerts:</h6>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                                <span className="text-success">
                                    <strong>
                                        <i className="fa fa-long-arrow-up fa-fw"></i>Status Update</strong>
                                </span>
                                <span className="small float-right text-muted">11:21 AM</span>
                                <div className="dropdown-message small">This is an automated server response message. All systems are online.
                </div>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                                <span className="text-danger">
                                    <strong>
                                        <i className="fa fa-long-arrow-down fa-fw"></i>Status Update</strong>
                                </span>
                                <span className="small float-right text-muted">11:21 AM</span>
                                <div className="dropdown-message small">This is an automated server response message. All systems are online.
                </div>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                                <span className="text-success">
                                    <strong>
                                        <i className="fa fa-long-arrow-up fa-fw"></i>Status Update</strong>
                                </span>
                                <span className="small float-right text-muted">11:21 AM</span>
                                <div className="dropdown-message small">This is an automated server response message. All systems are online.
                </div>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item small" href="#">View all alerts</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <form className="form-inline my-2 my-lg-0 mr-lg-2">
                            <div className="input-group">
                                <input className="form-control" type="text" placeholder="Search for...">

                                </input>
                                <span className="input-group-append">
                                    <button className="btn btn-primary" style={{ backgroundColor: "#E6495A", borderColor: "#E6495A" }} type="button">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </span>
                            </div>
                        </form>
                    </li>
                    <li className="nav-item">
                        <a onClick={() => {
                            setOpen(true); // Open the modal
                        }} className="nav-link" data-toggle="modal" data-target="#exampleModal">
                            <i className="fa fa-fw fa-sign-out"></i>Cerrar sesión</a>
                    </li>
                </ul>
            </div>
        </nav >
    </div>
    )
};

Border.propTypes = {
    isClicked: PropTypes.func
};
export default Border;