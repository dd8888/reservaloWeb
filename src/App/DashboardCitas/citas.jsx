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




class Appp extends React.Component {
    constructor() {
        super()
        this.state = { name: 'hey' }
    }
    componentDidMount() {
        const nameRef = firebase.database().ref().child('Anonimos').child('wx3czBh22dMQUTNDwD9l').endAt('Nombre')
        nameRef.on('value', snapshot => {
            this.setState({
                name: snapshot.val()
            })
        })
    }

    render() {
        return <h1>{this.state.name}</h1>
    }
}


const Citas = () => (
    <div>
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
                <Appp></Appp>

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered TreeTable" id="TreeTable" width="100%"
                            cellSpacing="0">


                            <thead>
                                <tr>
                                    <th>Teléfono</th>
                                    <th>Día</th>
                                    <th>Hora entrada</th>
                                    <th>Hora salida</th>
                                    <th>Precio</th>
                                    <th>Servicio</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='clickable-row'>
                                    <td>654654654</td>
                                    <td>2011/04/25</td>
                                    <td>12:30</td>
                                    <td>13:30</td>
                                    <td>15€</td>
                                    <td>Corte de pelo</td>
                                </tr>
                                <tr className='clickable-row' data-href='#'>
                                    <td>324142132</td>
                                    <td>2011/07/25</td>
                                    <td>14:00</td>
                                    <td>15:30</td>
                                    <td>7€</td>
                                    <td>Barba</td>

                                </tr>
                                <tr className='clickable-row' data-href='url://'>
                                    <td>543524254</td>
                                    <td>2009/01/12</td>
                                    <td>13:30</td>
                                    <td>13:50</td>
                                    <td>10€</td>
                                    <td>Mechas</td>

                                </tr>
                                <tr className='clickable-row' data-href='url://'>
                                    <td>657634579</td>
                                    <td>2012/03/29</td>
                                    <td>16:30</td>
                                    <td>17:00</td>
                                    <td>12€</td>
                                    <td>Uñas</td>

                                </tr>
                                <tr className='clickable-row' data-href='url://'>
                                    <td>839201832</td>
                                    <td>2008/11/28</td>
                                    <td>18:30</td>
                                    <td>18:45</td>
                                    <td>13€</td>
                                    <td>Corte de pelo</td>

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
);

export default Citas;