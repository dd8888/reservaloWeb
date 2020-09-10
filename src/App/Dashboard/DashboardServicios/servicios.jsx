import React, { useState, useEffect } from 'react';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import '../../../css/dashboard-init.css';
import SweetAlert from 'react-bootstrap-sweetalert';
import buildFirebase from '../Assets/firebaseBuilder';
import buildEmpleados from '../Assets/empleadosBuilder';
import Footer from '../BorderTemplate/Footer';

const database = buildFirebase();

const Servicios = () => {
  const empleadoSeleccionado = buildEmpleados().empleadoSeleccionado;
  let nombreInput = React.createRef();
  let precioInput = React.createRef();
  let duracionInput = React.createRef();

  const [servicios, setServicios] = useState([]);
  const [updateSer, setUpdateSer] = useState(1);

  useEffect(() => {
    if (empleadoSeleccionado !== undefined) {
      database
        .collection('NegociosDev')
        .doc(empleadoSeleccionado.RefNegocio.path.split('/')[1])
        .collection('Negocios')
        .doc(empleadoSeleccionado.RefNegocio.path.split('/')[3])
        .collection('servicios')
        .get()
        .then((response) => {
          const fetchedServicios = [];
          response.forEach((document) => {
            const fetchedServicio = {
              id: document.id,
              ...document.data(),
            };
            fetchedServicios.push(fetchedServicio);
          });
          setServicios(fetchedServicios);
        });
    }
  }, [empleadoSeleccionado, updateSer]);

  const [isOpenBorrar, setOpenBorrar] = useState(false);
  const [isOpenCrear, setOpenCrear] = useState(false);
  const [isOpenEditar, setOpenEditar] = useState(false);
  const [servicioSelec, setServicioSelec] = useState();
  const [crearVisible, setCrearVisible] = useState(false);
  const [editarVisible, setEditarVisible] = useState(false);

  function camelize(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }

  const crearServicio = () => {
    if (
      nombreInput.current.value != null &&
      duracionInput.current.value != null &&
      precioInput.current.value != null
    ) {
      database
        .collection('NegociosDev')
        .doc(empleadoSeleccionado.RefNegocio.path.split('/')[1])
        .collection('Negocios')
        .doc(empleadoSeleccionado.RefNegocio.path.split('/')[3])
        .collection('servicios')
        .doc(camelize(nombreInput.current.value))
        .set({
          nombre: nombreInput.current.value,
          duracion: duracionInput.current.value,
          precio: precioInput.current.value,
        });
      setUpdateSer(updateSer + 1);
      setOpenCrear(true);
    }
  };

  const editarServicio = () => {
    if (
      nombreInput.current.value != null &&
      duracionInput.current.value != null &&
      precioInput.current.value != null
    ) {
      database
        .collection('NegociosDev')
        .doc(empleadoSeleccionado.RefNegocio.path.split('/')[1])
        .collection('Negocios')
        .doc(empleadoSeleccionado.RefNegocio.path.split('/')[3])
        .collection('servicios')
        .doc(servicioSelec.id)
        .update({
          nombre: nombreInput.current.value,
          duracion: duracionInput.current.value,
          precio: precioInput.current.value,
        });
      setUpdateSer(updateSer + 1);
      setOpenEditar(true);
    }
  };

  return (
    <div className="App">
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
            database
              .collection('NegociosDev')
              .doc(empleadoSeleccionado.RefNegocio.path.split('/')[1])
              .collection('Negocios')
              .doc(empleadoSeleccionado.RefNegocio.path.split('/')[3])
              .collection('servicios')
              .doc(servicioSelec.id)
              .delete();
          } catch (err) {
            console.log(err);
          } finally {
            setOpenBorrar(false);
            setServicios(
              servicios.filter(function (el) {
                return el.id != servicioSelec.id;
              })
            );
          }
        }}
        onCancel={() => setOpenBorrar(false)}
      ></SweetAlert>
      <SweetAlert
        success
        title="¡Servicio editado con éxito!"
        show={isOpenEditar} //Notice how we bind the show property to our component state
        onConfirm={() => {
          setOpenEditar(false);
        }}
      >
        Pulsa "Ok" para volver
      </SweetAlert>
      <SweetAlert
        success
        title="¡Servicio creado con éxito!"
        show={isOpenCrear} //Notice how we bind the show property to our component state
        onConfirm={() => {
          setOpenCrear(false);
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
        <li className="breadcrumb-item active">Servicios</li>
      </ol>
      <div className="card mb-3 col-lg-12">
        <div className="card-header">
          <button
            onClick={() => setCrearVisible(true)}
            style={{
              float: 'right',
              backgroundColor: '#E6495A',
              marginLeft: '1%',
              marginTop: '-0.3%',
            }}
            className="btn btn-default"
          >
            Nuevo servicio
          </button>
        </div>

        <div className="card-body">
          {crearVisible ? (
            <form className="form-group">
              <h2>Crear nuevo servicio</h2>
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
                    <label htmlFor="first_name">Precio</label>
                    <input
                      ref={precioInput}
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
                    <label htmlFor="first_name">Duración</label>
                    <input
                      ref={duracionInput}
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
                    crearServicio();
                    setCrearVisible(false);
                  }}
                  className="btn btn-lg btn-primary btn-block"
                  type="button"
                >
                  Guardar servicio
                </button>
              </div>
            </form>
          ) : (
            <div></div>
          )}
          {editarVisible ? (
            <form className="form-group">
              <h2>Editar servicio</h2>
              <div>
                <div>
                  <div className="form-group">
                    <label htmlFor="first_name">Nombre</label>
                    <input
                      defaultValue={servicioSelec.nombre}
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
                    <label htmlFor="first_name">Precio</label>
                    <input
                      defaultValue={servicioSelec.precio}
                      ref={precioInput}
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
                    <label htmlFor="first_name">Duración</label>
                    <input
                      defaultValue={servicioSelec.duracion}
                      ref={duracionInput}
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
                  type="button"
                >
                  Guardar servicio
                </button>
              </div>
            </form>
          ) : (
            <div></div>
          )}

          <div className="table-responsive">
            <table
              className="table table-bordered TreeTable"
              id="TreeTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Duración</th>
                  <th>Precio</th>
                  <th>Editar</th>
                  <th>Borrar</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map((servicio, i) => (
                  <tr className="clickable-row" key={i}>
                    <td>{servicio.nombre}</td>
                    <td>{servicio.duracion}</td>
                    <td>{servicio.precio}</td>
                    <td>
                      <button
                        style={{
                          backgroundColor: '#E6495A',
                          margin: 'auto',
                          border: '1px solid black',
                          display: 'block',
                        }}
                        className="btn fa fa-edit"
                        type="button"
                        value=""
                        onClick={() => {
                          setServicioSelec(servicio);
                          setEditarVisible(true);
                        }}
                      ></button>
                    </td>
                    <td>
                      <button
                        style={{
                          backgroundColor: '#E6495A',
                          margin: 'auto',
                          border: '1px solid black',
                          display: 'block',
                        }}
                        className="btn fa fa-trash"
                        type="button"
                        value=""
                        onClick={() => {
                          setServicioSelec(servicio);
                          setOpenBorrar(true);
                        }}
                      ></button>
                    </td>
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
    </div>
  );
};

export default Servicios;
