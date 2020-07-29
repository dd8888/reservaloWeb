import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from "react-router-dom";
import * as firebase from 'firebase'
import DatePicker from 'react-datepicker'
import '../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import '../../css/dashboard-init.css'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Auth';

import Pdf from "react-to-pdf";

const ref = React.createRef();

const options = {
    orientation: 'landscape',
    unit: 'px',
    format: [window.innerWidth
        , window.innerHeight
    ]
};

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

const CitasPDF = () => {
    //Comprobar usuario ----
    var BreakException = {};
    const { currentUser } = useContext(AuthContext);
    const [empleados, setEmpleados] = useState([]);
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState();
    const [users, setUsers] = useState([])
    const location = useLocation();

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

    }, []/*judas*/)
    //----Termina comprobar usuario
    function isEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }

        return true;
    }

    //Comprubelo la pos icion del array de users donde está el id que me llega para después buscar el nombre
    function userGetNombre(id) {
        let pos = users.map(function (e) { return e.id; }).indexOf(id);
        let nombre = "null";
        if (!isEmpty(location.state.date)) {
            location.state.date.map((da) => {
                if (id == da.idUsuario) {
                    nombre = users[pos].Nombre

                }
            });
        }
        return nombre;
    }
    function userGetTelefono(id) {
        let pos = users.map(function (e) { return e.id; }).indexOf(id);
        console.log(pos)

        let telefono = "null";
        console.log(users.indexOf())
        if (!isEmpty(location.state.date)) {
            location.state.date.map((da) => {
                if (id == da.idUsuario) {
                    telefono = users[pos].Telefono
                }
            });
        }
        return telefono;
    }
    return <div className="App">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <a className="link-color" href="dashboard-main.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Citas</li>
        </ol>
        <div className="card mb-3 col-lg-12">
            <div className="card-header">
                <Pdf targetRef={ref} filename={"citas_" + location.state.dia} options={options}>
                    {({ toPdf }) => <button onClick={toPdf} style={{ float: 'right', backgroundColor: '#E6495A', marginLeft: '1%', marginTop: '-0.3%' }} className="btn btn-default">Guardar como PDF</button>}
                </Pdf>
            </div>

            <div className="card-body" ref={ref}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}>
                    <h3 style={{
                        color: '#E6495A',
                    }}>Citas del día </h3> <h3>{location.state.dia}</h3>
                </div>
                <br></br>
                <div className="table-responsive">
                    <table className="table table-bordered TreeTable" id="TreeTable" width="100%"
                        cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Horario entrada</th>
                                <th>Horario salida</th>
                                <th>Precio</th>
                                <th>Servicio</th>
                                <th>Nombre</th>
                                <th>Número de teléfono</th>
                            </tr>
                        </thead>
                        <tbody>
                            {location.state.date.map((cita, i) => (
                                users.map((us, i) => (
                                    <tr className='clickable-row' key={i} >
                                        <td>{cita.CheckIn}</td>
                                        <td>{cita.CheckOut}</td>
                                        <td>{cita.Precio}</td>
                                        <td>{cita.Servicio}</td>
                                        <td>{userGetNombre(us.id, i)}</td>
                                        <td>{userGetTelefono(us.id, i)}</td>

                                    </tr>
                                ))))}

                        </tbody>
                    </table>
                    <br></br>
                    <div id="out"></div>
                </div>
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
                        <a className="btn btn-primary" style={{ backgroundColor: "E6495A", borderColor: "E6495A" }} href="login.html">Sí</a>
                    </div>
                </div>
            </div>
        </div>
    </div >

};


export default CitasPDF;