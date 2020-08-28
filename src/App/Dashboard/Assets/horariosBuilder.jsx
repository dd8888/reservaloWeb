import React, { useState, useEffect, useContext } from 'react'
import '../../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import '../../../css/dashboard-init.css'
import { AuthContext } from '../../Auth';
import buildFirestore from './firebaseBuilder'

const HorariosBuilder = () => {
    const database = buildFirestore();
    //Comprobar usuario
    var BreakException = {};
    const { currentUser } = useContext(AuthContext);
    const [empleados, setEmpleados] = useState([]);
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


                });
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
                setEmpleados(fetchedEmpleados);
            })

    }, [])

    let obj = {
        empleadoSeleccionado: empleadoSeleccionado,
        empleados: empleados
    }
    return obj

}

export default HorariosBuilder;