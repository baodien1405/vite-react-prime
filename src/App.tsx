import { NavLink, Route, Routes } from "react-router-dom";

import { GeneralForm } from "@/components";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import { Header } from "@/components/header";

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route index element={<GeneralForm />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
