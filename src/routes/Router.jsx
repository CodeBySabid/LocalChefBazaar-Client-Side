import { createBrowserRouter } from "react-router";
import MianLayout from "../layouts/MianLayout";
import { Component } from "react";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MianLayout,
    children: [
        {
            index: true,
            Component: Home,
        }
    ]
  },
]);

export default router