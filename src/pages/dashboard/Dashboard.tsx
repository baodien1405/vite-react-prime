import { Navigate } from "react-router-dom";
// import Cookies from "universal-cookie";

// const cookies = new Cookies();

const getCookie = (name: string) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export default function Dashboard() {
  // const accessToken = cookies.get("accessToken");
  const accessToken = getCookie("accessToken");
  console.log("🚀 ~ Dashboard ~ accessToken:", accessToken);

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
