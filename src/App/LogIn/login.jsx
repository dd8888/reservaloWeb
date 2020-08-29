import React, { useState, useContext, useCallback } from 'react';
import * as firebase from 'firebase';
import '../../css/bootstrap.min.css';
import '../../css/dashboard-init.css'
//Da error import '../../css/login-main.css';
import { withRouter, Redirect } from 'react-router'
import { AuthContext } from '../Auth';
import '@babel/polyfill'

const logo = require('../../Resources/main-icon.png');

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

const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
                history.push("/perfil")
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        return <Redirect to="/perfil" />;
    }
    return <div>
        <div className='body__login'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-2"></div>
                    <div className="col-lg-6 col-md-8 login-box">
                        <div className="col-lg-12 login-title">
                            <img src={logo} className="icon-top__login" alt="icon" />
                        </div>

                        <div className="col-lg-12 login-form__login">
                            <div className="col-lg-12 login-form__login">
                                <form onSubmit={handleLogin}>
                                    <div className="form-group__login">
                                        <label className="form-control-label label__login">USUARIO</label>
                                        <input type="text" name="email" className="form-control__login input__login" />
                                    </div>
                                    <div className="form-group__login">
                                        <label className="form-control-label label__login">CONTRASEÑA</label>
                                        <input type="password" name="password" className="form-control__login input__login" />
                                    </div>

                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-6 login-btm login-text">
                                        </div>
                                        <div className="col-lg-6 login-btm login-button btn-group-vertical btn-opciones-ext">
                                            <button type="submit"
                                                className="btn  btn-opciones">LOGIN</button>
                                            <button type="submit" className="btn btn-pass btn-opciones ">HE
                                        OLVIDADO MI CONTRASEÑA</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-2"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default withRouter(Login);