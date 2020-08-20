import React, { useState, useEffect, useCallback, useContext } from 'react'
import * as firebase from 'firebase'
import DatePicker from 'react-datepicker'
import '../../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import '../../../css/dashboard-init.css'
import { useHistory, useLocation } from 'react-router-dom';
import CheckUserLoggedIn from '../../Restrict'
import SweetAlert from 'react-bootstrap-sweetalert';
import { NavLink } from 'react-router-dom'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tabs'
import Table from 'react-bootstrap/Table'
import Sonnet from 'react-bootstrap/Tabs'
import { AuthContext } from '../../Auth';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';





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
const storageRef = firebase.storage().ref();


const MainPerfil = () => {
    const [imagenesPreview, setImagenesPreview] = useState();
    const [imagenesPreviewLink, setImagenesPreviewLink] = useState();
    const [imagenSeleccionada, setImagenSeleccionada] = useState();
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState();
    const [empleados, setEmpleados] = useState([]);

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

    const { currentUser } = useContext(AuthContext);
    const [logo, setLogo] = useState();
    const [backImage, setBackImage] = useState();
    const [imagenes, setImagenes] = useState([]);
    const [update, setUpdate] = useState();
    useEffect(() => {
        if (empleadoSeleccionado != undefined) {
            const fetchedImagenes = [];
            firebase.storage().ref().child(empleadoSeleccionado.RefNegocio.path.split('/')[3] + '/Gallery').listAll().then(function (result) {
                const promises = result.items.map((itemRef) => itemRef.getDownloadURL());
                Promise.all(promises).then((urls) =>
                    setImagenes(urls)
                );
            })


            firebase.storage().ref().child(empleadoSeleccionado.RefNegocio.path.split('/')[3] + '/Gallery/0.jpeg').getDownloadURL().then(function (result) {
                setLogo(result)
            })
            firebase.storage().ref().child(empleadoSeleccionado.RefNegocio.path.split('/')[3] + '/Gallery/1.jpeg').getDownloadURL().then(function (result) {
                setBackImage(result)
            })
        }

    }, [empleadoSeleccionado, update])

    const cambioPreview = (e) => {
        setImagenesPreviewLink(e.target.files[0])
        setImagenesPreview(URL.createObjectURL(e.target.files[0]))
    }

    const subirImagen = () => {
        const refImagen = storageRef.child(empleadoSeleccionado.RefNegocio.path.split('/')[3] + '/Gallery/' + imagenes.length + '.' + imagenesPreviewLink.name.split('.')[imagenesPreviewLink.name.split('.').length - 1])
        refImagen.put(imagenesPreviewLink).then(function (snapshot) {
            setOpen(true)
        })

    }

    const borrarImagen = () => {
        if (imagenSeleccionada == undefined) {
            setImagenSeleccionada(0)
        }
        const refImagenBorrar = storageRef.child(empleadoSeleccionado.RefNegocio.path.split('/')[3] + '/Gallery/' + imagenes[imagenSeleccionada].split(RegExp('%2..*%2F(.*?)\?alt'))[1].replace('?', ''))
        refImagenBorrar.delete().then(function () {
            if (update == undefined) {
                setUpdate(1)
            } else {
                setUpdate(update + 1)
            }
            setOpenBorrar(false);

        }).catch(function (error) {
            console.log(error)
        });;
    }
    const [isOpen, setOpen] = useState(false);
    const [isOpenBorrar, setOpenBorrar] = useState(false)
    const history = useHistory();

    return <div>
        <SweetAlert
            success
            title="¡Imagen subida con éxito!"
            show={isOpen} //Notice how we bind the show property to our component state
            onConfirm={() => {
                //Para recargar las imágenes cambio esta variable
                if (update == undefined) {
                    setUpdate(1)
                } else {
                    setUpdate(update + 1)
                }
                setOpen(false);
            }}
        >
        </SweetAlert>
        <SweetAlert
            danger
            title="¿Estás seguro de borrar esta imagen?"
            showCancel
            confirmBtnText="Sí, borrar"
            cancelBtnBsStyle="No"
            confirmBtnBsStyle="danger"
            show={isOpenBorrar} //Notice how we bind the show property to our component state
            onConfirm={() => {
                //Para recargar las imágenes cambio esta variable
                borrarImagen();
            }}
            onCancel={() => setOpenBorrar(false)}
        >
        </SweetAlert>
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
                                                src={backImage}
                                            ></img>
                                            <div className="card-body text-center">
                                                <img className="avatar rounded-circle"
                                                    src={logo}
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

                        <Tab eventKey="contact" title="Galería">
                            <div id="gallery" className="tab-pane active">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-12 my-auto">
                                                        <Carousel infiniteLoop={true} showThumbs={false} useKeyboardArrows onChange={(e) => setImagenSeleccionada(e)}>
                                                            {imagenes.map(imagen => {
                                                                return <div>
                                                                    <img height={500} src={imagen} />
                                                                </div>
                                                            })}
                                                        </Carousel>
                                                        <button onClick={() => setOpenBorrar(true)} className="btn btn-primary" style={{ float: 'right', marginTop: '1%' }}> Borrar</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-2 imgUp">
                                            <img className="imagePreview" src={imagenesPreview == undefined ? 'https://icon-library.net/images/add-image-icon/add-image-icon-14.jpg' : imagenesPreview}></img>
                                            <label className="btn btn-primary btn-upload">Seleccionar imagen<input accept="image/*" type="file"
                                                className="uploadFile img"
                                                style={{ width: '0px', height: '0px', overflow: 'hidden' }} onChange={(e) => cambioPreview(e)}></input>
                                            </label>
                                            {imagenesPreview !== undefined ? <button className="btn btn-primary btn-upload" style={{ width: '100%' }} onClick={subirImagen}>Subir</button>
                                                :
                                                <span></span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Sonnet />
                        </Tab>
                        <Tab eventKey="workers" title="Trabajadores">
                            <div id="workers" className="tab-pane in">
                                <div className="card mb-3 col-lg-12">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-bordered TreeTable" id="TreeTable" width="100%"
                                                cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>Apellidos</th>
                                                        <th>Email</th>
                                                        <th>Teléfono</th>
                                                        <th>Editar</th>
                                                        <th>Borrar</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {empleados.map((empleado, i) =>
                                                        empleado.RefNegocio.path.split('/')[3] === empleadoSeleccionado.RefNegocio.path.split('/')[3] ?
                                                            <tr className='clickable-row' key={i}>
                                                                <td>{empleado.Nombre}</td>
                                                                <td>{empleado.Apellidos}</td>
                                                                <td>{empleado.Email}</td>
                                                                <td>{empleado.Telefono}</td>
                                                                <td><button style={{ backgroundColor: '#E6495A', margin: 'auto', border: '1px solid black', display: 'block' }} className="btn fa fa-edit" type="button" value=""  ></button></td>
                                                                <td><button style={{ backgroundColor: '#E6495A', margin: 'auto', border: '1px solid black', display: 'block' }} className="btn fa fa-trash" type="button" value=""  ></button></td>
                                                            </tr>
                                                            :
                                                            <span></span>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
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