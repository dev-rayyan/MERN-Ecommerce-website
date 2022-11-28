import React, { Fragment, useEffect } from "react";
// import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import { CountertopsTwoTone, Delete, Edit } from "@mui/icons-material";
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";

import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const navigate = useNavigate();

  const { users } = useSelector((state) => state.allUsers);

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  var orderUserIds = [];
  var OrderuserNames = [];

  var Ordercounter = 0;
  orders &&
    orders.forEach((order) => {
      orderUserIds[Ordercounter] = order._id;
      users &&
        users.forEach((userData) => {
          if (order.user === userData._id) {
            OrderuserNames[Ordercounter] = userData.name;
          }
        });
      Ordercounter++;
    });
  var OrderCounter1 = 0;

  var newList = [];
  var newUser = [];

  orders &&
    orders.forEach((order) => {
      users &&
        users.forEach((userData) => {
          if (order.user === userData._id) {
            newUser = userData;
          }
        });

      newList.push({
        orderId: order._id,
        createdAt: order.createdAt,
        totalPrice: order.totalPrice,
        paymentStatus: order.paymentInfo.status,
        user: newUser,
        orderStatus: order.orderStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <div className="productListContainer">
          <div className="card">
            <h1 id="productListHeading">All Orders</h1>
            <div class="card-body px-0 py-0">
              <div class="table-responsive scrollbar">
                <table class="table table-sm fs--1 mb-0 overflow-hidden">
                  <thead class="bg-200 text-900">
                    <tr>
                      <th class="white-space-nowrap">
                        <div class="form-check mb-0 d-flex align-items-center">
                          <input
                            class="form-check-input"
                            id="checkbox-bulk-purchases-select"
                            type="checkbox"
                            data-bulk-select='{"body":"table-purchase-body","actions":"table-purchases-actions","replacedElement":"table-purchases-replace-element"}'
                          />
                        </div>
                      </th>
                      <th
                        class="sort pe-1 align-middle white-space-nowrap"
                        data-sort="name"
                      >
                        User
                      </th>
                      <th
                        class="sort pe-1 align-middle white-space-nowrap"
                        data-sort="email"
                      >
                        Email
                      </th>
                      <th
                        class="sort pe-1 align-middle white-space-nowrap "
                        data-sort="orderStatus"
                      >
                        Status
                      </th>
                      <th
                        class="sort pe-1 align-middle white-space-nowrap text-center"
                        data-sort="payment"
                      >
                        Payment
                      </th>
                      <th
                        class="sort pe-1 align-middle white-space-nowrap text-end"
                        data-sort="amount"
                      >
                        Amount
                      </th>
                      <th
                        class="sort pe-1 align-middle white-space-nowrap text-end"
                        data-sort="createdAt"
                      >
                        Created At
                      </th>
                      <th class="no-sort pe-1 align-middle data-table-row-action"></th>
                    </tr>
                  </thead>
                  <tbody class="list" id="table-purchase-body">
                    {newList &&
                      newList.map((item) => (
                        <tr class="btn-reveal-trigger">
                          <td class="align-middle">
                            <div class="form-check mb-0">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="recent-purchase-0"
                                data-bulk-select-row="data-bulk-select-row"
                              />
                            </div>
                          </td>
                          <th class="align-middle white-space-nowrap name">
                            <a href="../app/e-commerce/customer-details.html">
                              {item.user.name}
                            </a>
                          </th>
                          <td class="align-middle white-space-nowrap email">
                            {item.user.email}
                          </td>
                          <td class="align-middle white-space-nowrap email">
                            {item.orderStatus}
                          </td>
                          <td class="align-middle text-center fs-0 white-space-nowrap payment">
                            {item.paymentStatus === "succeeded" ? (
                              <span class="badge badge rounded-pill badge-soft-success">
                                Success
                                <svg
                                  class="svg-inline--fa fa-check fa-w-16 ms-1"
                                  data-fa-transform="shrink-2"
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fas"
                                  data-icon="check"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                  data-fa-i2svg=""
                                >
                                  <g transform="translate(256 256)">
                                    <g transform="translate(0, 0)  scale(0.875, 0.875)  rotate(0 0 0)">
                                      <path
                                        fill="currentColor"
                                        d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                                        transform="translate(-256 -256)"
                                      ></path>
                                    </g>
                                  </g>
                                </svg>
                              </span>
                            ) : (
                              <span class="badge badge rounded-pill badge-soft-warning">
                                Pending
                                <svg
                                  class="svg-inline--fa fa-stream fa-w-16 ms-1"
                                  data-fa-transform="shrink-2"
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fas"
                                  data-icon="stream"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                  data-fa-i2svg=""
                                >
                                  <g transform="translate(256 256)">
                                    <g transform="translate(0, 0)  scale(0.875, 0.875)  rotate(0 0 0)">
                                      <path
                                        fill="currentColor"
                                        d="M16 128h416c8.84 0 16-7.16 16-16V48c0-8.84-7.16-16-16-16H16C7.16 32 0 39.16 0 48v64c0 8.84 7.16 16 16 16zm480 80H80c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h416c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16zm-64 176H16c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h416c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16z"
                                        transform="translate(-256 -256)"
                                      ></path>
                                    </g>
                                  </g>
                                </svg>
                              </span>
                            )}
                          </td>
                          <td class="align-middle text-end amount">
                            Rs {item.totalPrice}
                          </td>
                          <td class="align-middle text-end createdAt">
                            {String(item.createdAt).substr(0, 10)}
                          </td>
                          <td class="align-middle white-space-nowrap text-end">
                            <div class="dropstart font-sans-serif position-static d-inline-block">
                              <button
                                class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end"
                                type="button"
                                id="dropdown0"
                                data-bs-toggle="dropdown"
                                data-boundary="window"
                                aria-haspopup="true"
                                aria-expanded="false"
                                data-bs-reference="parent"
                              >
                                <svg
                                  class="svg-inline--fa fa-ellipsis-h fa-w-16 fs--1"
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fas"
                                  data-icon="ellipsis-h"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                  data-fa-i2svg=""
                                >
                                  <path
                                    fill="currentColor"
                                    d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
                                  ></path>
                                </svg>
                              </button>
                              <div
                                class="dropdown-menu dropdown-menu-end border py-2"
                                aria-labelledby="dropdown0"
                              >
                                <a class="dropdown-item" href="#!">
                                  View
                                </a>
                                <Link
                                  class="dropdown-item"
                                  to={`/admin/order/${item.orderId}`}
                                >
                                  Edit
                                </Link>
                                <div class="dropdown-divider"></div>
                                <Link
                                  class="dropdown-item text-danger"
                                  onClick={() =>
                                    deleteOrderHandler(item.orderId)
                                  }
                                >
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
