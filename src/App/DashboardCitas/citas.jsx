import React from 'react'
import Border from '../BorderTemplate/Border'
import * as firebase from 'firebase'

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

/*
Script barra busqueda
            <script>
                                    function myFunction() {
                var input, filter, table, tr, td, i, txtValue;
                input = document.getElementById("myInput");
                filter = input.value.toUpperCase();
                table = document.getElementById("dataTable");
                tr = table.getElementsByTagName("tr");
                for (i = 0; i < tr.length; {
                                        td = tr[i].getElementsByTagName("td")[0];
                  if (td) {
                                        txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                                        tr[i].style.display = "";
                    } else {
                                        tr[i].style.display = "none";
                    }
                  }
                }
              }
            </script>
*/
firebase.initializeApp(firebaseConfig);

class Citas extends React.Component {
    constructor() {
        super()

        this.state = { horarioentrada: '', horariosalida: '', precio: '', servicio: '' }
    }
    componentDidMount() {
        ///NegociosDev/Peluquerías/Negocios/PR01/citas/1xCDFWiDx3jUdKo8R3AG
        const nameRef = firebase.firestore().collection('NegociosDev').doc('Peluquerías').collection('Negocios').doc('PR01').collection('citas').doc('1xCDFWiDx3jUdKo8R3AG')
        nameRef.onSnapshot(doc => {
            this.setState({
                horarioentrada: doc.data().CheckIn,
                horariosalida: doc.data().CheckOut,
                precio: doc.data().Precio,
                servicio: doc.data().Servicio
            })
            console.log(doc.data().Negocio)

        })
    }
    render() {
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
                        <i className="fa fa-table"></i> Citas 25/06/2020
          <button className="btn-xs	"><i className="fa fa-caret-square-o-right"></i></button>
                        <button className="btn-xs	"><i className="fa fa-caret-square-o-left"></i></button>
                    </div>
                    <h1>{this.state.name}</h1>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered TreeTable" id="TreeTable" width="100%"
                                cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>Horario entrada</th>
                                        <th>Horario salida</th>
                                        <th>Precio</th>
                                        <th>Servicio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='clickable-row' data-href='url://'>
                                        <td>{this.state.horarioentrada}</td>
                                        <td>{this.state.horariosalida}</td>
                                        <td>{this.state.servicio}</td>
                                        <td>{this.state.precio}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <br></br>
                            <div id="out"></div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="sticky-footer">
                <div className="container">
                    <div className="text-center">
                        <small>Copyright © Resérvalo 2020</small>
                    </div>
                </div>
            </footer>
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
                            <a className="btn btn-primary" style={{ backgroundColor: "E6495A", borderColor: "E6495A" }} href="login.html">Sí</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    };
}
export default Citas;