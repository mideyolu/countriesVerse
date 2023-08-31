import React, { useEffect, useRef, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
const DarkMode = () => {
  const prefersDrak = window.matchMedia(
    "(prefers-color-scheme : dark)"
  ).matches;
  const bodyRef = useRef(document.body);

  const initialMode = localStorage.getItem("colorMode")
    ? localStorage.getItem("colorMode") === "dark"
    : prefersDrak;

  const [isDark, setIsDark] = useState(initialMode);

  const Handletoggle = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem("colorMode", newMode ? "dark" : "light");
  };

  useEffect(() => {
    if (isDark) {
      bodyRef.current.classList.add("dark");
      bodyRef.current.classList.remove("light");
    } else {
      bodyRef.current.classList.add("light");
      bodyRef.current.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <>
      <button className={`toggle-btn ${isDark ? "dark" : "light"}`} onClick={Handletoggle}>
        {isDark ? <FaSun className="svg-1" size={23} /> : <FaMoon className="svg-2"  size={23}/>}
      </button>
    </>
  );
};

export default DarkMode;
