import React, { useState, useEffect, useCallback } from 'react'
import * as firebase from 'firebase'
import DatePicker from 'react-datepicker'
import '../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/citas-detalladas.css';
import CitasDetalladas from '../DashboardCitasDetalladas/citasDetalladas'
import { useHistory } from 'react-router-dom';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

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
    const [horarios, setHorarios] = useState([]);
    const [citaDate, setCitaDate] = useState(
        setHours(setMinutes(new Date(), 30), 16)
    );
    const [disp, setDisp] = useState([])
    const [necesitaPrecio, setPrecio] = useState();
    const [empleadoSelect, setEmpleadoSelect] = useState();
    const [empleados, setEmpleados] = useState([]);
    const history = useHistory();
    const [citas, setCitas] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [ids, setIDs] = useState([]);
    let varid = 0;
    let textInput = React.createRef();
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState("");
    const [servicios, setServicios] = useState([]);
    //Para sacar los servicios
    useEffect(() => {
        database.collection('NegociosDev').doc('Peluquerías').collection('Negocios').doc('PR01').collection('servicios').get()
            .then(response => {
                const fetchedServicios = [];

                response.forEach(document => {
                    const fetchedServicio = {
                        id: document.id,
                        ...document.data()
                    };

                    fetchedServicios.push(fetchedServicio);
                });
                setServicios(fetchedServicios);

            })

    }, []/*judas*/)

    //Para sacar los empleados
    useEffect(() => {
        database.collection('NegociosDev').doc('Peluquerías').collection('Negocios').doc('PR01').collection('empleados').get()
            .then(response => {
                const fetchedEmpleados = [];
                response.forEach(document => {
                    const fetchedEmpleado = {
                        id: document.id,
                        ...document.data()
                    };
                    fetchedEmpleados.push(fetchedEmpleado);
                });
                setEmpleados(fetchedEmpleados);
            })

    }, []/*judas*/)

    //Para sacar los horarios del empleado seleccionado




    //Para sacar si el usuario existe
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
                });
                setUsers(fetchedUsers);
                if (fetchedUsers.length !== 0) {
                    setTitle('✔️')
                } else {
                    setTitle('❌')
                }
            })
    }
    ///NegociosDev/Peluquerías/Negocios/PR01/citas/1xCDFWiDx3jUdKo8R3AG

    const pepe = (e) => (
        setPrecio(e.target.value)
    )
    const selEmpleado = (e) => (
        disp.length = 0,
        setEmpleadoSelect(e.target.value),
        database.collection('NegociosDev').doc('Peluquerías').collection('Negocios').doc('PR01').collection('empleados').doc(e.target.value).collection('horarios').get()
            .then(response => {
                const fetchedHorarios = [];
                const fetchedIDs = [];
                response.forEach(document => {
                    const fetchedHorario = {
                        id: document.id,
                        ...document.data()
                    };
                    const fetchedID = document.id;

                    fetchedIDs.push(fetchedID);
                    fetchedHorarios.push(fetchedHorario);
                });
                setIDs(fetchedIDs)
                setHorarios(fetchedHorarios);

                fetchedHorarios.map(h => (
                    h.turnos[0].Uid.split(' ')[0].split('-')[1].replace('0', '') == citaDate.getMonth() + 1 && h.turnos[0].Uid.split(' ')[0].split('-')[2].replace('0', '') == citaDate.getDay()
                        ?
                        h.disponibilidad.map(dispon => (
                            disp.push(setHours(setMinutes(new Date(), dispon.split(':')[1]), dispon.split(':')[0]))
                        ))
                        :
                        console.log('adios')
                ))
            })

    )
    function Prueba() {
        return (
            necesitaPrecio === 'Coloración' || necesitaPrecio === 'Mechas' || necesitaPrecio === 'Reflejos'
                ?
                <div>
                    <div className="form-group">
                        <label htmlFor="first_name">Precio</label>
                        <input type="number" className="form-control" id="precio" placeholder="Precio" required autoComplete="on"></input>
                        <span className="help-block"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="first_name">Duracion</label>
                        <input type="number" className="form-control" id="duracion" placeholder="20" required autoComplete="on"></input>
                        <span className="help-block"> (en minutos) </span>
                    </div>
                </div>
                :
                <div
                ></div>
        )
    }
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
                            {users.map((user) => (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="first_name">Nombre</label>
                                        <input readOnly type="text" value={user.Nombre} className="form-control" id="first_name" placeholder="pepe" required autoComplete="on"></input>
                                        <span className="help-block"></span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="last_name">Apellidos</label>
                                        <input readOnly type="text" value={user.Apellidos} className="form-control" id="last_name" placeholder="holita" required autoComplete="on"></input>
                                        <span className="help-block"></span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="sel1">Servicio:</label>
                                        <select className="form-control" onChange={pepe}>
                                            {servicios.map((servicio) =>
                                                <option>{servicio.nombre}</option>
                                            )}

                                        </select>
                                        <Prueba></Prueba>
                                        <span className="help-block"></span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="sel1">Empleados disponibles:</label>

                                        <select className="form-control" onChange={selEmpleado}>
                                            <option> - Seleccione un empleado - </option>

                                            {empleados.map((empleado) =>
                                                <option>{empleado.Nombre}</option>
                                            )}

                                        </select>
                                        <span className="help-block"></span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email_address_confirm">Fecha y hora</label>
                                        <br></br>
                                        <DatePicker
                                            showTimeSelect
                                            selected={citaDate}
                                            timeIntervals={10}
                                            onChange={date => setCitaDate(date)}
                                            dateFormat="yyyy-M-dd h:mm aa"
                                            includeTimes={disp}

                                        />
                                        <span className="help-block"></span>
                                    </div>
                                </div>
                            ))}
                            <button className="btn btn-lg btn-primary btn-block" type="submit">Make appointment</button>
                        </div>
                        : title === '❌' ?
                            <div>
                                <div className="form-group">
                                    <label htmlFor="first_name">Nombre</label>
                                    <input type="text" className="form-control" id="first_name" placeholder="Nombre" required autoComplete="on"></input>
                                    <span className="help-block"></span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="sel1">Servicio:</label>
                                    <select className="form-control" onChange={pepe}>
                                        {servicios.map((servicio) =>
                                            <option>{servicio.nombre}</option>
                                        )}
                                    </select>
                                    <Prueba></Prueba>
                                    <span className="help-block"></span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email_address_confirm">Fecha y hora</label>
                                    <br></br>
                                    <DatePicker
                                        showTimeSelect
                                        selected={citaDate}
                                        onChange={date => setCitaDate(date)}
                                        dateFormat="d-M-yyyy h:mm aa"
                                        includeTimes={disp}
                                    />
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