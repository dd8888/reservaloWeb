import React, { useState, useContext, useCallback } from 'react';
import * as firebase from 'firebase';
import '../../css/bootstrap.min.css';
import '../../css/dashboard-init.css';
import { Redirect, useHistory } from 'react-router-dom';
import { AuthContext } from '../Auth';
import '@babel/polyfill';
import { useSignIn, useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';

const logo = require('../../Resources/main-icon.png');

const Login = () => {
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();

  const [formData, setFormData] = useState({ Email: '', Password: '' });
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('http://163.172.183.16:32545/login', formData).then((res) => {
      if (res.data.code === 200) {
        if (
          signIn({
            token: '35v3443bn368367n306306wbn407qn420b436b4', //Just a random token
            tokenType: 'Bearer', // Token type set as Bearer
            authState: { name: 'React User', uid: 123456 }, // Dummy auth user state
            expiresIn: 120, // Token Expriration time, in minutes
          })
        ) {
          // If Login Successfull, then Redirect the user to secure route
          history.push('/404');
        } else {
          // Else, there must be some error. So, throw an error
          alert('Error Occoured. Try Again');
        }
      }
    });
  };
  if (isAuthenticated()) {
    console.log(isAuthenticated());
    // If authenticated user, then redirect to secure dashboard
    return <Redirect to={'/404'} />;
  } else {
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
                            setFormData({
                              ...formData,
                              Password: e.target.value,
                            })
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
  }
};
export default Login;
