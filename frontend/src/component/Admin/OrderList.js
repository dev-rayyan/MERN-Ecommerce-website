import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
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
  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>
          {orderUserIds.map((order) => (
            <li key={OrderCounter1++}>
              Order is {order} & It is Ordered by{" "}
              {OrderuserNames[OrderCounter1]}
            </li>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
