import React from "react";
import StartPage from "./StartPage";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <h1 className=" bg-primary-subtle  rounded text-center p-2 m-2 mb-4">
        Welcome to Support Ticket Entry System
      </h1>
      <Outlet />
    </>
  );
};

export default Layout;
