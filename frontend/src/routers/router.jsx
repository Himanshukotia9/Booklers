import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../component/Login";
import Register from "../component/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/orders",
                element: <div>orders</div>
            },
            {
                path: "/about",
                element: <div>about</div>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            },
        ]
    },
]);

export default router;