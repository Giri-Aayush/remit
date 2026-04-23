"use client";

import { useEffect, useRef, useState } from "react";

function Tile({ k, v, sub, tone }: { k: string; v: string; sub: string; tone: string }) {
  const toneColor: Record<string, string> = {
    up: "#7cf7d3",
    down: "#ff9ad5",
    warn: "#f5c76a",
    info: "#6ab7f5",
    neutral: "#a0a0b0",
  };
  return (
    <div
      style={{
        padding: 16,
        background: "#13131a",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        transition: "border-color 0.3s, transform 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(176,157,255,0.3)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.transform = "none";
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: "#6b6b7c",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          fontFamily: "var(--font-geist-mono), monospace",
          marginBottom: 8,
        }}
      >
        {k}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: "-0.02em",
          fontVariantNumeric: "tabular-nums",
          marginBottom: 4,
        }}
      >
        {v}
      </div>
      <div
        style={{
          fontSize: 11,
          color: toneColor[tone],
          fontFamily: "var(--font-geist-mono), monospace",
        }}
      >
        {sub}
      </div>
    </div>
  );
}

function DashboardContent() {
  const [selected, setSelected] = useState(0);
  const period = "FY 26-27";
  const clients = [
    { name: "Nethermind", country: "GB", billed: 4234, outstanding: 0, count: 4, color: "var(--accent)" },
    { name: "Digichain", country: "AE", billed: 3708, outstanding: 3708, count: 2, color: "var(--accent-2)" },
    { name: "Starknet F.", country: "CH", billed: 2190, outstanding: 0, count: 3, color: "var(--accent-3)" },
    { name: "Wavebreak", country: "US", billed: 8900, outstanding: 4450, count: 6, color: "#f5c76a" },
  ];

  const topTiles = [
    { k: "YTD billed", v: "USD 19,032", sub: "+18% vs last FY", tone: "up" },
    { k: "In bank", v: "INR 12,48,210", sub: "after FX losses", tone: "neutral" },
    { k: "In transit", v: "USD 4,450", sub: "2 invoices pending", tone: "info" },
    { k: "FIRC pending", v: "3", sub: "oldest: 12 days", tone: "warn" },
  ];
  const fxTiles = [
    { k: "YTD FX loss", v: "₹18,420", sub: "~2.3% of total", tone: "down" },
    { k: "Avg bank spread", v: "2.14%", sub: "Canara + Wise mix", tone: "neutral" },
    { k: "Intermediary fees", v: "₹9,180", sub: "12 transactions", tone: "down" },
    { k: "Mid-market shortfall", v: "₹27,600", sub: "vs interbank rates", tone: "down" },
  ];
  const recent = [
    { n: "INN0019", c: "Nethermind", a: "$4,234", s: "credited", sc: "var(--accent)", stage: 5 },
    { n: "DCI0008", c: "Digichain", a: "$3,708", s: "transit", sc: "#6ab7f5", stage: 4 },
    { n: "STK0012", c: "Starknet", a: "$2,190", s: "sent", sc: "#f5c76a", stage: 2 },
    { n: "WBR0034", c: "Wavebreak", a: "$4,450", s: "approved", sc: "#a0a0b0", stage: 3 },
  ];

  return (
    <div style={{ padding: 28, background: "#0a0a10", color: "#ededf2" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              fontFamily: "var(--font-geist-mono), monospace",
              color: "#6b6b7c",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 8,
            }}
          >
            Dashboard
          </div>
          <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>
            Good evening, Aayush.
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div
            style={{
              padding: "7px 12px",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              fontSize: 12,
              fontFamily: "var(--font-geist-mono), monospace",
              color: "#a0a0b0",
            }}
          >
            {period} ▾
          </div>
          <button
            style={{
              padding: "8px 14px",
              background: "#b09dff",
              color: "#0a0a10",
              border: "none",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            + New invoice
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 10 }}>
        {topTiles.map((t, i) => (
          <Tile key={i} {...t} />
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
        {fxTiles.map((t, i) => (
          <Tile key={i} {...t} />
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr", gap: 14 }}>
        <div>
          <div
            style={{
              fontSize: 12,
              color: "#a0a0b0",
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            By client
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
            {clients.map((c, i) => (
              <div
                key={c.name}
                onMouseEnter={() => setSelected(i)}
                style={{
                  padding: 14,
                  background: selected === i ? "rgba(176,157,255,0.06)" : "#13131a",
                  border: `1px solid ${selected === i ? c.color : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(.2,.8,.2,1)",
                  transform: selected === i ? "translateY(-2px)" : "none",
                }}
                data-hover
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 6,
                        background: c.color,
                        color: "#0a0a10",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      {c.name[0]}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{c.name}</div>
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontFamily: "var(--font-geist-mono), monospace",
                      color: "#6b6b7c",
                      textTransform: "uppercase",
                    }}
                  >
                    {c.country}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    color: "#a0a0b0",
                    fontFamily: "var(--font-geist-mono), monospace",
                  }}
                >
                  <span>USD {c.billed.toLocaleString()}</span>
                  <span style={{ color: c.outstanding > 0 ? "#f5c76a" : "#7cf7d3" }}>
                    {c.outstanding > 0 ? `$${c.outstanding.toLocaleString()} open` : "✓ paid"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 12,
              color: "#a0a0b0",
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            Recent invoices
          </div>
          <div
            style={{
              background: "#13131a",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              padding: 4,
            }}
          >
            {recent.map((r, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  borderRadius: 8,
                  transition: "background 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                data-hover
              >
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 11,
                    color: "#a0a0b0",
                    width: 64,
                  }}
                >
                  {r.n}
                </div>
                <div style={{ fontSize: 12, flex: 1, color: "#ededf2" }}>{r.c}</div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 12,
                    color: "#ededf2",
                  }}
                >
                  {r.a}
                </div>
                <div style={{ display: "flex", gap: 2 }}>
                  {Array.from({ length: 7 }).map((_, j) => (
                    <div
                      key={j}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 2,
                        background: j < r.stage ? r.sc : "rgba(255,255,255,0.1)",
                        boxShadow: j === r.stage - 1 ? `0 0 8px ${r.sc}` : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardDemo() {
  const frameRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const rx = ((e.clientY - cy) / r.height) * -4;
      const ry = ((e.clientX - cx) / r.width) * 4;
      el.style.transform = `perspective(1600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(1600px) rotateX(0) rotateY(0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="demo-wrap" id="demo">
      <div className="container" style={{ textAlign: "center", marginBottom: 48 }}>
        <div className="reveal stagger">
          <div className="eyebrow" style={{ marginTop: 40 }}>
            <span className="dot" /> The dashboard
          </div>
          <h2 style={{ marginTop: 22 }}>
            Your numbers, <span className="serif">front and centered.</span>
          </h2>
          <p
            style={{
              color: "var(--text-2)",
              fontSize: 17,
              marginTop: 18,
              maxWidth: 560,
              margin: "18px auto 0",
            }}
          >
            Billed, credited, in transit, FIRC pending — the four numbers that matter, on every page.
          </p>
        </div>
      </div>

      <div className="demo-frame" ref={frameRef}>
        <div className="demo-chrome">
          <div className="demo-dots">
            <span />
            <span />
            <span />
          </div>
          <div className="demo-url">remit.app / dashboard / fy-2026-27</div>
          <div style={{ width: 48 }} />
        </div>
        <DashboardContent />
      </div>
    </section>
  );
}
