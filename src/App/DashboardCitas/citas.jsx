import React, { useState, useEffect, useContext } from 'react'
import * as firebase from 'firebase'
import DatePicker from 'react-datepicker'
import '../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import '../../css/dashboard-init.css'
import { useHistory } from 'react-router-dom';
import { withRouter, Redirect } from 'react-router'
import { AuthContext } from '../Auth';



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
    const [citas, setCitas] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [ids, setIDs] = useState([]);
    let varid = 0;

    const { currentUser } = useContext(AuthContext);
    const history = useHistory();


    ///NegociosDev/Peluquerías/Negocios/PR01/citas/1xCDFWiDx3jUdKo8R3AG
    useEffect(() => {
        database.collection('NegociosDev').doc('Peluquerías').collection('Negocios').doc('PR01').collection('citas').where('CheckIn', '>=', startDate.toISOString().split('T')[0]).get()
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

                    fetchedCitas.push(fetchedCita);
                });
                setCitas(fetchedCitas);
                setIDs(fetchedIDs)
            })

    }, [startDate]/*judas*/)


    const handleClick = (i) => {
        history.push({
            pathname: "/citasDetalladas",
            search: "?date=" + startDate.toISOString().split('T')[0] + "&id=" + i,
            state: {
                date: startDate.toISOString().split('T')[0],
                id: i,
            }
        });
    }
    const handleClickCrear = () => {
        history.push({
            pathname: "/crearCita",

        });
    }
    if (!currentUser) {
        return <Redirect to="/index" />;
    }
    return <div>
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <a className="link-color" href="dashboard-main.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Citas</li>
        </ol>
        <div className="card mb-3 col-lg-12">
            <div className="card-header">
                <i className="fa fa-table"></i>Citas <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                <button onClick={() => handleClickCrear()} style={{ backgroundColor: '#E6495A', marginLeft: '1%', marginTop: '-0.3%' }} className="btn btn-default">Nueva cita</button>

            </div>

            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered TreeTable" id="TreeTable" width="100%"
                        cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Horario entrada</th>
                                <th>Horario salida</th>
                                <th>Precio</th>
                                <th>Servicio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {citas.map((cita, i) => (
                                <tr className='clickable-row' key={i} onClick={() => handleClick(i)} >
                                    <td>{cita.CheckIn}</td>
                                    <td>{cita.CheckOut}</td>
                                    <td>{cita.Precio}</td>
                                    <td>{cita.Servicio}</td>
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