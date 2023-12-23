import {
  createBrowserRouter,
  redirect,
  type LoaderFunction,
} from "react-router-dom";
import RegisterPage from "../views/registerPage";
import LoginPage from "../views/loginPage";
import NotFoundPage from "../views/notFound";
import NavigationBar from "../components/navbar/navigationBar";
import Home from "../views/home";
import ProductDetail from "../views/productDetail";
import CartPage from "../views/cart";
import PaymentPage from "../views/payment";
import WalletPage from "../views/wallet";

export default createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
    loader: (() => {
      if (localStorage.getItem("access_token")) return redirect("/");
      return null;
    }) as LoaderFunction<typeof RegisterPage>,
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: (() => {
      if (localStorage.getItem("access_token")) return redirect("/");
      return null;
    }) as LoaderFunction<typeof LoginPage>,
  },
  {
    path: "/",
    element: <NavigationBar />,
    loader: (() => {
      if (!localStorage.getItem("access_token")) return redirect("/login");
      return null;
    }) as LoaderFunction<typeof NavigationBar>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/payment",
        element: <PaymentPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path:'/wallet',
        element:<WalletPage/>
      }
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
