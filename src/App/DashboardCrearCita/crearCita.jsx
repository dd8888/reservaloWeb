import React, { useState, useEffect, useCallback } from 'react'
import * as firebase from 'firebase'
import DatePicker from 'react-datepicker'
import '../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/citas-detalladas.css';
import CitasDetalladas from '../DashboardCitasDetalladas/citasDetalladas'
import { useHistory } from 'react-router-dom';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";


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


const useFirebase = () => {

    return users;
}
const Citas = () => {

    const history = useHistory();
    const [citas, setCitas] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [ids, setIDs] = useState([]);
    let varid = 0;
    let textInput = React.createRef();
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState("");

    const fetchRequest = () => {
        database.collection('UsuariosDev').where('Telefono', '==', textInput.current.value).get()
            .then(response => {
                const fetchedUsers = [];
                response.forEach(document => {
                    const fetchedUser = {
                        id: document.id,
                        ...document.data()
                    };
                    fetchedUsers.push(fetchedUser);
                    console.log(fetchedUser)
                });
                setUsers(fetchedUsers);
                if (fetchedUsers.length !== 0) {
                    setTitle('✔️')
                } else {
                    setTitle('❌')
                }
            })
    }/*judas*/
    ///NegociosDev/Peluquerías/Negocios/PR01/citas/1xCDFWiDx3jUdKo8R3AG



    /*history.push({
        pathname: "/citasDetalladas",
        search: "?date=" + startDate.toISOString().split('T')[0] + "&id=" + i,
        state: {
            date: startDate.toISOString().split('T')[0],
            id: i,
        }
    });*/

    //hora 
    //recap
    /*
    busco telefono usuarios
    si existe; inserta los datos de usuario, guarda en citas de usuario, citas y citas de peluqueria
    si NO existe; los tiene que rellenar, creo anonimo con numero y nombre, y pongo cita en peluquero y peluqueria
    */
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

                    <i className="fa fa-table"></i>Citas <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                </div>

                <form className="form-group">
                    <h2>Crear nueva cita</h2>
                    <label htmlFor="phone_number">Número de teléfono</label>

                    <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                        {title === '✔️' ?
                            <input readOnly ref={textInput} type="tel" className="form-control" style={{ width: '20%' }} id="phone_number" placeholder="Número de teléfono"></input>
                            :
                            <input ref={textInput} type="tel" className="form-control" style={{ width: '20%' }} id="phone_number" placeholder="Número de teléfono"></input>
                        }
                        <button onClick={fetchRequest} style={{ backgroundColor: '#E6495A', marginLeft: '2%' }} className="btn btn-default">Comprobar teléfono </button>
                        <span style={{ marginLeft: '2%' }} className="help-block">{title}</span>
                    </div>

                    {title === '✔️' ?
                        <div>
                            <div className="form-group">
                                <label htmlFor="first_name">Nombre</label>
                                <input type="text" className="form-control" id="first_name" placeholder="pepe" required autoFocus autoComplete="on"></input>
                                <span className="help-block"></span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Apellido</label>
                                <input type="text" className="form-control" id="last_name" placeholder="holita" required autoFocus autoComplete="on"></input>
                                <span className="help-block"></span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email_address">Email Address</label>
                                <input type="email" className="form-control" id="email_addr" placeholder="Email address" required></input>

                                <span className="help-block"></span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email_address_confirm">Please re-confirm your email address.</label>
                                <input type="email" className="form-control" id="email_address_confirm" placeholder="Confirm email address" required autoComplete="off"></input>

                                <span className="help-block"></span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="dob">Date of Birth</label>
                                <input type="date" className="form-control" id="dob"></input>

                                <span className="help-block"></span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="age">Age</label>
                                <input type="number" className="form-control" id="age" placeholder="Age" min="1" max="110" required></input>
                                <span className="help-block"></span>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block" type="submit">Make appointment</button>
                        </div>
                        : title === '❌' ?
                            <div>
                                <div className="form-group">
                                    <label htmlFor="first_name">Nombre</label>
                                    <input type="text" className="form-control" id="first_name" placeholder="Nombre" required autoFocus autoComplete="on"></input>
                                    <span className="help-block"></span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="last_name">Apellido</label>
                                    <input type="text" className="form-control" id="last_name" placeholder="Last Name" required autoFocus autoComplete="on"></input>
                                    <span className="help-block"></span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email_address">Email Address</label>
                                    <input type="email" className="form-control" id="email_addr" placeholder="Email address" required></input>

                                    <span className="help-block"></span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email_address_confirm">Please re-confirm your email address.</label>
                                    <input type="email" className="form-control" id="email_address_confirm" placeholder="Confirm email address" required autoComplete="off"></input>

                                    <span className="help-block"></span>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="dob">Date of Birth</label>
                                    <input type="date" className="form-control" id="dob"></input>

                                    <span className="help-block"></span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="age">Age</label>
                                    <input type="number" className="form-control" id="age" placeholder="Age" min="1" max="110" required></input>
                                    <span className="help-block"></span>
                                </div>
                                <button className="btn btn-lg btn-primary btn-block" type="submit">Make appointment</button>
                            </div>
                            :
                            <div>
                                <div className="form-group">
                                    <input type="text" className="form-control hide" id="first_name" placeholder="hidden" required autoFocus autoComplete="on"></input>
                                </div>

                            </div>
                    }
                </form>

            </div>
        </div>
    </div >
};

export default Citas;