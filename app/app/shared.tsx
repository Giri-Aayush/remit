"use client";

import { useCallback, useState, type ReactNode } from "react";
import { stageColors, stageLabels, type StageKey } from "./data";

export function Kbd({ k }: { k: string }) {
  return <span className="kbd">{k}</span>;
}

export function Avatar({
  initials,
  color,
  size = 24,
}: {
  initials: string;
  color?: string;
  size?: number;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.28),
        background: color || "var(--accent)",
        color: "#0a0a10",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: Math.round(size * 0.42),
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

export function StatusBadge({ status }: { status: StageKey }) {
  const color = stageColors[status] || "var(--text-3)";
  return (
    <span className="status-badge">
      <span className="sb-dot" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
      {stageLabels[status] || status}
    </span>
  );
}

export function PipelineBar({
  stage,
  status,
  compact = false,
}: {
  stage: number;
  status: StageKey;
  compact?: boolean;
}) {
  const total = 7;
  const sz = compact ? 7 : 10;
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: total }).map((_, i) => {
        const done = i < stage;
        const active = i === stage;
        const color = active ? stageColors[status] : done ? "var(--accent)" : "rgba(255,255,255,0.1)";
        return (
          <div
            key={i}
            style={{
              width: sz,
              height: sz,
              borderRadius: 2,
              background: color,
              boxShadow: active ? `0 0 8px ${color}` : "none",
              transition: "all 0.3s",
            }}
          />
        );
      })}
    </div>
  );
}

export function PipelineFull({ stage, status }: { stage: number; status: StageKey }) {
  const labels = ["Draft", "Sent", "Approved", "In transit", "Credited", "FIRC", "Done"];
  return (
    <div style={{ padding: "18px 18px 28px", position: "relative" }}>
      <div
        style={{
          position: "relative",
          height: 4,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 2,
          margin: "16px 8px 8px",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${(stage / 6) * 100}%`,
            background: `linear-gradient(90deg, var(--accent), ${stageColors[status] || "var(--accent-2)"})`,
            borderRadius: 2,
            transition: "width 0.6s cubic-bezier(.2,.8,.2,1)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "space-between" }}>
          {labels.map((l, i) => {
            const done = i < stage;
            const active = i === stage;
            const color = active ? stageColors[status] : done ? "var(--accent)" : "var(--surface)";
            return (
              <div
                key={i}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: color,
                  border: "2px solid",
                  borderColor: done || active ? color : "var(--border-strong)",
                  transform: "translateY(-5px)",
                  boxShadow: active ? `0 0 12px ${color}` : "none",
                  transition: "all 0.3s",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: 10,
                    fontFamily: "var(--mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: done || active ? "var(--text)" : "var(--text-3)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {l}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const FLAGS: Record<string, string> = {
  IN: "🇮🇳",
  US: "🇺🇸",
  GB: "🇬🇧",
  DE: "🇩🇪",
  AE: "🇦🇪",
  CH: "🇨🇭",
  SG: "🇸🇬",
};
export function CountryFlag({ code }: { code: string }) {
  return <span style={{ fontSize: 13 }}>{FLAGS[code] || "🌐"}</span>;
}

export function Tile({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  tone?: "up" | "down" | "warn" | "info" | "neutral";
}) {
  const colorMap = {
    up: "var(--accent-2)",
    down: "var(--accent-3)",
    warn: "#f5c76a",
    info: "#6ab7f5",
    neutral: "var(--text-3)",
  };
  const color = colorMap[tone || "neutral"];
  return (
    <div className="tile">
      <div className="tile-label">{label}</div>
      <div className="tile-value">{value}</div>
      <div className="tile-sub" style={{ color }}>
        {sub}
      </div>
    </div>
  );
}

export type Toast = {
  id: string;
  msg: string;
  icon?: string;
  action?: { label: string; onClick: () => void };
};

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback(
    (msg: string, opts: { icon?: string; action?: Toast["action"] } = {}) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((t) => [...t, { id, msg, ...opts }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
    },
    []
  );
  const ToastHost = () => (
    <div className="remit-app-toast-host">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          <span style={{ color: "var(--accent-2)" }}>{t.icon || "●"}</span>
          <span>{t.msg}</span>
          {t.action && (
            <button className="toast-action" onClick={t.action.onClick}>
              {t.action.label}
            </button>
          )}
        </div>
      ))}
    </div>
  );
  return { push, ToastHost };
}

export type NavFn = (route: string, params?: Record<string, unknown>) => void;
export type RouteParams = { id?: string; clientId?: string } & Record<string, unknown>;

export function formatWithFlags(node: ReactNode) {
  return node;
}
