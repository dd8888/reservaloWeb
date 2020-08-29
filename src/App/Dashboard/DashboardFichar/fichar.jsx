import React, { useState, useEffect, useContext } from 'react'
import '../../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import '../../../css/bootstrap.min.css';
import '../../../css/citas-detalladas.css';
import QRCode from "react-qr-code";
import { AuthContext } from '../../Auth';
import Countdown, { zeroPad } from 'react-countdown';
import buildFirebase from '../Assets/firebaseBuilder'
import buildEmpleados from '../Assets/empleadosBuilder'

const database = buildFirebase()

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

    const empleadoSeleccionado = buildEmpleados().empleadoSeleccionado;

    const [horarios, setHorarios] = useState([]);
    const [isDisponible, setDisponible] = useState();
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
    //Para formatear la hora

    //Para añadir minutos a fecha de entrada
    //Citas error máximo 60 minutos



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