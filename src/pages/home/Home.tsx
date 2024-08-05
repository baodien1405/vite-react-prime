import Cookies from "universal-cookie";

import { GeneralForm } from "@/components";

const cookies = new Cookies();

export default function Home() {
  const accessToken = cookies.get("accessToken");

  return (
    <div className="p-5">
      <div className="mb-4">accessToken:: {accessToken}</div>
      <GeneralForm />
    </div>
  );
}
