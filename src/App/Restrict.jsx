import React, { useEffect, useState, useContext } from 'react'
import * as firebase from 'firebase'
import { AuthContext } from './Auth';

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

const CheckUserLoggedIn = () => {
    var BreakException = {};
    const { currentUser } = useContext(AuthContext);
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


                });
                fetchedEmpleados.forEach(element => {
                    emails.push(element.Email)
                });

                if (!emails.includes(currentUser.email)) {
                    alert('Este usuario no tiene permisos de acceso. Serás redirigido al login');
                    firebase.auth().signOut();
                    throw BreakException;
                }
                setEmpleados(fetchedEmpleados);
            })

    }, []/*judas*/)
}

export default CheckUserLoggedIn;