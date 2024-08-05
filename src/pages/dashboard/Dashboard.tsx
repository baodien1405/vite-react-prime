import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Dashboard() {
  const accessToken = cookies.get("accessToken");

  if (!accessToken) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="p-20">
      <div>accessToken:: {accessToken}</div>
      <div>Dashboard</div>
    </div>
  );
}
