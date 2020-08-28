import * as firebase from 'firebase'

const FirebaseStarter = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const database = firebase.firestore();

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

    return database;
}

export default FirebaseStarter