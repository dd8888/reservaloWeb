import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase'
import DatePicker from 'react-datepicker'
import '../../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import '../../../css/dashboard-init.css'
import { useHistory } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import buildFirebase from '../Assets/firebaseBuilder'
import buildEmpleados from '../Assets/empleadosBuilder'
import Footer from '../BorderTemplate/Footer'

const database = buildFirebase()

const ref = React.createRef();

const Citas = () => {
    //Comprobar usuario ----
    const empleadoSeleccionado = buildEmpleados().empleadoSeleccionado;


    const [citas, setCitas] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [ids, setIDs] = useState([]);

    const history = useHistory();

    useEffect(() => {
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

    return <div className="App" >
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
                <a className="link-color" href="#">Dashboard</a>
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

        <Footer></Footer>

    </div >

};

export default Citas;