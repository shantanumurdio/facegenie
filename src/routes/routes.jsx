import React from "react";
import { useNavigate, Route, Routes, Navigate } from "react-router-dom";
// import Login from "../pages/login"
// import Layout from "../layout";
import Dashboard from "../pages/dashboard";
import UploadVideos from "../pages/uploadvideos"
import Allvideos from "../pages/allvideos"
import Analysis from "../pages/viewAnalysis"
import Settings from "../pages/settings"
import Logout from "../pages/logout"
// import FirstPage from "../pages/firstPage";
import Login from "../pages/login"
import User from "../pages/user";
import Role from "../pages/role";

const Routers = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} /> 
      <Route path="/uploadvideos" element={<UploadVideos/>} /> 
      <Route path="/allvideos" element={<Allvideos/>} /> 
      <Route path="/analysis" element={<Analysis/>} /> 
      <Route path="/user" element={<User/>} /> 
      <Route path="/role" element={<Role/>} /> 
      <Route path="/settings" element={<Settings/>} /> 
      <Route path="/logout" element={<Logout/>} /> 
    </Routes>
  );
};

export default Routers;



      /* 
      /* <Route path="*" element={<Navigate to="/" />} /> */
      /* <Route path="/login" element={<Login />} /> */