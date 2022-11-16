import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import store from "./store.js";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Admin from "./Admin.js";
import Web from "./Web.js";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Driod Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  // Disable Right Click

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/*" element={<Web />} />
      </Routes>
    </Router>
  );
}

export default App;
