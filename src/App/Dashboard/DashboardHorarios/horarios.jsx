import React, { useState, useEffect } from 'react'
import '../../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import '../../../css/dashboard-init.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import buildEmpleados from '../Assets/empleadosBuilder'
import buildFirestore from '../Assets/firebaseBuilder'
import Footer from '../BorderTemplate/Footer'



require('react-big-calendar/lib/css/react-big-calendar.css');
moment.locale('en-GB')


const messages = {
    allDay: 'Todo el día',
    previous: '<',
    next: '>',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Tiempo',
    event: 'Evento',
    showMore: total => `+ Total (${total})`
};


const database = buildFirestore()

const HorariosUser = () => {
    const localizer = momentLocalizer(moment)
    const empleadoSeleccionado = buildEmpleados().empleadoSeleccionado;
    const empleados = buildEmpleados().empleados;
    const [listaEventos, setListaEventos] = useState([])
    const [horariosFinal, setHorariosFinal] = useState([])
    const [horarioEmpleado, setHorarioEmpleado] = useState([])
    useEffect(() => {
        if (empleadoSeleccionado != undefined && empleadoSeleccionado.Permisos == 2) {
            database.collection('NegociosDev').doc(empleadoSeleccionado.RefNegocio.path.split('/')[1]).collection('Negocios').doc(empleadoSeleccionado.RefNegocio.path.split('/')[3]).collection('empleados').doc(empleadoSeleccionado.Nombre).collection('horarios').get()
                .then(response => {
                    const fetchedHorarios = [];
                    response.forEach(document => {
                        const fetchedHorario = {
                            id: document.id,
                            ...document.data()
                        };
                        fetchedHorarios.push(fetchedHorario);

                    });
                    setListaEventos(fetchedHorarios);
                })
        }
    }, [empleadoSeleccionado, empleados])

    useEffect(() => {
        if (empleadoSeleccionado != undefined) {
            database.collection('NegociosDev').doc(empleadoSeleccionado.RefNegocio.path.split('/')[1]).collection('Negocios').doc(empleadoSeleccionado.RefNegocio.path.split('/')[3]).collection('empleados').doc(horarioEmpleado).collection('horarios').get()
                .then(response => {
                    const fetchedHorarios = [];
                    response.forEach(document => {
                        const fetchedHorario = {
                            id: document.id,
                            ...document.data()
                        };
                        fetchedHorarios.push(fetchedHorario);

                    });
                    setListaEventos(fetchedHorarios);
                })
        }
    }, [horarioEmpleado])

    useEffect(() => {
        const horariosFin = [];
        console.log(listaEventos)
        listaEventos.forEach(function (element, i) {
            element.turnos.forEach(function (turno, j) {
                const simple = {
                    id: i,
                    title: 'Turno ' + (j + 1),
                    start: new Date(turno.Uid.split(' ')[0].split('-')[0], turno.Uid.split(' ')[0].split('-')[1] - 1, turno.Uid.split(' ')[0].split('-')[2], parseInt(turno.Entrada)),
                    end: new Date(turno.Uid.split(' ')[0].split('-')[0], turno.Uid.split(' ')[0].split('-')[1] - 1, turno.Uid.split(' ')[0].split('-')[2], parseInt(turno.Salida))
                };
                horariosFin.push(simple)
            });
        });
        setHorariosFinal(horariosFin)

    }, [listaEventos])

    return <div className="App">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <a className="link-color" href="" onClick={(e) => {
                    e.preventDefault(); history.push({
                        pathname: "/perfil",
                    })
                }}>Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Horarios</li>
        </ol>
        <div className="card mb-3 col-lg-12">
            <div className="card-header">
            </div>
            <div className="form-group" style={{ marginLeft: '2%', marginTop: '2%' }}>
                <label htmlFor="sel1">Empleados disponibles:</label>
                {empleadoSeleccionado != undefined && empleadoSeleccionado.Permisos == 1
                    ?
                    <select className="form-control" style={{ width: '20%' }} onChange={(e) => setHorarioEmpleado(e.target.value)} required>
                        <option value="" disabled="disabled">Seleccione un empleado</option>
                        {empleados.map((empleado) =>
                            empleado.RefNegocio.path.split('/')[3] === empleadoSeleccionado.RefNegocio.path.split('/')[3] ? <option>{empleado.Nombre}</option> : null
                        )}

                    </select>
                    :
                    <span></span>}
                <span className="help-block"></span>
            </div>
            <div className="card-body" >
                <Calendar
                    showMultiDayTimes
                    views={['month', 'week', 'day']}
                    messages={messages}
                    localizer={localizer}
                    events={horariosFinal}
                    startAccessor="start"
                    endAccessor="end"
                    style={{
                        height: '700px',
                    }}
                />
            </div>
        </div>
        <Footer></Footer>
    </div >

};

export default HorariosUser;