/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import ErrorPage from "../error-page";
import Bet from "../pages/Bet";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  { path: "/bet", element: <Bet />, errorElement: <ErrorPage /> },
]);
