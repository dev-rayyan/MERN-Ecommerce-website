import React, { Fragment } from "react";
import "./Header.css";
import $ from "jquery";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometer,
  faAddressBook,
  faCalendar,
  faChartBar,
  faCopy,
  faWarehouse,
  faBars,
  faHome,
  faUser,
  faDashboard,
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";
import {
  Dashboard,
  AdminPanelSettings,
  ListAlt,
  ExitToApp,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import UserOptions from "./UserOptions.js";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }
  return (
    <Fragment>
      <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
        <div class="container-fluid">
          <a
            class="navbar-brand me-0 gradient-text hover-shine col-lg-2"
            href="#"
          >
            Navbar
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse col-lg-8"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav m-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link
                  class="nav-link active gradient-text hover-shine"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link gradient-text hover-shine"
                  aria-current="page"
                  to="/products"
                >
                  Products
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link gradient-text hover-shine"
                  aria-current="page"
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-2">
            {isAuthenticated ? (
              <div class="dropdown ms-auto">
                <input type="checkbox" id="dropdown" />
                <label class="dropdown__face m-0" for="dropdown">
                  <div class="dropdown__text">
                    {user.name}
                    {user.role === "admin" && (
                      <ul className="dropdown_item_ul">
                        <li className="dropdown_item_li">
                          <Tooltip title="Dashboard">
                            <Link to="/admin/dashboard">
                              <Dashboard />
                            </Link>
                          </Tooltip>
                        </li>
                      </ul>
                    )}
                  </div>
                </label>
                <ul class="dropdown__items">
                  <li>
                    <Link to="/profile">
                      <Tooltip title="Profile">
                        <Person />
                      </Tooltip>
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders">
                      <Tooltip title="Orders">
                        <ListAlt />
                      </Tooltip>
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart">
                      <Tooltip title="Cart">
                        <ShoppingCart />
                      </Tooltip>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={logoutUser}>
                      <Tooltip title="Logout">
                        <ExitToApp />
                      </Tooltip>
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link className="nav-btn-1" to="/login">
                <FontAwesomeIcon icon={faUser} />
                Login/Register
              </Link>
            )}
          </div>
        </div>
      </nav>
      <svg className="dropdown-svg">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>
    </Fragment>
  );
};

export default Header;
