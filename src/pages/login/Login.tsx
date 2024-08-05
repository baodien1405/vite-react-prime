import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import { authAPI } from "@/api";
import { LoginPayload } from "@/model";
import { LoginForm } from "@/pages/login/components";

const cookies = new Cookies();

export default function Login() {
  const accessToken = cookies.get("accessToken");
  const navigate = useNavigate();

  const handleLogin = async (payload: LoginPayload) => {
    const response = await authAPI.login(payload);

    if (response.data.accessToken) {
      cookies.set("accessToken", response.data.accessToken, {
        path: "/admin",
      });

      navigate("/admin/dashboard");
    }
  };

  return (
    <div>
      <div>accessToken:: {accessToken}</div>

      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}
