import React, { useState, useContext, useCallback } from 'react';
import * as firebase from 'firebase';
import '../../css/bootstrap.min.css';
import '../../css/dashboard-init.css';
import { withRouter, Redirect } from 'react-router';
import { AuthContext } from '../Auth';
import '@babel/polyfill';
import { useSignIn } from 'react-auth-kit';
import axios from 'axios';

const logo = require('../../Resources/main-icon.png');

const userStore = require('react-jwt-store')();

const Login = ({ history }) => {
  const signIn = useSignIn();

  const [formData, setFormData] = useState({ Email: '', Password: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('http://163.172.183.16:32545/login', formData).then((res) => {
      if (res.data.code === 200) {
        console.log(res.data);
        if (
          signIn({
            token: res.data.result.AccessToken,
            expiresIn: 180,
            tokenType: 'Bearer',
            authState: { email: formData.Email },
          })
        ) {
          <Redirect to="perfil"></Redirect>;
          //history.push('/perfil');
        } else {
          alert('Error');
          //Throw error
        }
      }
    });
  };
  /*
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push('/perfil');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
*/
  return (
    <div>
      <div className="body__login">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-2"></div>
            <div className="col-lg-6 col-md-8 login-box">
              <div className="col-lg-12 login-title">
                <img src={logo} className="icon-top__login" alt="icon" />
              </div>

              <div className="col-lg-12 login-form__login">
                <div className="col-lg-12 login-form__login">
                  <form onSubmit={onSubmit}>
                    <div className="form-group__login">
                      <label className="form-control-label label__login">
                        USUARIO
                      </label>
                      <input
                        type="text"
                        name="email"
                        className="form-control__login input__login"
                        onChange={(e) =>
                          setFormData({ ...formData, Email: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group__login">
                      <label className="form-control-label label__login">
                        CONTRASEÑA
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="form-control__login input__login"
                        onChange={(e) =>
                          setFormData({ ...formData, Password: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-lg-12 loginbttm">
                      <div className="col-lg-6 login-btm login-text"></div>
                      <div className="col-lg-6 login-btm login-button btn-group-vertical btn-opciones-ext">
                        <button type="submit" className="btn  btn-opciones">
                          LOGIN
                        </button>
                        <button
                          type="submit"
                          className="btn btn-pass btn-opciones "
                        >
                          HE OLVIDADO MI CONTRASEÑA
                        </button>
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
  );
};

export default Login;
