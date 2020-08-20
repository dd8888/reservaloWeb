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


const Citas = () => {
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

    const [citas, setCitas] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [ids, setIDs] = useState([]);
    let varid = 0;

    const history = useHistory();

    useEffect(() => {
        //database.collection('NegociosDev').doc(empleadoSeleccionado.RefNegocio.split('/')[1]).collection('Negocios').doc(empleadoSeleccionado.RefNegocio.split('/')[3]).collection('citas').where('CheckIn', '>=', startDate.toISOString().split('T')[0]).get()
        if (empleadoSeleccionado !== undefined) {
            database.collection('NegociosDev').doc(empleadoSeleccionado.RefNegocio.path.split('/')[1]).collection('Negocios').doc(empleadoSeleccionado.RefNegocio.path.split('/')[3]).collection('citas').get()
                .then(response => {
                    const fetchedCitas = [];
                    const fetchedIDs = [];
                    response.forEach(document => {
                        const fetchedCita = {
                            id: document.id,
                            ...document.data()
                        };
                        const fetchedID = document.id;

                        fetchedIDs.push(fetchedID);
                        if (fetchedCita.CheckIn.split(' ')[0] === startDate.toISOString().split('T')[0]) {
                            fetchedCitas.push(fetchedCita);
                        }
                    });
                    setCitas(fetchedCitas);
                    setIDs(fetchedIDs)

                })
        }
    }, [startDate, empleadoSeleccionado]/*judas*/)

    const handleClick = (i) => {
        if (empleadoSeleccionado !== undefined) {
            history.push({
                pathname: "/citaDetallada",
                state: {
                    empleadoref: empleadoSeleccionado.RefNegocio.path,
                    citaid: ids[i],
                    date: startDate.toISOString().split('T')[0],
                    id: i,
                }
            });
        }
    }

    const handleClickCrear = () => {
        history.push({
            pathname: "/crearCita",
            state: {
                empleadoref: empleadoSeleccionado.RefNegocio.path
            }
        });
    }

    const handleClickToPDF = () => {
        history.push({
            pathname: "/exportarPDF",
            state: {
                date: citas,
                dia: startDate.toISOString().split('T')[0]
            }
        })
    }

    const [isOpenBorrar, setOpenBorrar] = useState(false)
    const [citaSelec, setCitaSelec] = useState()

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
                    database.collection('NegociosDev').doc(empleadoSeleccionado.RefNegocio.path.split('/')[1]).collection('Negocios').doc(empleadoSeleccionado.RefNegocio.path.split('/')[3]).collection('citas').doc(citaSelec.id).delete();
                    database.collection('NegociosDev').doc(empleadoSeleccionado.RefNegocio.path.split('/')[1]).collection('Negocios').doc(empleadoSeleccionado.RefNegocio.path.split('/')[3]).collection('empleados').doc(citaSelec.extraInformation).update({ "citas": firebase.firestore.FieldValue.arrayRemove(database.doc('NegociosDev/' + empleadoSeleccionado.RefNegocio.path.split('/')[1] + '/Negocios/' + empleadoSeleccionado.RefNegocio.path.split('/')[3] + '/citas/' + citaSelec.id)) })
                    database.collection('UsuariosDev').doc(citaSelec.idUsuario).update({ "citas": firebase.firestore.FieldValue.arrayRemove(database.doc('NegociosDev/' + empleadoSeleccionado.RefNegocio.path.split('/')[1] + '/Negocios/' + empleadoSeleccionado.RefNegocio.path.split('/')[3] + '/citas/' + citaSelec.id)) })
                } catch (err) {
                    console.log(err)
                } finally {
                    window.location.reload(false);
                }

            }}
            onCancel={() => setOpenBorrar(false)}
        >
        </SweetAlert>
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <a className="link-color" href="dashboard-main.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Citas</li>
        </ol>
        <div className="card mb-3 col-lg-12">
            <div className="card-header">
                <i className="fa fa-table"></i> Citas del día <DatePicker
                    selected={startDate} onChange={date => setStartDate(date)} />
                <button onClick={() => handleClickCrear()} style={{ float: 'right', backgroundColor: '#E6495A', marginLeft: '1%', marginTop: '-0.3%' }} className="btn btn-default">Nueva cita</button>
                <button onClick={() => handleClickToPDF()} style={{ float: 'right', backgroundColor: '#E6495A', marginLeft: '1%', marginTop: '-0.3%' }} className="btn btn-default">Exportar citas</button>

            </div>

            <div className="card-body" ref={ref}>
                <div className="table-responsive">
                    <table className="table table-bordered TreeTable" id="TreeTable" width="100%"
                        cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Horario entrada</th>
                                <th>Horario salida</th>
                                <th>Precio</th>
                                <th>Servicio</th>
                                <th>Detalles</th>
                                <th>Borrar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {citas.map((cita, i) => (
                                <tr className='clickable-row' key={i} >
                                    <td>{cita.CheckIn}</td>
                                    <td>{cita.CheckOut}</td>
                                    <td>{cita.Precio}</td>
                                    <td>{cita.Servicio}</td>
                                    <td><button style={{ backgroundColor: '#E6495A', margin: 'auto', border: '1px solid black', display: 'block' }} className="btn fa fa-info" type="button" value="" onClick={() => handleClick(i)} ></button></td>
                                    <td><button style={{ backgroundColor: '#E6495A', margin: 'auto', border: '1px solid black', display: 'block' }} className="btn fa fa-trash" type="button" value="" onClick={() => { setCitaSelec(cita); setOpenBorrar(true) }} ></button></td>
                                </tr>
                            ))}

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

export default Citas;