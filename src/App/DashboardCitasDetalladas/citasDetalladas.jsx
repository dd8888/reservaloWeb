import React, { useState, useEffect } from 'react'

const CitasDetalladas = (id) => {
    console.log(id)
    ///NegociosDev/Peluquerías/Negocios/PR01/citas/1xCDFWiDx3jUdKo8R3AG
    /*useEffect(() => {
        database.collection('NegociosDev').doc('Peluquerías').collection('Negocios').doc('PR01').collection('citas').where('CheckIn', '>=', startDate.toISOString().split('T')[0]).get()
            .then(response => {
                const fetchedCitas = [];
                response.forEach(document => {
                    const fetchedCita = {
                        id: document.id,
                        ...document.data()
                    };
                    fetchedCitas.push(fetchedCita);
                    //console.log(fetchedCita.CheckIn)
                });
                setCitas(fetchedCitas);
            })



    }, [startDate]/*judas*///)


    return <div>
        <div className="container-fluid">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <a className="link-color" href="dashboard-main.html">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Citas</li>
            </ol>
            <div className="card mb-3 col-lg-12">
                <div className="card-header">
                    <i className="fa fa-table"></i> Cita ID
                </div>
                <div className="wrap" data-pos="0">
                    <div className="headbar">
                        <i className="zmdi zmdi-arrow-left btnBack"></i> <span>Cita</span>
                    </div>
                    <div className="header">
                        <div className="bg"></div>
                        <div className="filter"></div>
                        <div className="title">
                            <div className="fromPlace">
                                10:30
                            </div>
                            <span className="separator"><i className="fa fa-location-arrow"></i></span>
                            <div className="toPlace">
                                11:00
                            </div>
                        </div>
                        <div className="map"></div>
                    </div>

                    <div className="content">
                        <section>
                            <div className="form">
                                <div className="control select">
                                    <div className="control-head">
                                        <i className="fa fa-mobile-phone"></i>
                                        <span className="close"><i className="fa fa-mobile-phone"></i></span>
                                        <div>
                                            <h6>Teléfono</h6>
                                            <span className="airport-name" data-role="from">674576761</span>
                                        </div>
                                    </div>

                                </div>
                                <div className="control select">
                                    <div className="control-head">
                                        <i className="fa fa-user" style={{ fontSize: '1.2em' }}></i>
                                        <span className="close"><i className="fa fa-user"></i></span>
                                        <div>
                                            <h6>Nombre</h6>
                                            <span className="airport-name" data-role="to">Juanjo</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="control select">
                                    <div className="control-head">
                                        <i className="fa fa-tag" style={{ fontSize: '1.2em' }}></i>
                                        <span className="close"><i className="fa fa-tag"></i></span>
                                        <div>
                                            <h6>Servicio</h6>
                                            <span className="airport-name" data-role="to">Corte de pelo</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="control select">
                                    <div className="control-head">
                                        <i className="fa fa-clock-o" style={{ fontSize: '1.2em' }}></i>
                                        <span className="close"><i className="fa fa-clock-o"></i></span>
                                        <div>
                                            <h6>Duración</h6>
                                            <span className="airport-name" data-role="to">30 minutos</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="control select">
                                    <div className="control-head">
                                        <i className="fa fa-id-card " style={{ fontSize: '1.2em' }}></i>
                                        <span className="close"><i className="fa fa-id-card "></i></span>
                                        <div>
                                            <h6>Profesional</h6>
                                            <span className="airport-name" data-role="to">Manolo</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="control select">
                                    <div className="control-head">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-offset-3 col-md-6 text-center">
                                                    <button style={{ backgroundColor: '#E6495A', marginTop: '1%' }} className="btn btn-default">Editar
                          cita</button>
                                                </div>
                                                <div className="col-md-offset-3 col-md-6 text-center">
                                                    <button style={{ backgroundColor: 'E6495A', marginTop: '1%' }} className="btn btn-default">Lo
                          otro</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
        < footer className="sticky-footer" >
            <div className="container">
                <div className="text-center">
                    <small>Copyright © Resérvalo 2020</small>
                </div>
            </div>
        </footer >
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
                        <a className="btn btn-primary" style={{ backgroundColor: 'E6495A', borderColor: 'E6495A' }} href="login.html">Sí</a>
                    </div>
                </div>
            </div>
        </div>
    </div >
};
export default CitasDetalladas;