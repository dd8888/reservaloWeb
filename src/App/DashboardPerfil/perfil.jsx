import React, { useState, useEffect, useCallback, useContext } from 'react'
import * as firebase from 'firebase'
import DatePicker from 'react-datepicker'
import '../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import '../../css/bootstrap.min.css';
import '../../css/citas-detalladas.css';
import { useHistory, useLocation } from 'react-router-dom';
import CheckUserLoggedIn from '../Restrict'
import SweetAlert from 'react-bootstrap-sweetalert';
import { NavLink } from 'react-router-dom'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tabs'
import Sonnet from 'react-bootstrap/Tabs'
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

const MainPerfil = () => {

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
            })

    }, []/*judas*/)

    const { currentUser } = useContext(AuthContext);
    const [logo, setLogo] = useState();
    const [backImage, setBackImage] = useState();
    const [imagenes, setImagenes] = useState([]);
    useEffect(() => {
        if (empleadoSeleccionado != undefined) {
            const fetchedImagenes = [];

            firebase.storage().ref().child(empleadoSeleccionado.RefNegocio.path.split('/')[3] + '/Gallery').listAll().then(function (result) {
                result.items.forEach(function (itemRef) {
                    itemRef.getDownloadURL().then(function (link) {
                        const fetchedImagen = link

                        fetchedImagenes.push(fetchedImagen)

                    })
                });
                setImagenes(fetchedImagenes)
            })

            /*
            firebase.storage().ref().child(empleadoSeleccionado.RefNegocio.path.split('/')[3] + '/Gallery/0.jpeg').getDownloadURL().then(function (result) {
                setLogo(result)
            })
            firebase.storage().ref().child(empleadoSeleccionado.RefNegocio.path.split('/')[3] + '/Gallery/1.jpeg').getDownloadURL().then(function (result) {
                setBackImage(result)
            })*/
        }

    }, [empleadoSeleccionado])

    return <div>
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <a className="link-color" href="#">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Perfil</li>
        </ol>
        <div className="pfl-wrapper">
            <div className="tabbable">
                <ul className="nav nav-tabs">
                    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                        <Tab eventKey="home" title="Perfil">
                            <div id="users" className="tab-pane in">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 col-sm-8 col-md-6 col-lg-4" style={{
                                            width: '50%',
                                            margin: '0 auto'
                                        }} />
                                        <div className="card perfil-foto">
                                            <img className="card-img-top"
                                                src={imagenes[1]}
                                            ></img>
                                            <div className="card-body text-center">
                                                <img className="avatar rounded-circle"
                                                    src={imagenes[0]}
                                                ></img>
                                                <h4 className="card-title">Bienvenido</h4>
                                                <h6 className="card-subtitle mb-2 text-muted">{currentUser.email}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Sonnet />
                        </Tab>

                        <Tab eventKey="contact" title="Contact">
                            <div id="gallery" className="tab-pane active">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-12 my-auto">
                                                        <div id="carouselExampleIndicators" className="carousel slide"
                                                            data-interval="false">
                                                            <ol className="carousel-indicators">
                                                                <li data-target="#carouselExampleIndicators"
                                                                    data-slide-to="0" className="active"></li>
                                                                <li data-target="#carouselExampleIndicators"
                                                                    data-slide-to="1"></li>
                                                                <li data-target="#carouselExampleIndicators"
                                                                    data-slide-to="2"></li>
                                                            </ol>
                                                            <div className="carousel-inner">

                                                                <div className="carousel-item active">
                                                                    <img className="carousel-image"
                                                                        src="https://picsum.photos/1000/600" />
                                                                </div>
                                                                <div className="carousel-item">
                                                                    <img className="carousel-image"
                                                                        src="https://picsum.photos/1000/601" />

                                                                </div>
                                                                <div className="carousel-item">
                                                                    <img className="carousel-image"
                                                                        src="https://picsum.photos/1000/602" />

                                                                </div>
                                                            </div>

                                                            <a className="carousel-control-prev"
                                                                href="#carouselExampleIndicators" role="button"
                                                                data-slide="prev">
                                                                <span className="carousel-control-prev-icon"
                                                                    aria-hidden="true"></span>
                                                                <span className="sr-only">Previous</span>
                                                            </a>
                                                            <a className="carousel-control-next"
                                                                href="#carouselExampleIndicators" role="button"
                                                                data-slide="next">
                                                                <span className="carousel-control-next-icon"
                                                                    aria-hidden="true"></span>
                                                                <span className="sr-only">Next</span>
                                                            </a>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-2 imgUp">
                                            <div className="imagePreview"></div>
                                            <label className="btn btn-primary btn-upload">Upload
                                                </label>
                                        </div>
                                        <i className="fa fa-plus imgAdd"></i>
                                    </div>
                                </div>
                            </div>
                            <Sonnet />
                        </Tab>
                    </Tabs>
                </ul>
            </div>
        </div>
        <footer className="sticky-footer">
            <div className="container">
                <div className="text-center">
                    <small>Copyright © Resérvalo 2020</small>
                </div>
            </div>
        </footer>
    </div >
}

export default MainPerfil;