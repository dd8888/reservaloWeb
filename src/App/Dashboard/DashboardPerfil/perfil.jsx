import React, { useState, useEffect, useContext } from 'react';
import * as firebase from 'firebase';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import '../../../css/dashboard-init.css';
import { useHistory } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tabs';
import Sonnet from 'react-bootstrap/Tabs';
import { AuthContext } from '../../Auth';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import buildFirebase from '../Assets/firebaseBuilder';
import buildEmpleados from '../Assets/empleadosBuilder';
import Footer from '../BorderTemplate/Footer';

const database = buildFirebase();
var passwordHash = require('password-hash');
var generator = require('generate-password');
var password = generator.generate({
  length: 10,
  numbers: true,
});

const storageRef = firebase.storage().ref();

const MainPerfil = () => {
  const [imagenesPreview, setImagenesPreview] = useState();
  const [imagenesPreviewLink, setImagenesPreviewLink] = useState();
  const [imagenSeleccionada, setImagenSeleccionada] = useState();
  const empleadoSeleccionado = buildEmpleados().empleadoSeleccionado;
  const empleados = buildEmpleados().empleados;
  const [updateEmp, setUpdateEmp] = useState(1);

  /* useEffect(() => {
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
                 });
                 setEmpleados(fetchedEmpleados);
                 setEmpleadoSeleccionado(fetchedEmpleados[emails.indexOf(currentUser.email)])
 
             })
 
     }, [updateEmp])*/

  const { currentUser } = useContext(AuthContext);
  const [logo, setLogo] = useState();
  const [backImage, setBackImage] = useState();
  const [imagenes, setImagenes] = useState([]);
  const [update, setUpdate] = useState();
  const [isOpenCrear, setOpenCrear] = useState(false);
  const [isOpenEditar, setOpenEditar] = useState(false);
  const [empleadoSelec, setEmpleadoSelec] = useState();
  const [crearVisible, setCrearVisible] = useState(false);
  const [editarVisible, setEditarVisible] = useState(false);

  useEffect(() => {
    if (empleadoSeleccionado != undefined) {
      firebase
        .storage()
        .ref()
        .child(empleadoSeleccionado.RefNegocio.path.split('/')[3] + '/Gallery')
        .listAll()
        .then(function (result) {
          const promises = result.items.map((itemRef) =>
            itemRef.getDownloadURL()
          );
          Promise.all(promises).then((urls) => setImagenes(urls));
        });

      firebase
        .storage()
        .ref()
        .child(
          empleadoSeleccionado.RefNegocio.path.split('/')[3] + '/Gallery/0.jpeg'
        )
        .getDownloadURL()
        .then(function (result) {
          setLogo(result);
        });
      firebase
        .storage()
        .ref()
        .child(
          empleadoSeleccionado.RefNegocio.path.split('/')[3] + '/Gallery/1.jpeg'
        )
        .getDownloadURL()
        .then(function (result) {
          setBackImage(result);
        });
    }
  }, [empleadoSeleccionado, update]);

  const cambioPreview = (e) => {
    setImagenesPreviewLink(e.target.files[0]);
    setImagenesPreview(URL.createObjectURL(e.target.files[0]));
  };

  const subirImagen = () => {
    const refImagen = storageRef.child(
      empleadoSeleccionado.RefNegocio.path.split('/')[3] +
        '/Gallery/' +
        imagenes.length +
        '.' +
        imagenesPreviewLink.name.split('.')[
          imagenesPreviewLink.name.split('.').length - 1
        ]
    );
    refImagen.put(imagenesPreviewLink).then(function () {
      setOpen(true);
    });
  };

  const [isOpen, setOpen] = useState(false);
  const [isOpenBorrar, setOpenBorrar] = useState(false);

  let nombreInput = React.createRef();
  let apellidosInput = React.createRef();
  let emailInput = React.createRef();
  let telefonoInput = React.createRef();

  const editarServicio = () => {
    if (
      nombreInput.current.value != null &&
      apellidosInput.current.value != null &&
      emailInput.current.value != null &&
      telefonoInput.current.value != null
    ) {
      database.collection('EmpleadosDev').doc(empleadoSelec.id).update({
        Nombre: nombreInput.current.value,
        Apellidos: apellidosInput.current.value,
        Email: emailInput.current.value,
        Telefono: telefonoInput.current.value,
      });
      setUpdateEmp(updateEmp + 1);
      setOpenEditar(true);
      window.location.reload(false);
    }
  };

  const crearEmpleado = () => {
    if (
      nombreInput.current.value != null &&
      apellidosInput.current.value != null &&
      emailInput.current.value != null &&
      telefonoInput.current.value != null
    ) {
      var hashedPassword = passwordHash.generate(password);
      database
        .collection('NegociosDev')
        .doc(empleadoSeleccionado.RefNegocio.path.split('/')[1])
        .collection('Negocios')
        .doc(empleadoSeleccionado.RefNegocio.path.split('/')[3])
        .collection('empleados')
        .doc(nombreInput.current.value)
        .set({
          Negocio: empleadoSeleccionado.RefNegocio.path.split('/')[3],
          Nombre: nombreInput.current.value,
        });
      database.collection('EmpleadosDev').add({
        Nombre: nombreInput.current.value,
        Apellidos: apellidosInput.current.value,
        Email: emailInput.current.value,
        Telefono: telefonoInput.current.value,
        RefNegocio: empleadoSeleccionado.RefNegocio,
        Contraseña: hashedPassword,
      });
      try {
        firebase
          .auth()
          .createUserWithEmailAndPassword(emailInput.current.value, password);
        setUpdateEmp(updateEmp + 1);
        setOpenCrear(true);
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className="App">
      <SweetAlert
        success
        title="¡Imagen subida con éxito!"
        show={isOpen} //Notice how we bind the show property to our component state
        onConfirm={() => {
          //Para recargar las imágenes cambio esta variable
          if (update == undefined) {
            setUpdate(1);
          } else {
            setUpdate(update + 1);
          }
          setOpen(false);
        }}
      ></SweetAlert>
      <SweetAlert
        success
        title="¡Empleado creado con éxito!"
        show={isOpenCrear} //Notice how we bind the show property to our component state
        onConfirm={() => {
          setOpenCrear(false);
          window.location.reload(false);
        }}
      >
        <span>
          La contraseña es <h3>{password}</h3>. Apúntala antes de cerrar esta
          ventana. Podrás cambiarla en un futuro. Pulsa "Ok" para volver
        </span>
      </SweetAlert>
      <SweetAlert
        danger
        title="¿Estás seguro de borrar este empleado?"
        showCancel
        confirmBtnText="Sí, borrar"
        cancelBtnText="Mejor no"
        cancelBtnBsStyle="No"
        confirmBtnBsStyle="danger"
        show={isOpenBorrar} //Notice how we bind the show property to our component state
        onConfirm={() => {
          try {
            database.collection('EmpleadosDev').doc(empleadoSelec.id).delete();
            database
              .collection('NegociosDev')
              .doc(empleadoSeleccionado.RefNegocio.path.split('/')[1])
              .collection('Negocios')
              .doc(empleadoSeleccionado.RefNegocio.path.split('/')[3])
              .collection('empleados')
              .doc(empleadoSelec.Nombre)
              .delete();
          } catch (err) {
            alert(err);
          } finally {
            setOpenBorrar(false);
            window.location.reload(false);
          }
        }}
        onCancel={() => setOpenBorrar(false)}
      ></SweetAlert>
      <SweetAlert
        success
        title="Empleado editado con éxito!"
        show={isOpenEditar} //Notice how we bind the show property to our component state
        onConfirm={() => {
          setOpenEditar(false);
        }}
      >
        Pulsa "Ok" para volver
      </SweetAlert>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a
            className="link-color"
            href=""
            onClick={(e) => {
              e.preventDefault();
              history.push({
                pathname: '/perfil',
              });
            }}
          >
            Dashboard
          </a>
        </li>
        <li className="breadcrumb-item active">Perfil</li>
      </ol>
      <div className="pfl-wrapper">
        <div className="tabbable">
          <ul className="nav nav-tabs">
            <Tabs
              defaultActiveKey="home"
              id="uncontrolled-tab-example"
              className="tabs-color"
            >
              <Tab eventKey="home" title="Perfil">
                <div id="users" className="tab-pane in">
                  <div className="container">
                    <div className="row">
                      <div
                        className="col-12 col-sm-8 col-md-6 col-lg-4"
                        style={{
                          width: '50%',
                          margin: '0 auto',
                        }}
                      />
                      <div className="card perfil-foto">
                        <img className="card-img-top" src={backImage}></img>
                        <div className="card-body text-center">
                          <img
                            className="avatar rounded-circle"
                            src={logo}
                          ></img>
                          <h4 className="card-title">Bienvenido</h4>
                          <h6 className="card-subtitle mb-2 text-muted">
                            {currentUser.email}
                          </h6>
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
                              <Carousel
                                infiniteLoop={true}
                                showThumbs={false}
                                useKeyboardArrows
                                onChange={(e) => setImagenSeleccionada(e)}
                              >
                                {imagenes.map((imagen) => {
                                  return (
                                    <div key={imagen.id}>
                                      <img
                                        key={imagen.id}
                                        height={500}
                                        src={imagen}
                                      />
                                    </div>
                                  );
                                })}
                              </Carousel>
                              <button
                                onClick={() => setOpenBorrar(true)}
                                className="btn btn-primary"
                                style={{ float: 'right', marginTop: '1%' }}
                              >
                                {' '}
                                Borrar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-2 imgUp">
                        <img
                          className="imagePreview"
                          src={
                            imagenesPreview == undefined
                              ? 'https://icon-library.net/images/add-image-icon/add-image-icon-14.jpg'
                              : imagenesPreview
                          }
                        ></img>
                        <label className="btn btn-primary btn-upload">
                          Seleccionar imagen
                          <input
                            accept="image/*"
                            type="file"
                            className="uploadFile img"
                            style={{
                              width: '0px',
                              height: '0px',
                              overflow: 'hidden',
                            }}
                            onChange={(e) => cambioPreview(e)}
                          ></input>
                        </label>
                        {imagenesPreview !== undefined ? (
                          <button
                            className="btn btn-primary btn-upload"
                            style={{ width: '100%' }}
                            onClick={subirImagen}
                          >
                            Subir
                          </button>
                        ) : (
                          <span></span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <Sonnet />
              </Tab>
              <Tab eventKey="workers" title="Trabajadores">
                <div id="workers" className="tab-pane active">
                  <div className="container">
                    <div className="row">
                      <div
                        className="col-12 col-sm-8 col-md-6 col-lg-4"
                        style={{
                          width: '50%',
                          margin: '0 auto',
                        }}
                      />
                      <div
                        className="card perfil-foto"
                        style={{ border: '0px' }}
                      >
                        <button
                          onClick={() => setCrearVisible(!crearVisible)}
                          style={{
                            marginBottom: '2%',
                            float: 'right',
                            backgroundColor: '#E6495A',
                          }}
                          className="btn btn-default"
                        >
                          Nuevo empleado
                        </button>
                        <img
                          className="card-img-top"
                          src={backImage}
                          height="1"
                          style={{ opacity: 0 }}
                        ></img>
                        {crearVisible ? (
                          <form
                            className="form-group"
                            style={{ color: 'black' }}
                          >
                            <h2>Crear nuevo empleado</h2>
                            <div>
                              <div>
                                <div className="form-group">
                                  <label htmlFor="first_name">Nombre</label>
                                  <input
                                    ref={nombreInput}
                                    type="text"
                                    className="form-control"
                                    id="first_name"
                                    placeholder="Nombre"
                                    required
                                    autoComplete="on"
                                  ></input>
                                  <span className="help-block"></span>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="first_name">Apellido</label>
                                  <input
                                    ref={apellidosInput}
                                    type="text"
                                    className="form-control"
                                    id="first_name"
                                    placeholder="Apellido"
                                    required
                                    autoComplete="on"
                                  ></input>
                                  <span className="help-block"></span>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="first_name">Teléfono</label>
                                  <input
                                    ref={telefonoInput}
                                    type="text"
                                    className="form-control"
                                    id="first_name"
                                    placeholder="Telefono "
                                    required
                                    autoComplete="on"
                                  ></input>
                                  <span className="help-block"></span>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="first_name">Email</label>
                                  <input
                                    ref={emailInput}
                                    type="mail"
                                    className="form-control"
                                    id="first_name"
                                    placeholder="Email "
                                    required
                                    autoComplete="on"
                                  ></input>
                                  <span className="help-block"></span>
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  crearEmpleado();
                                  setCrearVisible(false);
                                }}
                                className="btn btn-lg btn-primary btn-block"
                                style={{ marginBottom: '4%' }}
                                type="button"
                              >
                                Guardar empleado
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div></div>
                        )}
                        {editarVisible ? (
                          <form
                            className="form-group"
                            style={{ color: 'black' }}
                          >
                            <h2>Editar empleado</h2>
                            <div>
                              <div>
                                <div className="form-group">
                                  <label htmlFor="first_name">Nombre</label>
                                  <input
                                    readOnly
                                    defaultValue={empleadoSelec.Nombre}
                                    ref={nombreInput}
                                    type="text"
                                    className="form-control"
                                    id="first_name"
                                    placeholder="Nombre"
                                    required
                                    autoComplete="on"
                                  ></input>
                                  <span className="help-block"></span>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="first_name">Apellidos</label>
                                  <input
                                    readOnly
                                    defaultValue={empleadoSelec.Apellidos}
                                    ref={apellidosInput}
                                    type="text"
                                    className="form-control"
                                    id="first_name"
                                    placeholder="Precio"
                                    required
                                    autoComplete="on"
                                  ></input>
                                  <span className="help-block"></span>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="first_name">Email</label>
                                  <input
                                    defaultValue={empleadoSelec.Email}
                                    ref={emailInput}
                                    type="text"
                                    className="form-control"
                                    id="first_name"
                                    placeholder="Duración "
                                    required
                                    autoComplete="on"
                                  ></input>
                                  <span className="help-block"></span>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="first_name">Teléfono</label>
                                  <input
                                    defaultValue={empleadoSelec.Telefono}
                                    ref={telefonoInput}
                                    type="text"
                                    className="form-control"
                                    id="first_name"
                                    placeholder="Duración "
                                    required
                                    autoComplete="on"
                                  ></input>
                                  <span className="help-block"></span>
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  editarServicio();
                                  setEditarVisible(false);
                                }}
                                className="btn btn-lg btn-primary btn-block"
                                style={{ marginBottom: '4%' }}
                                type="button"
                              >
                                Guardar empleado
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div></div>
                        )}

                        <table
                          className="table table-bordered TreeTable"
                          id="TreeTable"
                          width="100%"
                          cellSpacing="0"
                          style={{ marginTop: '-2.2%' }}
                        >
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
                            {empleados.map((empleado) =>
                              empleado.RefNegocio.path.split('/')[3] ===
                              'PR01' ? (
                                <tr className="clickable-row" key={empleado.id}>
                                  <td key={empleado.id + 'a'}>
                                    {empleado.Nombre}
                                  </td>
                                  <td key={empleado.id + 'b'}>Manolo</td>
                                  <td key={empleado.id + 'c'}>
                                    {empleado.Email}
                                  </td>
                                  <td key={empleado.id + 'd'}>
                                    {empleado.Telefono}
                                  </td>
                                  <td key={empleado.id + 'e'}>
                                    <button
                                      style={{
                                        backgroundColor: '#E6495A',
                                        margin: 'auto',
                                        border: '1px solid black',
                                        display: 'block',
                                      }}
                                      onClick={() => {
                                        setEmpleadoSelec(empleado);
                                        setEditarVisible(!editarVisible);
                                      }}
                                      className="btn fa fa-edit"
                                      type="button"
                                      value=""
                                    ></button>
                                  </td>
                                  <td key={empleado.id + 'f'}>
                                    <button
                                      style={{
                                        backgroundColor: '#E6495A',
                                        margin: 'auto',
                                        border: '1px solid black',
                                        display: 'block',
                                      }}
                                      onClick={() => {
                                        setEmpleadoSelec(empleado);
                                        setOpenBorrar(true);
                                      }}
                                      className="btn fa fa-trash"
                                      type="button"
                                      value=""
                                    ></button>
                                  </td>
                                </tr>
                              ) : (
                                <tr key={empleado.id}></tr>
                              )
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
      <Footer></Footer>
    </div>
  );
};

export default MainPerfil;

/*
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
*/
