import { BrowserRouter, Route } from "react-router-dom";
import { Navigate, Routes } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import LoginDashboard from "./components/LoginDashboard";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";

/**
 * private route for the user dashboard
 * @param param0 - the jsx element
 * @returns the route to navigate
 */
function PrivateRouteUser({ children }: { children: JSX.Element }) {
  const userId = localStorage.getItem("userId");
  return userId ? children : <Navigate to={"/login"} />;
}

/**
 * private route for the admin dashboard
 * @param param0 - the jsx element
 * @returns the route to navigate
 */
function PrivateRouteAdmin({ children }: { children: JSX.Element }) {
  const adminId = localStorage.getItem("adminId");
  return adminId ? children : <Navigate to={"/login"} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginDashboard />} />
          <Route
            path="/user-dashboard"
            element={
              <PrivateRouteUser>
                <UserDashboard />
              </PrivateRouteUser>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRouteAdmin>
                <AdminDashboard />
              </PrivateRouteAdmin>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
