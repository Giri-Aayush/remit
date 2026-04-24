"use client";

import { REMIT } from "./data";
import { Avatar, Kbd, type NavFn } from "./shared";

export default function Sidebar({
  route,
  nav,
  openPalette,
}: {
  route: string;
  nav: NavFn;
  openPalette: () => void;
}) {
  const items: {
    id: string;
    label: string;
    kbd?: string;
    icon: string;
    count?: number;
  }[] = [
    { id: "dashboard", label: "Dashboard", kbd: "G D", icon: "◉" },
    {
      id: "invoices",
      label: "Invoices",
      kbd: "G I",
      icon: "☰",
      count: REMIT.invoices.filter((i) => i.status !== "done").length,
    },
    { id: "clients", label: "Clients", kbd: "G C", icon: "◆", count: REMIT.clients.length },
    { id: "import", label: "Import", icon: "↓" },
    { id: "settings", label: "Settings", kbd: "G S", icon: "⚙" },
  ];
  return (
    <aside className="sidebar">
      <div className="side-brand">
        <span className="logo-mark" />
        <span style={{ fontWeight: 600 }}>Remit</span>
        <span
          className="mono"
          style={{ fontSize: 10, color: "var(--text-3)", marginLeft: "auto" }}
        >
          v1.0
        </span>
      </div>

      <button className="side-search" onClick={openPalette}>
        <span style={{ opacity: 0.4 }}>⌕</span>
        <span style={{ flex: 1, textAlign: "left", color: "var(--text-3)" }}>
          Search & jump…
        </span>
        <Kbd k="⌘K" />
      </button>

      <nav className="side-nav">
        {items.map((it) => (
          <button
            key={it.id}
            className={`side-item ${route === it.id ? "active" : ""}`}
            onClick={() => nav(it.id)}
          >
            <span className="side-icon">{it.icon}</span>
            <span style={{ flex: 1, textAlign: "left" }}>{it.label}</span>
            {it.count != null && <span className="side-count">{it.count}</span>}
            {it.kbd && <span className="side-kbd">{it.kbd}</span>}
          </button>
        ))}
      </nav>

      <div className="side-sep">Quick actions</div>
      <button className="side-item" onClick={() => nav("create")}>
        <span className="side-icon" style={{ color: "var(--accent)" }}>
          +
        </span>
        <span style={{ flex: 1, textAlign: "left" }}>New invoice</span>
        <Kbd k="⌘N" />
      </button>

      <div className="side-foot">
        <div className="side-user">
          <Avatar initials="AJ" color="var(--accent)" size={26} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Aayush Jindal
            </div>
            <div
              style={{ fontSize: 10, color: "var(--text-3)", fontFamily: "var(--mono)" }}
            >
              Jino Labs · OPC
            </div>
          </div>
          <span style={{ fontSize: 14, color: "var(--text-3)" }}>⋯</span>
        </div>
      </div>
    </aside>
  );
}
