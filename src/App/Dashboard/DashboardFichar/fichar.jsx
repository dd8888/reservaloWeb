import React, { useState, useEffect, useContext } from 'react'
import * as firebase from 'firebase'
import DatePicker from 'react-datepicker'
import '../../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import '../../../css/bootstrap.min.css';
import '../../../css/citas-detalladas.css';
import { useHistory, useLocation } from 'react-router-dom';
import CheckUserLoggedIn from '../../Restrict'
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios'
import QRCode from "react-qr-code";
import { AuthContext } from '../../Auth';
import Countdown, { zeroPad } from 'react-countdown';
import { parseNumber } from 'globalize';
import buildFirebase from '../Assets/firebaseBuilder'
import buildEmpleados from '../Assets/empleadosBuilder'

const database = buildFirebase()
const cors = require('cors')({ origin: true });

const Citas = () => {

    const Completionist = () => <div><h2>¡El turno ya ha empezado!</h2>
        <br></br>
        <QRCode value={idDia} />
    </div>

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            return <h2 style={{ marginBottom: "5%" }}>Tiempo para que empiece el siguiente turno: {<br></br>}{zeroPad(days, 2)}:{zeroPad(hours, 2)}:{zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}</h2>


        }
    };


    CheckUserLoggedIn();
    const { currentUser } = useContext(AuthContext);
    const empleadoSeleccionado = buildEmpleados().empleadoSeleccionado;
    const empleados = buildEmpleados().empleados;

    const [horarios, setHorarios] = useState([]);
    const [isDisponible, setDisponible] = useState();
    const [siguienteHora, setSiguienteHora] = useState();
    const [siguienteHoraAMili, setSiguienteHoraAMili] = useState();
    const [idDia, setIdDia] = useState();

    var BreakException = {};

    useEffect(() => {
        if (empleadoSeleccionado !== undefined) {
            database.collection('NegociosDev').doc(empleadoSeleccionado.RefNegocio.path.split('/')[1]).collection('Negocios').doc(empleadoSeleccionado.RefNegocio.path.split('/')[3]).collection('empleados').doc(empleadoSeleccionado.Nombre).collection('horarios').get()
                .then(response => {
                    const fetchedHorarios = [];
                    response.forEach(document => {
                        const fetchedCita = {
                            id: document.id,
                            ...document.data()
                        };
                        fetchedHorarios.push(fetchedCita);
                        fetchedHorarios.forEach(element => {
                            element.turnos.forEach(turn => {
                                //const d1 = new Date(2020, 6, 16, 13, 59);
                                const d1 = new Date();
                                const d2 = new Date(turn.Uid.split(' ')[0]);

                                if (turn.Salida > d1.getHours() + 1) {
                                    if (d2.getDate() === d1.getDate() && d2.getFullYear() === d1.getFullYear() && d2.getMonth() === d1.getMonth()) {
                                        setIdDia(element.id)
                                        setDisponible(true)
                                        setSiguienteHora(turn.Entrada)

                                        d2.setHours(d2.getHours() + parseInt(turn.Entrada))

                                        setSiguienteHoraAMili(d2.getTime() - d1.getTime())
                                        throw BreakException;
                                    } else {
                                        setDisponible(false)
                                    }
                                }


                            });

                        });

                    });
                    setHorarios(fetchedHorarios);
                })
        }
    }, [empleadoSeleccionado]/*judas*/)


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

    return <div className="App">
        <div className="container-fluid">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <a className="link-color" href="#">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Citas</li>
            </ol>
            <div className="card mb-3 col-lg-12 bordes">
                <div className="card-header">
                    <i className="fa fa-qrcode"></i> Fichar
                </div>
                <div className="d-flex justify-content-center" >
                    <div style={{ padding: "5%" }} className="text-center">
                        {isDisponible
                            ?
                            siguienteHoraAMili != undefined ?
                                <div>
                                    <Countdown
                                        zeroPadTime={2}
                                        date={Date.now() + siguienteHoraAMili}
                                        renderer={renderer}
                                    />

                                </div>
                                :
                                <span></span>
                            :
                            <span>No hay siguiente horario</span>
                        }
                    </div>
                </div>


            </div>
        </div>
    </div >
};

export default Citas;