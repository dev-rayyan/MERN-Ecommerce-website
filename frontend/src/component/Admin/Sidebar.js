import * as React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import Loader from "../layout/Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    $(".sidebar-dropdown > a").on("click", function () {
      $(".sidebar-submenu").slideUp(400);
      if ($(this).parent().hasClass("active")) {
        $(".sidebar-dropdown").removeClass("active");
        $(this).parent().removeClass("active");
      } else {
        $(".sidebar-dropdown").removeClass("active");
        $(this).next(".sidebar-submenu").slideDown(400);
        $(this).parent().addClass("active");
      }
    });
    $(".sidebar-sub-dropdown > a").on("click", function () {
      $(".sidebar-sub-submenu").slideUp(400);
      if ($(this).parent().hasClass("active")) {
        $(".sidebar-sub-dropdown").removeClass("active");
        $(this).parent().removeClass("active");
      } else {
        $(".sidebar-sub-dropdown").removeClass("active");
        $(this).next(".sidebar-sub-submenu").slideDown(400);
        $(this).parent().addClass("active");
      }
    });

    $("#close-sidebar").on("click", function () {
      $(".page-wrapper").removeClass("toggled");
    });

    $("#show-sidebar").on("click", function () {
      $(".page-wrapper").addClass("toggled");
    });
  }, [loading, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <a id="show-sidebar" class="btn btn-sm btn-dark" href="#">
            <i class="fas fa-bars"></i>
          </a>

          <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
              <div class="sidebar-brand">
                <Link to="/">
                  {" "}
                  <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Back
                  to Home
                </Link>
                <div id="close-sidebar">
                  <i class="fas fa-times"></i>
                </div>
              </div>
              <div class="sidebar-header">
                <div class="user-pic" style={{ color: "#fff" }}>
                  <img
                    src={
                      user.avatar && user.avatar.url
                        ? user.avatar.url
                        : "/Profile.png"
                    }
                    alt="Profile"
                  />
                </div>
                <div class="user-info">
                  <span class="user-name">
                    {" "}
                    <strong>{user.name}</strong>
                  </span>
                  <span class="user-role">
                    {user.role === "admin" ? "Administrator" : "Moderator"}
                  </span>
                  <span class="user-status">
                    <i class="fa fa-circle"></i> <span>Online</span>
                  </span>
                </div>
              </div>
              <div class="sidebar-search">
                <div>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control search-menu"
                      placeholder="Search..."
                    />
                    <div class="input-group-append">
                      <span class="input-group-text">
                        <i class="fa fa-search" aria-hidden="true"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="sidebar-menu">
                <ul>
                  <li class="header-menu">
                    <span>General</span>
                  </li>
                  <li>
                    <Link to="/admin/dashboard">
                      <i class="fa fa-tachometer-alt"></i>
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li class="sidebar-dropdown">
                    <a href="#">
                      <i class="fa fa-shopping-cart"></i>
                      <span>E-commerce</span>
                    </a>
                    <div class="sidebar-submenu">
                      <ul>
                        <li class="sidebar-sub-dropdown">
                          <a href="#">
                            <i class="fas fa-warehouse"></i>
                            <span>Products</span>
                          </a>
                          <div class="sidebar-sub-submenu">
                            <ul>
                              <li>
                                <Link to="/admin/product">Add Product</Link>
                              </li>
                              <li>
                                <Link to="/admin/products">All Product</Link>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li class="sidebar-sub-dropdown">
                          <a href="#">
                            <i class="fas fa-th-large"></i>
                            <span>Categories</span>
                          </a>
                          <div class="sidebar-sub-submenu">
                            <ul>
                              <li>
                                <Link to="/admin/category">Add Category</Link>
                              </li>
                              <li>
                                <Link to="/admin/categories">
                                  All Categories
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li class="sidebar-sub-dropdown">
                          <a href="#">
                            <i class="fas fa-wallet"></i>
                            <span>Orders</span>
                          </a>
                          <div class="sidebar-sub-submenu">
                            <ul>
                              <li>
                                <Link to="/admin/order/:id">Update Order</Link>
                              </li>
                              <li>
                                <Link to="/admin/orders">All Orders</Link>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <Link to="/admin/users">
                            <i class="fas fa-users"></i>
                            <span>Users</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="sidebar-dropdown">
                    <a href="#">
                      <i class="far fa-gem"></i>
                      <span>Components</span>
                    </a>
                    <div class="sidebar-submenu">
                      <ul>
                        <li>
                          <a href="#">General</a>
                        </li>
                        <li>
                          <a href="#">Panels</a>
                        </li>
                        <li>
                          <a href="#">Tables</a>
                        </li>
                        <li>
                          <a href="#">Icons</a>
                        </li>
                        <li>
                          <a href="#">Forms</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="sidebar-dropdown">
                    <a href="#">
                      <i class="fa fa-chart-line"></i>
                      <span>Charts</span>
                    </a>
                    <div class="sidebar-submenu">
                      <ul>
                        <li>
                          <a href="#">Pie chart</a>
                        </li>
                        <li>
                          <a href="#">Line chart</a>
                        </li>
                        <li>
                          <a href="#">Bar chart</a>
                        </li>
                        <li>
                          <a href="#">Histogram</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="sidebar-dropdown">
                    <a href="#">
                      <i class="fa fa-globe"></i>
                      <span>Maps</span>
                    </a>
                    <div class="sidebar-submenu">
                      <ul>
                        <li>
                          <a href="#">Google maps</a>
                        </li>
                        <li>
                          <a href="#">Open street map</a>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li class="header-menu">
                    <span>Extra</span>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-book"></i>
                      <span>Documentation</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-calendar"></i>
                      <span>Calendar</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-folder"></i>
                      <span>Examples</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="sidebar-footer">
              <a href="#">
                <i class="fa fa-bell"></i>
                <span class="badge rounded-pill bg-warning notification">
                  3
                </span>
              </a>
              <a href="#">
                <i class="fa fa-envelope"></i>
                <span class="badge rounded-pill bg-success notification">
                  7
                </span>
              </a>
              <a href="#">
                <i class="fa fa-cog"></i>
                <span class="badge-sonar"></span>
              </a>
              <a href="#">
                <i class="fa fa-power-off"></i>
              </a>
            </div>
          </nav>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Sidebar;
