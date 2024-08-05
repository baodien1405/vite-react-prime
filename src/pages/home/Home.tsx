import Cookies from "universal-cookie";

import { GeneralForm } from "@/pages/home/components";

const cookies = new Cookies();

export default function Home() {
  const accessToken = cookies.get("accessToken");

  const handleGeneralSubmit = (payload: any) => {
    console.log("🚀 ~ handleGeneralSubmit ~ payload:", payload);
  };

  return (
    <div className="p-5">
      <div className="mb-4">accessToken:: {accessToken}</div>
      <GeneralForm onSubmit={handleGeneralSubmit} />
    </div>
  );
}
