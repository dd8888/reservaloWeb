import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from "react-router-dom";
import * as firebase from 'firebase'
import DatePicker from 'react-datepicker'
import '../../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import '../../../css/dashboard-init.css'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Auth';
import buildFirebase from '../Assets/firebaseBuilder'
import buildEmpleados from '../Assets/empleadosBuilder'
import Footer from '../BorderTemplate/Footer'
import Pdf from "react-to-pdf";

const ref = React.createRef();

const options = {
    orientation: 'landscape',
    unit: 'px',
    format: [window.innerWidth
        , window.innerHeight
    ]
};
const database = buildFirebase();

const CitasPDF = () => {
    //Comprobar usuario ----
    var BreakException = {};
    const { currentUser } = useContext(AuthContext);
    const empleadoSeleccionado = buildEmpleados().empleadoSeleccionado;
    const empleados = buildEmpleados().empleados;
    const [users, setUsers] = useState([])
    const location = useLocation();

    useEffect(() => {
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

    }, [])

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
        <Footer></Footer>
    </div >

};


export default CitasPDF;