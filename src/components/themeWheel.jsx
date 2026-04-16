import React, { useState, useEffect } from "react";

export const ThemeWheel = () => {
  const [open, setOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("dark")

  const setTheme = (theme) => {
    document.body.classList.remove("light", "matcha");
    if (theme !== "dark") {
      document.body.classList.add(theme);
    }
    localStorage.setItem("theme", theme);
    setActiveTheme(theme);
    setOpen(false);
  };
  

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved && saved !== "dark") {
      document.body.classList.add(saved);
    }
  }, []);


  return (
    <div className="themeWheelContainer">

      {open && (
        <div className="themeOptions">
          <button
            className={`themeButton ${activeTheme === "dark" ? "active" : ""}`}
            onClick={() => setTheme("dark")}
          >Default</button>
          <button
            className={`themeButton ${activeTheme === "light" ? "active" : ""}`}
            onClick={() => setTheme("light")}
          >Light</button>
          <button
            className={`themeButton ${activeTheme === "matcha" ? "active" : ""}`}
            onClick={() => setTheme("matcha")}
          >Matcha</button>
        </div>
      )}

      <button
        className="themeMainButton"
        onClick={() => setOpen(!open)}
      >
        🎨
      </button>

    </div>
  );
};