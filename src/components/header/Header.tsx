import { NavLink } from "react-router-dom";

import { InputIcon } from "primereact/inputicon";
import { useContext, useState } from "react";

import { PrimeReactContext } from "primereact/api";

export function Header() {
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

  return (
    <div className="flex justify-between items-center px-20">
      <div className="flex gap-4 p-2">
        <NavLink className="bg-red-200 p-2 rounded-md" to={"/"}>
          Home
        </NavLink>

        <NavLink className="bg-red-200 p-2 rounded-md" to={"/admin/login"}>
          Login
        </NavLink>

        <NavLink className="bg-red-200 p-2 rounded-md" to={"/admin/dashboard"}>
          Dashboard
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
