/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import ErrorPage from "../error-page";
import Bet from "../pages/Bet";
import FormContainer from "../components/FormContainer";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/bet",
        element: <Bet />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/form",
        element: <FormContainer />,
        errorElement: <ErrorPage />,
    },
]);
