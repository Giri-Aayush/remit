"use client";

import { useEffect, useState, type ReactNode } from "react";
import { REMIT } from "./data";
import { Avatar, Kbd, type NavFn } from "./shared";

type Command = {
  label: string;
  kbd?: string;
  action: () => void;
  group: string;
  icon?: ReactNode;
};

export default function CommandPalette({
  open,
  onClose,
  nav,
  onOpenInvoice,
  onOpenClient,
}: {
  open: boolean;
  onClose: () => void;
  nav: NavFn;
  onOpenInvoice: (id: string) => void;
  onOpenClient: (id: string) => void;
}) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);

  const commands: Command[] = [
    { label: "New invoice", kbd: "⌘N", action: () => nav("create"), group: "Actions" },
    { label: "Go to dashboard", kbd: "G D", action: () => nav("dashboard"), group: "Navigate" },
    { label: "Go to invoices", kbd: "G I", action: () => nav("invoices"), group: "Navigate" },
    { label: "Go to clients", kbd: "G C", action: () => nav("clients"), group: "Navigate" },
    { label: "Go to settings", kbd: "G S", action: () => nav("settings"), group: "Navigate" },
    { label: "Import PDFs", action: () => nav("import"), group: "Actions" },
    ...REMIT.clients.map((c) => ({
      label: `Client: ${c.display_name}`,
      action: () => onOpenClient(c.id),
      group: "Clients",
      icon: <Avatar initials={c.initials} color={c.color} size={16} />,
    })),
    ...REMIT.invoices.slice(0, 6).map((i) => ({
      label: `${i.num} · ${REMIT.clients.find((x) => x.id === i.client)!.display_name}`,
      action: () => onOpenInvoice(i.id),
      group: "Invoices",
    })),
  ];
  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(q.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSel((s) => Math.min(filtered.length - 1, s + 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSel((s) => Math.max(0, s - 1));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        filtered[sel]?.action();
        onClose();
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, sel, filtered, onClose]);

  if (!open) return null;
  return (
    <div className="remit-app-modal-backdrop" onClick={onClose}>
      <div className="remit-app-palette" onClick={(e) => e.stopPropagation()}>
        <input
          autoFocus
          placeholder="Jump to, search, or run a command…"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setSel(0);
          }}
          className="palette-input"
        />
        <div className="palette-list">
          {filtered.slice(0, 12).map((c, i) => (
            <div
              key={i}
              className={`palette-item ${i === sel ? "sel" : ""}`}
              onClick={() => {
                c.action();
                onClose();
              }}
              onMouseEnter={() => setSel(i)}
            >
              {c.icon || <span className="palette-icon">⌘</span>}
              <span style={{ flex: 1 }}>{c.label}</span>
              {c.kbd && (
                <span className="kbd-group">
                  <Kbd k={c.kbd} />
                </span>
              )}
              <span
                style={{
                  fontSize: 10,
                  color: "var(--text-3)",
                  fontFamily: "var(--mono)",
                  textTransform: "uppercase",
                }}
              >
                {c.group}
              </span>
            </div>
          ))}
          {!filtered.length && (
            <div
              style={{
                padding: 20,
                color: "var(--text-3)",
                fontSize: 13,
                textAlign: "center",
              }}
            >
              No matches
            </div>
          )}
        </div>
        <div className="palette-foot">
          <span>
            <Kbd k="↑↓" /> navigate
          </span>
          <span>
            <Kbd k="↵" /> select
          </span>
          <span>
            <Kbd k="Esc" /> close
          </span>
        </div>
      </div>
    </div>
  );
}
