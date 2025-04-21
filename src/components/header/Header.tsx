import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useContext, useState } from "react";
import { PrimeReactContext } from "primereact/api";
import { InputIcon } from "primereact/inputicon";
import { classNames } from "primereact/utils";

const cookies = new Cookies();

export function Header() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("light");
  const { changeTheme } = useContext(PrimeReactContext);

  const handleChangeMode = () => {
    const currentTheme = "lara-light-teal";
    const newTheme = "lara-dark-teal";
    const linkElementId = "theme-link";

    let themeLink = document.getElementById(linkElementId) as HTMLLinkElement;

    if (mode === "light") {
      setMode("dark");
      if (themeLink) {
        themeLink.href = `/themes/${newTheme}/theme.css`;
      }
      // changeTheme?.(currentTheme, newTheme, linkElementId, () => {
      //   console.log(`Theme changed from ${currentTheme} to ${newTheme}`);
      // });
    } else if (mode === "dark") {
      setMode("light");
      // changeTheme?.(newTheme, currentTheme, linkElementId, () => {
      //   console.log(`Theme changed from ${currentTheme} to ${newTheme}`);
      // });
      if (themeLink) {
        themeLink.href = `/themes/${currentTheme}/theme.css`;
      }
    }
  };

  const handleLogout = () => {
    cookies.remove("accessToken");
    navigate("/admin/login");
  };

  return (
    <div className="flex justify-between items-center px-20">
      <div className="flex gap-4 p-2">
        <NavLink
          className={({ isActive }) =>
            classNames("bg-red-200 p-2 rounded-md", {
              "bg-red-600 text-white": isActive,
            })
          }
          to={"/formik"}
        >
          Formik
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            classNames("bg-red-200 p-2 rounded-md", {
              "bg-red-600 text-white": isActive,
            })
          }
          to={"/react-hook-form"}
        >
          React Hook Form
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            classNames("bg-red-200 p-2 rounded-md", {
              "bg-red-600 text-white": isActive,
            })
          }
          to="/tanstack-form"
        >
          Tanstack Form
        </NavLink>
      </div>

      <div
        className="px-2 py-2 flex items-center justify-center rounded-md border hover:cursor-pointer"
        onClick={handleChangeMode}
      >
        {mode === "light" && <InputIcon className="pi pi-sun" />}
        {mode === "dark" && <InputIcon className="pi pi-moon" />}
      </div>
    </div>
  );
}
