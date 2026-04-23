"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function TweaksPanel() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="tweaks-panel">
      <h4>Tweaks</h4>
      <div>
        <div style={{ fontSize: 12, color: "var(--text-2)", marginBottom: 8 }}>Theme</div>
        <div className="theme-toggle">
          <button
            className={theme === "dark" ? "active" : ""}
            onClick={() => setTheme("dark")}
          >
            Dark
          </button>
          <button
            className={theme === "light" ? "active" : ""}
            onClick={() => setTheme("light")}
          >
            Light
          </button>
        </div>
      </div>
    </div>
  );
}
