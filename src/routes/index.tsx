import {
  createBrowserRouter,
  redirect,
  type LoaderFunction,
} from "react-router-dom";
import RegisterPage from "../views/registerPage";

export default createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
