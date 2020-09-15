import React, { useState } from 'react';
import '../../../css/dashboard-init.css';
import Navbar from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Link } from 'react-router';
import { NavLink } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useSignOut } from 'react-auth-kit';

const logo = require('../../../Resources/main-icon.png');
const Border = () => {
  const signOut = useSignOut();
  const [isOpen, setOpen] = useState(false);

  const [menuVisible, setMenuVisible] = useState(false);

  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }

  const show = menuVisible ? 'show' : '';
  return (
    <div>
      <SweetAlert
        warning
        showCancel
        show={isOpen} //Notice how we bind the show property to our component state
        confirmBtnText="Sí"
        cancelBtnText="No"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="danger"
        title="¿Te vas?"
        onConfirm={() => signOut()}
        onCancel={() => {
          console.log('bye');
          setOpen(false); // Don't forget to close the modal
        }}
        //focusCancelBtn
      >
        ¿Estás seguro de que quieres salir?
      </SweetAlert>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
        id="mainNav"
      >
        <div className="navbar-brand">
          <NavLink
            to="/perfil"
            activeStyle={{
              color: '#E6495A',
            }}
            className="nav-link"
          >
            <img src={logo} className="icon-top" alt="icon"></img>
          </NavLink>
        </div>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => toggleMenu()}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={'collapse navbar-collapse ' + show}
          id="navbarResponsive"
        >
          <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
            <li
              className="nav-item first-item"
              data-toggle="tooltip"
              data-placement="right"
              title="Link"
            >
              <NavLink
                to="/perfil"
                activeStyle={{
                  color: '#E6495A',
                }}
                className="nav-link"
              >
                <i className="fa fa-fw fa-user"></i>
                <span className="nav-link-text"> Perfil</span>
              </NavLink>
            </li>
            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="right"
              title="Tables"
            >
              <NavLink
                to="/citas"
                activeStyle={{
                  color: '#E6495A',
                }}
                className="nav-link"
              >
                <i className="fa fa-fw fa-link"></i>
                <span className="nav-link-text">Buscar citas</span>
              </NavLink>
              <NavLink
                to="/productos"
                activeStyle={{
                  color: '#E6495A',
                }}
                className="nav-link"
              >
                <i className="fa fa-list-alt"></i>
                <span className="nav-link-text"> Mis productos</span>
              </NavLink>
            </li>
            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="right"
              title="Link"
            >
              <NavLink
                to="/servicios"
                activeStyle={{
                  color: '#E6495A',
                }}
                className="nav-link"
              >
                <i className="fa fa-magic"></i>
                <span className="nav-link-text"> Servicios</span>
              </NavLink>
            </li>
            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="right"
              title="Charts"
            >
              <a className="nav-link" href="generar-factura.html">
                <i className="fa fa-fw fa-area-chart"></i>
                <span className="nav-link-text">Generar factura</span>
              </a>
            </li>
            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="right"
              title="Menu Levels"
            >
              <a
                className="nav-link nav-link-collapse collapsed"
                data-toggle="collapse"
                href="#collapseMulti"
                data-parent="#exampleAccordion"
              >
                <i className="fa fa-fw fa-sitemap"></i>
                <span className="nav-link-text">Menu Levels</span>
              </a>
              <ul className="sidenav-second-level collapse" id="collapseMulti">
                <li>
                  <a href="#">Second Level Item</a>
                </li>
                <li>
                  <a href="#">Second Level Item</a>
                </li>
                <li>
                  <a href="#">Second Level Item</a>
                </li>
                <li>
                  <a
                    className="nav-link-collapse collapsed"
                    data-toggle="collapse"
                    href="#collapseMulti2"
                  >
                    Third Level
                  </a>
                  <ul
                    className="sidenav-third-level collapse"
                    id="collapseMulti2"
                  >
                    <li>
                      <a href="#">Third Level Item</a>
                    </li>
                    <li>
                      <a href="#">Third Level Item</a>
                    </li>
                    <li>
                      <a href="#">Third Level Item</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="right"
              title="Link"
            >
              <NavLink
                to="/horarios"
                activeStyle={{
                  color: '#E6495A',
                }}
                className="nav-link"
              >
                <i className="fa fa-calendar-check-o"></i>
                <span className="nav-link-text"> Horarios</span>
              </NavLink>
            </li>

            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="right"
              title="Link"
            >
              <NavLink
                to="/fichar"
                activeStyle={{
                  color: '#E6495A',
                }}
                className="nav-link"
              >
                <i className="fa fa-qrcode"></i>
                <span className="nav-link-text"> Fichar</span>
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a
                onClick={() => {
                  setOpen(true); // Open the modal
                }}
                className="nav-link"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                <i className="fa fa-fw fa-sign-out"></i>Cerrar sesión
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

Border.propTypes = {
  isClicked: PropTypes.func,
};
export default Border;

/*
<Navbar bg="dark" variant="dark" fixed="top" expand="lg" >
            <Navbar.Brand>
                <NavLink to="/perfil" activeStyle={{
                    color: '#E6495A'
                }} className="nav-link">
                    <img src={logo} className="icon-top" alt="icon"></img>
                </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item>
                        <NavLink to="/perfil" activeStyle={{
                            color: '#E6495A'
                        }} className="nav-link">
                            <i className="fa fa-fw fa-user"></i>
                            <span className="nav-link-text"> Perfil</span>

                        </NavLink>
                    </Nav.Item>

                    <Nav.Item>
                        <NavLink to="/citas" activeStyle={{
                            color: '#E6495A'
                        }} className="nav-link">
                            <i className="fa fa-fw fa-link"></i>
                            <span className="nav-link-text">Buscar citas</span>

                        </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to="/productos" activeStyle={{
                            color: '#E6495A'
                        }} className="nav-link">
                            <i className="fa fa-list-alt"></i>
                            <span className="nav-link-text"> Mis productos</span>

                        </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to="/servicios" activeStyle={{
                            color: '#E6495A'
                        }} className="nav-link">
                            <i className="fa fa-magic"></i>
                            <span className="nav-link-text"> Servicios</span>
                        </NavLink>
                    </Nav.Item>

                    <Nav.Item>
                        <NavLink to="/horarios" activeStyle={{
                            color: '#E6495A'
                        }} className="nav-link">
                            <i className="fa fa-calendar-check-o"></i>
                            <span className="nav-link-text"> Horarios</span>

                        </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to="/fichar" activeStyle={{
                            color: '#E6495A'
                        }} className="nav-link">
                            <i className="fa fa-qrcode"></i>
                            <span className="nav-link-text"> Fichar</span>
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <a onClick={() => {
                            setOpen(true); // Open the modal
                        }} className="nav-link" data-toggle="modal" data-target="#exampleModal">
                            <i className="fa fa-fw fa-sign-out"></i>Cerrar sesión</a>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar >
*/
