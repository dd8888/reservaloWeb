import React, { useState, useEffect, useContext } from 'react'
import * as firebase from 'firebase'
import DatePicker from 'react-datepicker'
import '../../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import '../../../css/dashboard-init.css'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Auth';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useLocation } from "react-router-dom";
import buildFirebase from '../Assets/firebaseBuilder'
import buildEmpleados from '../Assets/empleadosBuilder'

const database = buildFirebase();
const ref = React.createRef();

const Editar = () => {
    const location = useLocation();
    const [isOpen, setOpen] = useState(false);
    const [horarios, setHorarios] = useState([]);
    const [citaDate, setCitaDate] = useState(new Date());
    const [disp, setDisp] = useState([])
    const [servicioSeleccionado, setPrecio] = useState();
    const empleadoSeleccionado = buildEmpleados().empleadoSeleccionado;
    const empleados = buildEmpleados().empleados;
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
    const [servicios, setServicios] = useState([]);

    const pepe = (e) => (
        setPrecio(e.target.value)
    )
    const selecHora = (e) => (
        setHoraSelec(e.target.value)
    )
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
                <option>{dis}</option>

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

    function userGetNombre() {
        let nombre = "null";
        location.state.users.map((us) => {

            if (us.id == location.state.cita_idUsuario) {
                nombre = us.Nombre
            }
        });
        location.state.anons.map((an) => {
            if (an.id == location.state.cita_idUsuario) {
                nombre = an.Nombre
            }
        })

        return nombre;
    }
    function userGetTelefono() {
        let telefono = "null";
        location.state.users.map((us) => {
            if (us.id == location.state.cita_idUsuario)
                telefono = us.Telefono
        });
        location.state.anons.map((an) => {
            if (an.id == location.state.cita_idUsuario) {
                telefono = an.Telefono
            }
        })

        return telefono;
    }

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
    let dur;
    let pre;
    const [nombreNegocio, setNombreNegocio] = useState();
    const [localizacionNegocio, setLocalizacion] = useState();
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

        location.state.users.map((user) => (
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
            database.collection('NegociosDev').doc(location.state.empleadoref.split('/')[1]).collection('Negocios').doc(location.state.empleadoref.split('/')[3]).collection('citas').doc(location.state.cita_id).update({
                CheckIn: formattedDate(citaDate) + ' ' + formattedTime(horaSelec),
                CheckOut: fechaFinal.toString(),
                Dirección: localizacionNegocio,
                Negocio: nombreNegocio,
                Precio: pre.toString(),
                Servicio: servicioSeleccionado.toString(),
                extraInformation: empleadoSelect.toString(),
                idUsuario: idUser.toString(),
            })
            setOpen(true);
        }
    }

    return <div>
        <SweetAlert
            success
            title="¡Cita editada con éxito!"
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
                    <a className="link-color" href="#">Dashboard</a>
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
                        <input readOnly ref={textInput} value={userGetTelefono()} type="tel" className="form-control" style={{ width: '20%' }} id="phone_number" placeholder="Número de teléfono"></input>
                    </div>
                    <div>
                        <div>
                            <div className="form-group">
                                <label htmlFor="first_name">Nombre</label>
                                <input readOnly type="text" value={userGetNombre()} className="form-control" id="first_name" placeholder="Nombre" required autoComplete="on"></input>
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
                        <button className="btn btn-lg btn-primary btn-block" type='button' onClick={query}>Pedir cita</button>
                    </div>

                </form>

            </div>
        </div>
    </div >
};

export default Editar;