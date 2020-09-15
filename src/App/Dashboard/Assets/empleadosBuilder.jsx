import React, { useState, useEffect, useContext } from 'react';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import '../../../css/dashboard-init.css';
import { AuthContext } from '../../Auth';
import buildFirestore from './firebaseBuilder';
import { useAuthUser } from 'react-auth-kit';

const HorariosBuilder = () => {
  const database = buildFirestore();
  //Comprobar usuario
  var BreakException = {};
  //const auth = useAuthUser();
  //console.log(useAuthUser());

  const [empleados, setEmpleados] = useState([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState();
  useEffect(() => {
    database
      .collection('EmpleadosDev')
      .get()
      .then((response) => {
        const fetchedEmpleados = [];
        const emails = [];
        response.forEach((document) => {
          const fetchedEmpleado = {
            id: document.id,
            ...document.data(),
          };
          fetchedEmpleados.push(fetchedEmpleado);
        });
        fetchedEmpleados.forEach((element) => {
          emails.push(element.Email);
        });

        setEmpleadoSeleccionado(fetchedEmpleados[emails.indexOf(auth.email)]);

        setEmpleados(fetchedEmpleados);
      });
  }, []);

  let obj = {
    empleadoSeleccionado: empleadoSeleccionado,
    empleados: empleados,
  };
  return obj;
};

export default HorariosBuilder;
