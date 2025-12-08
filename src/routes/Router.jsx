import { createBrowserRouter } from "react-router";
import MianLayout from "../layouts/MianLayout";
import { Component } from "react";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login/Login";
import Authentication from "../pages/Authentication/Authentication/Authentication";
import Registration from "../pages/Authentication/Registration/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MianLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Registration,
      }
    ]
  },
]);

export default router