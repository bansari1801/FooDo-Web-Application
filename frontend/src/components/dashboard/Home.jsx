// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../commons/NavBar";

const Home = () => {
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div>
      {isAuth ? (
        <>
          <NavBar />

          <Outlet />
        </>
      ) : (
        <Navigate to="/login" replace />
      )}
    </div>
  );
};

export default Home;
