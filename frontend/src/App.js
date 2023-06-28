// ==========================================
//  Author: Khushalkumar Gondaliya, Bansari Shah, Meet Master, Karansinh Rathore
// ==========================================
import { Box } from "@mui/material";
import {
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import { ThemeProvider } from "@emotion/react";
import { useSelector } from "react-redux";
import "./App.css";
import Login from "./components/user-management/Login";
import Register from "./components/user-management/Register";

import { CssBaseline } from "@mui/material";
import Home from "./components/dashboard/Home";
import AddMenuItem from "./components/menu-items/AddMenuItem";
import MenuItemsList from "./components/menu-items/MenuItemsList";
import CreateNewOrder from "./components/order_management/newOrder";
import OrdersTable from "./components/order_management/orderLists";
import SalesReport from "./components/sales-report/SalesReport";
import StaffAdd from "./components/staff/StaffAdd";
import StaffDetails from "./components/staff/StaffDetails";
import StaffHomePage from "./components/staff/StaffHomePage";
import UserProfile from "./components/user-management/UserProfile";
import { useMode } from "./Theme";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const theme = useMode();
  const mode = useSelector((state) => state.mode);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App">
        <Routes>
          <Route
            path="/login"
            element={isAuth ? <Navigate to="/order" /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuth ? <Navigate to="/order" /> : <Register />}
          />
          <Route path="/" element={<Home />}>
            <Route path="user/profile/:id" element={<UserProfile />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/order" element={<OrdersTable />} />
            <Route path="/order/add" element={<CreateNewOrder />} />
            <Route path="/order/add/:id" element={<CreateNewOrder />} />
            <Route path="sales-report/:id" element={<SalesReport />} />
            <Route path="/staff" element={<StaffHomePage />} />
            <Route path="/staff/add" element={<StaffAdd />} />
            <Route path="/staff/view" element={<StaffDetails />} />
            <Route path="/menu" element={<MenuItemsList />} />
            <Route exact path="/menu/add" element={<AddMenuItem />} />
            <Route exact path="/menu/add/:id" element={<AddMenuItem />} />
          </Route>
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
