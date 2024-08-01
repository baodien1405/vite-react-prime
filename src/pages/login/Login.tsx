import { Button } from "primereact/button";
// import Cookies from "universal-cookie";
import { useForm } from "react-hook-form";

import { InputTextField, PasswordField } from "@/components";
import { authAPI } from "@/api";
import { useNavigate } from "react-router-dom";

// const cookies = new Cookies();

interface LoginPayload {
  email: string;
  password: string;
}

export default function Login() {
  // const accessToken = cookies.get("accessToken");
  const navigate = useNavigate();
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<LoginPayload>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (payload: LoginPayload) => {
    const response = await authAPI.login(payload);

    if (response.data.accessToken) {
      // cookies.set("accessToken", response.data.accessToken, {
      //   path: "/admin",
      // });

      document.cookie = `accessToken=${response.data.accessToken}; path=/admin`;

      navigate("/admin/dashboard");
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleLogin)}
      className="w-[500px] p-20"
    >
      {/* <div>accessToken:: {accessToken}</div> */}
      <InputTextField
        name="email"
        control={control}
        label="Email"
        placeholder="Email"
        rootClassName="mb-2"
      />
      <PasswordField
        name="password"
        control={control}
        label="Password"
        placeholder="Enter password"
        rootClassName="mb-2"
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        label="Submit"
        className="w-full"
      />
    </form>
  );
}
