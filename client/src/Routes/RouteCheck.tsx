import React, { useState } from "react";
import { Children } from "react";
import SideBar from "../layout/SideBar";
import HeaderBar from "../layout/HeaderBar";
import { CssBaseline, Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Notfound404 from '../components/pages/Notfound404'
interface RouteCheckProps {
  children: React.ReactNode;
  isDataLoaded:boolean
}
const RouteCheck: React.FC<RouteCheckProps>  = ({ children,isDataLoaded }) => {
  const user = useSelector((state:any) => state.user);
  console.log("isLoaded",isDataLoaded,user);
  if(isDataLoaded===false){
    return <div>Loading</div>
  }
  return user && user.user.token ?
    <div className="app">
      <SideBar text={user.name}/>
      <main className="content">
        <HeaderBar />
        <div className="content_body">
          <Box m="20px">{children}</Box>
        </div>
      </main>
    </div>:<Notfound404 text="No Login!!!!!!" path="/login"></Notfound404>
};
export default RouteCheck;
