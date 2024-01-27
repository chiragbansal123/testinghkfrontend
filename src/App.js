import React from "react";
import {
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
// import LoginRegisterBar from "./Login-Register-Bar";
import LoginPage from "./Pages/LoginPage";
// import Register from "./Register";
import ConfirmationBox from "./components/Confirmation-Box";
import Footer from "./components/Footer";
import Stock from "./Pages/Stock";
import Profile from "./Pages/Profile";
import { useSelector } from "react-redux";
import Layout from "./Layout";
import Cart from "./Pages/Cart";
import Orders from "./Pages/Orders";
// import AddItem from "./Pages/Add-Update Item";
import stockSlice from "./Reducer/stockSlice";
import { getStoredState } from "redux-persist";
import { store } from ".";
import AddUpdateItem from "./Pages/AddUpdateItem";
import HomePage from "./Pages/HomePage";
import Dashboard from "./Pages/Dashboard";
import Invoice from "./Pages/Invoice";
import EndCustomers from "./Pages/EndCustomers";
import EndCx from "./Pages/EndCx";
import LowStock from "./Pages/LowStock";
function App() {
  const isAuth = useSelector((state) => state.isAuth);
  // const cartUnit = useSelector((state) => state.Cart.cartUnit);
  // console.log("->", isAuth);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={isAuth ? <HomePage /> : <LoginPage />} />
        <Route
          path="/home-page"
          element={isAuth ? <HomePage /> : <LoginPage />}
        />
        <Route path="/profile" element={isAuth ? <Profile /> : <LoginPage />} />
        <Route path="/cart" element={isAuth ? <Cart /> : <LoginPage />} />

        <Route
          path="/add-item"
          element={isAuth ? <AddUpdateItem /> : <LoginPage />}
        />
        <Route
          path="/add-item/:id"
          element={isAuth ? <AddUpdateItem /> : <LoginPage />}
        />
        <Route path="/stock" element={isAuth ? <Stock /> : <LoginPage />} />
        <Route
          path="/invoice/:id"
          element={isAuth ? <Invoice /> : <LoginPage />}
        />
        <Route path="/orders/" element={isAuth ? <Orders /> : <LoginPage />} />
        <Route
          path="/orders/:id"
          element={isAuth ? <Orders /> : <LoginPage />}
        />

        <Route
          path="/endCustomers"
          element={isAuth ? <EndCustomers /> : <LoginPage />}
        />
        <Route path="/endCx/:id" element={isAuth ? <EndCx /> : <LoginPage />} />
        <Route
          path="/lowStock"
          element={isAuth ? <LowStock /> : <LoginPage />}
        />
        <Route
          path="/lowStock/:id"
          element={isAuth ? <LowStock /> : <LoginPage />}
        />
      </Route>
    )
  );

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
