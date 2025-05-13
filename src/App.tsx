import { Navigate, Route, Routes } from "react-router-dom";

import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";

import { Header } from "@/components/header";
import { FormikForm, RHFForm, TanstackForm } from "@/pages/home/components";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route index element={<Navigate to="/formik" />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/formik" element={<FormikForm />} />
        <Route path="/react-hook-form" element={<RHFForm />} />
        <Route path="/tanstack-form" element={<TanstackForm />} />
      </Routes>
    </div>
  );
}

export default App;
