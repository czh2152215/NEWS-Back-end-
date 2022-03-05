// IndexRouter.js
import React from "react";
import { HashRouter, Routes, Route,Navigate } from "react-router-dom";
import Login from "../views/login/Login";
import NewsSandBox from "../views/sandbox/NewsSandBox";

export default function IndexRouter () {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/*" element={localStorage.getItem("token") ?  <NewsSandBox/> : <Navigate to="/login"/>} />

      </Routes>
    </HashRouter>
  );
};
