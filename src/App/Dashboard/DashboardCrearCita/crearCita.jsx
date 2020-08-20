import React, { useState, useEffect, useCallback } from 'react'
import * as firebase from 'firebase'
import DatePicker from 'react-datepicker'
import '../../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import '../../../css/bootstrap.min.css';
import '../../../css/citas-detalladas.css';
import { useHistory, useLocation } from 'react-router-dom';
import CheckUserLoggedIn from '../../Restrict'
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios'

const cors = require('cors')({ origin: true });


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
    CheckUserLoggedIn();
    const location = useLocation();
    const [horarios, setHorarios] = useState([]);
    const [citaDate, setCitaDate] = useState(new Date());
    const [disp, setDisp] = useState([])
    const [servicioSeleccionado, setPrecio] = useState();
    const [empleadoSelect, setEmpleadoSelect] = useState();
    const [empleados, setEmpleados] = useState([]);
    const [horaSelec, setHoraSelec] = useState();
    const history = useHistory();
    const [citas, setCitas] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [ids, setIDs] = useState([]);
    let varid = 0;
    let textInput = React.createRef();
    let nombreUser = React.createRef();
    const [tel, setTel] = useState();
    let duracionInput = React.createRef();
    let precioInput = React.createRef();


    let dur;
    let pre;

    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState("");
    const [servicios, setServicios] = useState([]);

    //Para formatear la fecha
    function formattedDate(d = new Date) {
        return [d.getFullYear(), d.getMonth() + 1, d.getDate()]
            .map(n => n < 10 ? `0${n}` : `${n}`).join('-');
    }
    //Para formatear la hora
    function formattedTime(d) {
        if (d.split(':')[0] < 10) {
            return '0' + d + ':00.000'
        } else if (d.split(':')[0] == 10) {
            return d + ':00.000'
        } else {
            return d + ':00.000'
        }
    }

    //Para añadir minutos a fecha de entrada
    //Citas error máximo 60 minutos
    function addMinutes(date, minutes) {
        let minu = parseInt(minutes);
        let ndate = date.split(' ')[0];
        let time = date.split(' ')[1];
        let hora = parseInt(time.split(':')[0]);
        let min = parseInt(time.split(':')[1]);
        let totalMin = 0;

        if (min + minu >= 60) {
            hora = hora + 1;
            totalMin = (min + minutes) - 60;
        } else {
            totalMin = min + minutes;
        }
        return ndate + ' ' + hora + ':' + totalMin;
    }


    function CheckDates() {
        disp.length = 0;
        horarios.map(h => (
            h.turnos[0].Uid.split(' ')[0].split('-')[1].replace('0', '') == citaDate.getMonth() + 1 && h.turnos[0].Uid.split(' ')[0].split('-')[2].replace('0', '') == citaDate.getDate()
                ?
                h.disponibilidad.map(dispon => (
                    disp.push(dispon.split(':')[0] + ':' + dispon.split(':')[1]
                    )))
                :
                null
        ))

        return (disp.length > 0 ?

            disp.map((dis) =>
                < option > {dis}</option >

            )
            : <option> - No disponible - </option>

        )
    }


    //Para sacar los servicios
    useEffect(() => {
        database.collection('NegociosDev').doc(location.state.empleadoref.split('/')[1]).collection('Negocios').doc(location.state.empleadoref.split('/')[3]).collection('servicios').get()
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
        database.collection('NegociosDev').doc(location.state.empleadoref.split('/')[1]).collection('Negocios').doc(location.state.empleadoref.split('/')[3]).collection('empleados').get()
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

    useEffect(() => {
        setTel(textInput.current.value)
        database.collection('NegociosDev').doc(location.state.empleadoref.split('/')[1]).collection('Negocios').doc(location.state.empleadoref.split('/')[3]).get().then(function (doc) {
            setNombreNegocio(doc.data().NOMBRE);
            setLocalizacion(doc.data().Ubicacion)
        })
    }, [textInput])

    const query = () => {
        if (servicioSeleccionado !== 'Coloración' && servicioSeleccionado !== 'Mechas' && servicioSeleccionado !== 'Reflejos') {
            servicios.forEach(servicio => {
                if (servicio.nombre === servicioSeleccionado) {
                    dur = servicio.duracion
                    pre = servicio.precio
                }
            })
        } else {
            dur = duracionInput.current.value;
            pre = precioInput.current.value
        }
        let idUser;
        let nombreUser;
        let apellidoUser;

        users.map((user) => (
            idUser = user.id,
            nombreUser = user.Nombre,
            apellidoUser = user.Apellidos
        ))

        let fechaFinal = formattedTime(addMinutes((formattedDate(citaDate) + ' ' + formattedTime(horaSelec)), parseInt(dur)));
        if (fechaFinal.split(' ')[1].split(':')[1] < 10) {
            fechaFinal = fechaFinal.split(' ')[0] + ' ' + fechaFinal.split(' ')[1].split(':')[0] + ':' + '0' + fechaFinal.split(' ')[1].split(':')[1] + ':' + fechaFinal.split(' ')[1].split(':')[2]
        }
        if (fechaFinal.split(' ')[1].split(':')[0] < 10) {
            fechaFinal = fechaFinal.split(' ')[0] + ' ' + '0' + fechaFinal.split(' ')[1].split(':')[0] + ':' + fechaFinal.split(' ')[1].split(':')[1] + ':' + fechaFinal.split(' ')[1].split(':')[2]
        }



        if (textInput.current.value != null && dur != null && pre != null && citaDate != null && horaSelec != null && servicioSeleccionado != null) {
            database.collection('NegociosDev').doc(location.state.empleadoref.split('/')[1]).collection('Negocios').doc(location.state.empleadoref.split('/')[3]).collection('citas').add({
                CheckIn: formattedDate(citaDate) + ' ' + formattedTime(horaSelec),
                CheckOut: fechaFinal.toString(),
                Dirección: localizacionNegocio,
                Negocio: nombreNegocio,
                Precio: pre.toString(),
                Servicio: servicioSeleccionado.toString(),
                extraInformation: empleadoSelect.toString(),
                idUsuario: idUser.toString(),
            }).then(function (docRef) {
                database.collection('NegociosDev').doc(location.state.empleadoref.split('/')[1]).collection('Negocios').doc(location.state.empleadoref.split('/')[3]).collection('empleados').doc(empleadoSelect).update({
                    citas: firebase.firestore.FieldValue.arrayUnion(database.doc('NegociosDev/' + location.state.empleadoref.split('/')[1] + '/Negocios/' + location.state.empleadoref.split('/')[3] + '/citas/' + docRef.id))
                })

                database.collection('UsuariosDev').where('Telefono', '==', tel).get()
                    .then(querySnapshot => {
                        const docRefer = querySnapshot.docs[0].ref;
                        return docRefer.update({
                            citas: firebase.firestore.FieldValue.arrayUnion(database.doc('NegociosDev/' + location.state.empleadoref.split('/')[1] + '/Negocios/' + location.state.empleadoref.split('/')[3] + '/citas/' + docRef.id))
                        })
                    })

            })
            setOpen(true);

        }



    }
    const [nombreNegocio, setNombreNegocio] = useState();
    const [localizacionNegocio, setLocalizacion] = useState();

    const queryAnon = () => {
        if (servicioSeleccionado !== 'Coloración' && servicioSeleccionado !== 'Mechas' && servicioSeleccionado !== 'Reflejos') {
            servicios.forEach(servicio => {
                if (servicio.nombre === servicioSeleccionado) {
                    dur = servicio.duracion
                    pre = servicio.precio
                }
            })
        } else {
            dur = duracionInput.current.value;
            pre = precioInput.current.value
        }
        let idUser;
        let apellidoUser;




        let fechaFinal = formattedTime(addMinutes((formattedDate(citaDate) + ' ' + formattedTime(horaSelec)), parseInt(dur)));
        if (fechaFinal.split(' ')[1].split(':')[1] < 10) {
            fechaFinal = fechaFinal.split(' ')[0] + ' ' + fechaFinal.split(' ')[1].split(':')[0] + ':' + '0' + fechaFinal.split(' ')[1].split(':')[1] + ':' + fechaFinal.split(' ')[1].split(':')[2]
        }
        if (fechaFinal.split(' ')[1].split(':')[0] < 10) {
            fechaFinal = fechaFinal.split(' ')[0] + ' ' + '0' + fechaFinal.split(' ')[1].split(':')[0] + ':' + fechaFinal.split(' ')[1].split(':')[1] + ':' + fechaFinal.split(' ')[1].split(':')[2]
        }



        if (nombreUser.current.value != null && textInput.current.value != null && dur != null && pre != null && citaDate != null && horaSelec != null && servicioSeleccionado != null) {
            database.collection('AnonimosDev').add({
                Nombre: nombreUser.current.value,
                Telefono: textInput.current.value
            }).then(function (docRef1) {
                database.collection('NegociosDev').doc(location.state.empleadoref.split('/')[1]).collection('Negocios').doc(location.state.empleadoref.split('/')[3]).collection('citas').add({
                    CheckIn: formattedDate(citaDate) + ' ' + formattedTime(horaSelec),
                    CheckOut: fechaFinal.toString(),
                    Dirección: localizacionNegocio,
                    Negocio: nombreNegocio,
                    Precio: pre.toString(),
                    Servicio: servicioSeleccionado.toString(),
                    extraInformation: empleadoSelect.toString(),
                    idUsuario: docRef1.id,
                }).then(function (docRef) {
                    database.collection('NegociosDev').doc(location.state.empleadoref.split('/')[1]).collection('Negocios').doc(location.state.empleadoref.split('/')[3]).collection('empleados').doc(empleadoSelect).update({
                        citas: firebase.firestore.FieldValue.arrayUnion(database.doc('NegociosDev/' + location.state.empleadoref.split('/')[1] + '/Negocios/' + location.state.empleadoref.split('/')[3] + '/citas/' + docRef.id))
                    })

                })
            })
            setOpen(true);
        }
    }


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
    const pepe = (e) => (
        setPrecio(e.target.value)
    )
    const selecHora = (e) => (
        setHoraSelec(e.target.value)
    )
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState();
    const selEmpleado = (e) => (
        disp.length = 0,
        setEmpleadoSelect(e.target.value),
        database.collection('NegociosDev').doc(location.state.empleadoref.split('/')[1]).collection('Negocios').doc(location.state.empleadoref.split('/')[3]).collection('empleados').doc(e.target.value).collection('horarios').get()
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
            })

    )

    /*
    Prueba query axios
    */
    useEffect(() => {
        axios.get('https://us-central1-pruebafirebase-44f30.cloudfunctions.net/getData', {
            params: {
                "date": citaDate,
                "peluquero": empleadoSeleccionado,
                "duration": dur,
                "businessUid": location.state.empleadoref.split('/')[3],
            }
        }).then(function (response) {

            console.log(response);
        })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, [citaDate])






    function ComprobarServicio() {
        return (
            servicioSeleccionado === 'Coloración' || servicioSeleccionado === 'Mechas' || servicioSeleccionado === 'Reflejos'
                ?
                <div>
                    <div className="form-group">
                        <label htmlFor="first_name">Precio</label>
                        <input ref={precioInput} type="number" className="form-control" id="precio" placeholder="Precio" required autoComplete="on"></input>
                        <span className="help-block"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="first_name">Duracion</label>
                        <input ref={duracionInput} type="number" className="form-control" id="duracion" placeholder="20" required autoComplete="on"></input>
                        <span className="help-block"> (en minutos) </span>
                    </div>
                </div>
                :
                <div
                ></div>
        )
    }
    const [isOpen, setOpen] = useState(false);

    return <div>
        <SweetAlert
            success
            title="¡Cita creada con éxito!"
            show={isOpen} //Notice how we bind the show property to our component state
            onConfirm={() => {
                history.push({
                    pathname: "/citas",
                }); setOpen(false);
            }}
        >
            Pulsa "Ok" para ver todas las citas
      </SweetAlert>
        <div className="container-fluid">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <a className="link-color" href="dashboard-main.html">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Citas</li>
            </ol>
            <div className="card mb-3 col-lg-12">
                <div className="card-header">
                    <i className="fa fa-table"></i> Citas
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
                                        <label htmlFor="sel1">Empleados disponibles:</label>

                                        <select className="form-control" onChange={(e) => { selEmpleado(e); setEmpleadoSeleccionado(e.target.value) }} required>
                                            <option value="">Seleccione un empleado.</option>

                                            {empleados.map((empleado) =>
                                                <option>{empleado.Nombre}</option>
                                            )}

                                        </select>
                                        <span className="help-block"></span>
                                    </div>
                                    <label htmlFor="email_address_confirm">Fecha y hora</label>
                                    <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                                        <br></br>
                                        <DatePicker
                                            selected={citaDate}
                                            onChange={date => setCitaDate(date)}
                                            dateFormat="yyyy-MM-dd"
                                        />
                                        <select className="form-control col-2" style={{ marginLeft: '2%' }} onChange={selecHora} value={horaSelec} required>
                                            <option value="">Seleccione una hora</option>
                                            <CheckDates></CheckDates>
                                        </select>
                                        <span className="help-block"></span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="sel1">Servicio:</label>
                                        <select className="form-control" onChange={pepe} required>
                                            <option value="">Seleccione un servicio</option>
                                            {servicios.map((servicio) =>
                                                <option>{servicio.nombre}</option>
                                            )}

                                        </select>
                                        <ComprobarServicio></ComprobarServicio>
                                        <span className="help-block"></span>
                                    </div>
                                </div>
                            ))}
                            <button className="btn btn-lg btn-primary btn-block" type='button' onClick={query}>Pedir cita</button>
                        </div>
                        : title === '❌' ?
                            <div>
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="first_name">Nombre</label>
                                        <input ref={nombreUser} type="text" className="form-control" id="first_name" placeholder="Nombre" required autoComplete="on"></input>
                                        <span className="help-block"></span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="sel1">Empleados disponibles:</label>

                                        <select className="form-control" onChange={selEmpleado} required>
                                            <option value="">Seleccione un empleado.</option>

                                            {empleados.map((empleado) =>
                                                <option>{empleado.Nombre}</option>
                                            )}

                                        </select>
                                        <span className="help-block"></span>
                                    </div>
                                    <label htmlFor="email_address_confirm">Fecha y hora</label>
                                    <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                                        <br></br>
                                        <DatePicker
                                            selected={citaDate}
                                            onChange={date => setCitaDate(date)}
                                            dateFormat="yyyy-MM-dd"
                                        />
                                        <select className="form-control col-2" style={{ marginLeft: '2%' }} onChange={selecHora} value={horaSelec} required>
                                            <option value="">Seleccione una hora</option>
                                            <CheckDates></CheckDates>
                                        </select>
                                        <span className="help-block"></span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="sel1">Servicio:</label>
                                        <select className="form-control" onChange={pepe} required>
                                            <option value="">Seleccione un servicio</option>
                                            {servicios.map((servicio) =>
                                                <option>{servicio.nombre}</option>
                                            )}

                                        </select>
                                        <ComprobarServicio></ComprobarServicio>
                                        <span className="help-block"></span>
                                    </div>
                                </div>
                                <button className="btn btn-lg btn-primary btn-block" type='button' onClick={queryAnon}>Pedir cita</button>
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