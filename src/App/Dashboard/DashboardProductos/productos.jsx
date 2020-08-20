import React, { useState, useEffect, useContext } from 'react'
import * as firebase from 'firebase'
import DatePicker from 'react-datepicker'
import '../../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import '../../../css/dashboard-init.css'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Auth';
import SweetAlert from 'react-bootstrap-sweetalert';


import Pdf from "react-to-pdf";
const ref = React.createRef();





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


const Productos = () => {
    //Comprobar usuario ----
    var BreakException = {};
    const { currentUser } = useContext(AuthContext);
    const [empleados, setEmpleados] = useState([]);
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState();
    let nombreInput = React.createRef();
    let precioInput = React.createRef();
    let cantidadInput = React.createRef();

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

    const [servicios, setServicios] = useState([]);

    const history = useHistory();
    const [updateSer, setUpdateSer] = useState(1);
    useEffect(() => {
        if (empleadoSeleccionado !== undefined) {
            database.collection('NegociosDev').doc(empleadoSeleccionado.RefNegocio.path.split('/')[1]).collection('Negocios').doc(empleadoSeleccionado.RefNegocio.path.split('/')[3]).collection('servicios').get()
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
        }
    }, [empleadoSeleccionado, updateSer]/*judas*/)

    const [isOpenBorrar, setOpenBorrar] = useState(false);
    const [isOpenCrear, setOpenCrear] = useState(false);
    const [isOpenEditar, setOpenEditar] = useState(false);

    const [servicioSelec, setServicioSelec] = useState();
    const [crearVisible, setCrearVisible] = useState(false);
    const [editarVisible, setEditarVisible] = useState(false);

    function camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    const crearServicio = () => {
        if (nombreInput.current.value != null && cantidadInput.current.value != null && precioInput.current.value != null) {
            database.collection('NegociosDev').doc(empleadoSeleccionado.RefNegocio.path.split('/')[1]).collection('Negocios').doc(empleadoSeleccionado.RefNegocio.path.split('/')[3]).collection('servicios').doc(camelize(nombreInput.current.value)).set({
                nombre: nombreInput.current.value,
                duracion: cantidadInput.current.value,
                precio: precioInput.current.value
            })
            setUpdateSer(updateSer + 1)
            setOpenCrear(true)
        }
    }

    const editarServicio = () => {
        if (nombreInput.current.value != null && cantidadInput.current.value != null && precioInput.current.value != null) {
            database.collection('NegociosDev').doc(empleadoSeleccionado.RefNegocio.path.split('/')[1]).collection('Negocios').doc(empleadoSeleccionado.RefNegocio.path.split('/')[3]).collection('servicios').doc(servicioSelec.id).update({
                nombre: nombreInput.current.value,
                duracion: cantidadInput.current.value,
                precio: precioInput.current.value
            })
            setUpdateSer(updateSer + 1)
            setOpenEditar(true)
        }
    }

    const [isEditable, setEditable] = useState(false);

    return <div className="App">
        <SweetAlert
            danger
            title="¿Estás seguro de borrar esta cita?"
            showCancel
            confirmBtnText="Sí, borrar"
            cancelBtnText="Mejor no"
            cancelBtnBsStyle="No"
            confirmBtnBsStyle="danger"
            show={isOpenBorrar} //Notice how we bind the show property to our component state
            onConfirm={() => {
                try {
                    database.collection('NegociosDev').doc(empleadoSeleccionado.RefNegocio.path.split('/')[1]).collection('Negocios').doc(empleadoSeleccionado.RefNegocio.path.split('/')[3]).collection('servicios').doc(servicioSelec.id).delete();
                } catch (err) {
                    console.log(err)
                } finally {
                    setOpenBorrar(false)
                    setServicios(servicios.filter(function (el) { return el.id != servicioSelec.id; }));
                }

            }}
            onCancel={() => setOpenBorrar(false)}
        >
        </SweetAlert>
        <SweetAlert
            success
            title="¡Servicio editado con éxito!"
            show={isOpenEditar} //Notice how we bind the show property to our component state
            onConfirm={() => {
                setOpenEditar(false);
            }}
        >
            Pulsa "Ok" para volver
      </SweetAlert>
        <SweetAlert
            success
            title="¡Servicio creado con éxito!"
            show={isOpenCrear} //Notice how we bind the show property to our component state
            onConfirm={() => {
                setOpenCrear(false);
            }}
        >
            Pulsa "Ok" para volver
      </SweetAlert>
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <a className="link-color" href="dashboard-main.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Productos</li>
        </ol>
        <div className="card mb-3 col-lg-12">
            <div className="card-header">

                <i className="fa fa-list-alt"></i> Productos
                <button onClick={() => setCrearVisible(true)} style={{ float: 'right', backgroundColor: '#E6495A', marginLeft: '1%', marginTop: '-0.3%' }} className="btn btn-default">Registrar nuevo producto</button>

            </div>

            <div className="card-body">
                {crearVisible ?
                    <form className="form-group">
                        <h2>Registrar nuevo producto</h2>
                        <div>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="first_name">Nombre</label>
                                    <input ref={nombreInput} type="text" className="form-control" id="first_name" placeholder="Nombre" required autoComplete="on"></input>
                                    <span className="help-block"></span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="first_name">Cantidad</label>
                                    <input ref={cantidadInput} type="text" className="form-control" id="first_name" placeholder="Cantidad" required autoComplete="on"></input>
                                    <span className="help-block"></span>
                                </div>
                            </div>
                            <button onClick={() => { crearServicio(); setCrearVisible(false) }} className="btn btn-lg btn-primary btn-block" type='button' >Guardar producto</button>
                        </div>
                    </form>
                    :
                    <div></div>}
                {editarVisible ?
                    <form className="form-group">
                        <h2>Editar servicio</h2>
                        <div>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="first_name">Nombre</label>
                                    <input defaultValue={servicioSelec.nombre} ref={nombreInput} type="text" className="form-control" id="first_name" placeholder="Nombre" required autoComplete="on"></input>
                                    <span className="help-block"></span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="first_name">Cantidad</label>
                                    <input defaultValue={servicioSelec.precio} ref={cantidadInput} type="text" className="form-control" id="first_name" placeholder="Cantidad" required autoComplete="on"></input>
                                    <span className="help-block"></span>
                                </div>

                            </div>
                            <button onClick={() => { editarServicio(); setEditarVisible(false) }} className="btn btn-lg btn-primary btn-block" type='button' >Guardar producto</button>
                        </div>
                    </form>
                    :
                    <div></div>}

                <div className="table-responsive">
                    <table className="table table-bordered TreeTable" id="TreeTable" width="100%"
                        cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Editar</th>
                                <th>Borrar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicios.map((servicio, i) =>
                                <tr className='clickable-row' key={i} >
                                    <td>{servicio.nombre}</td>
                                    <td>{servicio.precio}</td>
                                    <td><button style={{ backgroundColor: '#E6495A', margin: 'auto', border: '1px solid black', display: 'block' }} className="btn fa fa-edit" type="button" value="" onClick={() => { setServicioSelec(servicio); setEditarVisible(true) }} ></button></td>
                                    <td><button style={{ backgroundColor: '#E6495A', margin: 'auto', border: '1px solid black', display: 'block' }} className="btn fa fa-trash" type="button" value="" onClick={() => { setServicioSelec(servicio); setOpenBorrar(true) }} ></button></td>
                                </tr>
                            )}

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
    </div >

};

export default Productos