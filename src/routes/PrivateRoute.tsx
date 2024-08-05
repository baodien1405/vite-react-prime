import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function PrivateRoute() {
  const accessToken = cookies.get("accessToken");

  if (!accessToken) {
    return <Navigate to="/admin/login" />;
  }

  return <Outlet />;
}
