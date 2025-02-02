import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../component/Login";
import Register from "../component/Register";
import CartPage from "../pages/books/cartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/books/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../component/AdminLogin";
import Dashboard from "../component/Dashboard";

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
                element: <PrivateRoute><OrderPage/></PrivateRoute>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path: "/cart",
                element: <CartPage/>
            },
            {
                path: "/checkout",
                element: <PrivateRoute><CheckoutPage/></PrivateRoute>
            },
            {
                path: "/books/:id",
                element: <SingleBook/>
            },
        ]
    },
    {
        path: "/admin",
        element: <AdminLogin/>,
    },
    {
        path: "/dashboard",
        element: <AdminRoute><Dashboard/></AdminRoute>,
        children: [
            {
                path: "",
                element: <AdminRoute><div>Dashboard home</div></AdminRoute>
            },
            {
                path: "add-new-book",
                element: <AdminRoute><div>Add new book</div></AdminRoute>
            },
            {
                path: "edit-book/:id",
                element: <AdminRoute><div>Edit book</div></AdminRoute>
            },
            {
                path: "manage-book",
                element: <AdminRoute><div>Manage book</div></AdminRoute>
            },
        ]
    },
]);

export default router;