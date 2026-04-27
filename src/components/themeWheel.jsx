import React, { useState, useEffect } from "react";

const THEMES = [
  { id: "dark",     label: "Default" },
  { id: "light",    label: "Light" },
  { id: "matcha",   label: "Matcha" },
  { id: "midnight", label: "Midnight" },
  { id: "ocean",    label: "Ocean" },
]

export const ThemeWheel = () => {
  const [open, setOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("dark")

  const setTheme = (theme) => {
    document.body.classList.remove(...THEMES.map(t => t.id))
    if (theme !== "dark") {
      document.body.classList.add(theme)
    }
    localStorage.setItem("theme", theme)
    setActiveTheme(theme)
    setOpen(false)
  }

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark"
    setActiveTheme(saved)
    if (saved !== "dark") {
      document.body.classList.add(saved)
    }
  }, [])

  return (
    <div className="themeWheelContainer">
      {open && (
        <div className="themeOptions">
          {THEMES.map(theme => (
            <button
              key={theme.id}
              className={`themeButton ${activeTheme === theme.id ? "active" : ""}`}
              onClick={() => setTheme(theme.id)}
            >
              {theme.label}
            </button>
          ))}
        </div>
      )}
      <button className="themeMainButton" onClick={() => setOpen(!open)}>
        🎨
      </button>
    </div>
  )
}