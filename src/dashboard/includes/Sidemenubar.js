import { Link, useLocation } from "react-router-dom";

import React from "react";

function Sidemenubar() {
  const { pathname } = useLocation();

  const isLogedIn = JSON.parse(sessionStorage.getItem("userDetails"));

  const navitem = "nav-item";

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-profile">
          <a href={() => false} className="nav-link">
            <div className="nav-profile-image">
              <img
                src="/dashboard/assets/images/faces/face1.jpg"
                alt="profile"
              />
              <span className="login-status online" />
              {/*change to offline or busy as needed*/}
            </div>
            <div className="nav-profile-text d-flex flex-column">
              <span className="font-weight-bold mb-2">
                {isLogedIn?.username}
              </span>
              <span className="text-secondary text-small">
                {isLogedIn?.role}
              </span>
            </div>
            <i className="mdi mdi-bookmark-check text-success nav-profile-badge" />
          </a>
        </li>
        <div>
          <li
            className={`${navitem} ${
              pathname.includes("/Religio/Dashboard") && "active"
            }`}>
            <Link to="/Religio/Dashboard" className="nav-link">
              <span className="menu-title">Dashboard</span>
              <i className="mdi mdi-home menu-icon" />
            </Link>
          </li>
        </div>

        <li
          className={`${navitem} ${
            pathname.includes("/Religio/Congregation") && "active"
          }`}>
          <Link to="/Religio/Congregation" className="nav-link">
            <span className="menu-title">Congregation</span>
            <i className="mdi mdi-bank menu-icon" />
          </Link>
        </li>

        <li
          className={`${navitem} ${
            pathname.includes("/Religio/Province") && "active"
          }`}>
          <Link to="/Religio/Province" className="nav-link">
            <span className="menu-title">Province</span>
            <i className="mdi mdi-home-plus menu-icon" />
          </Link>
        </li>

        <li
          className={`${navitem} ${
            pathname.includes("/Religio/ClientRegistration") && "active"
          }`}>
          <Link to="/Religio/ClientRegistration" className="nav-link">
            <span className="menu-title">Client Registration</span>
            <i className="mdi mdi-account-multiple-plus menu-icon" />
          </Link>
        </li>

        <li
          className={`${navitem} ${
            pathname.includes("/Religio/DomainRenewal") && "active"
          }`}>
          <Link to="/Religio/DomainRenewal" className="nav-link">
            <span className="menu-title">Domain</span>
            <i className="mdi mdi-domain menu-icon" />
          </Link>
        </li>

        <li
          className={`${navitem} ${
            pathname.includes("/Religio/PaymentStatus") && "active"
          }`}>
          {isLogedIn?.role === "admin" ? (
            <Link to="/Religio/PaymentStatus" className="nav-link">
              <span className="menu-title">Payment Status</span>
              <i className="mdi mdi-cash-multiple menu-icon" />
            </Link>
          ) : (
            ""
          )}
        </li>

        {/* <li className={`${navitem} ${pathname == '/Religio/Tab' && 'active'}`}>
          <Link to="/Religio/Tab" className="nav-link" >
            <span className="menu-title">Project Status</span>
            <i className="mdi mdi-file-document menu-icon" /></Link>
        </li> */}

        <li
          className={`${navitem} ${
            pathname.includes("/Religio/UsersList") && "active"
          }`}>
          {isLogedIn?.role === "admin" ? (
            <Link to="/Religio/UsersList" className="nav-link">
              <span className="menu-title">Manage Users</span>
              <i className="mdi mdi-account-circle menu-icon" />
            </Link>
          ) : (
            ""
          )}
        </li>
        <li
          className={`${navitem} ${
            pathname.includes("/Religio/HomeSections") && "active"
          }`}>
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#general-pages"
            aria-expanded="false"
            aria-controls="general-pages">
            <span className="menu-title">Home Sections</span>
            <i className="menu-arrow" />
            <i className="mdi mdi-vector-arrange-below menu-icon" />
          </a>
          <div
            className={`collapse ${
              pathname.includes("/Religio/HomeSections") && "show"
            }`}
            id="general-pages">
            <ul className="nav flex-column sub-menu">
              <li
                className={`${navitem} ${
                  pathname.includes("/Religio/HomeSections/OurClient") &&
                  "active"
                }`}>
                <Link to="/Religio/HomeSections/OurClient" className="nav-link">
                  <span className="menu-title">Our Client</span>
                </Link>
              </li>
              <li
                className={`${navitem} ${
                  pathname.includes("/Religio/HomeSections/OurCustomerSay") &&
                  "active"
                }`}>
                <Link
                  to="/Religio/HomeSections/OurCustomerSay"
                  className="nav-link">
                  <span className="menu-title">Our Customer Says</span>
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Sidemenubar;
