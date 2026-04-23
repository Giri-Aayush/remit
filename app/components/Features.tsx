"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function FeatureCard({
  label,
  title,
  desc,
  children,
  i,
}: {
  label: string;
  title: ReactNode;
  desc: string;
  children: ReactNode;
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const ratio = Math.max(0, Math.min(1, (vh - r.bottom) / (vh * 0.4)));
      const scale = 1 - ratio * 0.05;
      const opacity = 1 - ratio * 0.3;
      el.style.transform = `scale(${scale})`;
      el.style.opacity = `${opacity}`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const stickyTop = 120 + i * 24;
  return (
    <div
      ref={ref}
      className="feature-card"
      style={{ position: "sticky", top: stickyTop, zIndex: 10 + i }}
    >
      <div>
        <div className="fc-label">
          0{i + 1} · {label}
        </div>
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
      <div className="fc-visual">{children}</div>
    </div>
  );
}

function PipelineVisual() {
  const stages = ["draft", "sent", "approved", "transit", "credited", "firc", "done"];
  const [active, setActive] = useState(3);
  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % stages.length);
    }, 1200);
    return () => clearInterval(id);
  }, [stages.length]);
  const pct = (active / (stages.length - 1)) * 100;
  return (
    <div className="pipeline">
      <div style={{ width: "100%" }}>
        <div
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 12,
            color: "var(--text-3)",
            textAlign: "center",
            marginBottom: 60,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          Invoice <span style={{ color: "var(--accent)" }}>INN0019</span> ·{" "}
          <span style={{ color: "var(--text)" }}>Nethermind</span>
        </div>
        <div className="pipe-track">
          <div
            className="pipe-fill"
            style={{ width: `${pct}%`, transition: "width 0.8s cubic-bezier(.2,.8,.2,1)" }}
          />
          <div className="pipe-stages">
            {stages.map((s, i) => (
              <div
                key={s}
                className={`pipe-stage ${i < active ? "done" : ""} ${i === active ? "active" : ""}`}
              >
                <div className="stage-label">{s}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            marginTop: 90,
            textAlign: "center",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
          }}
        >
          <span style={{ color: "var(--text-3)" }}>Current stage → </span>
          <span style={{ color: "var(--accent-2)", textTransform: "uppercase" }}>
            {stages[active]}
          </span>
        </div>
      </div>
    </div>
  );
}

function FXVisual() {
  const values = { received: 4205, credited: 349850 };
  const mid = 83.45;
  const bankRate = values.credited / values.received;
  const fxLoss = Math.round(values.received * mid - values.credited);
  const totalLoss = fxLoss + Math.round((4234 - values.received) * mid);
  const spread = (((mid - bankRate) / mid) * 100).toFixed(2);
  return (
    <div className="fx-visual">
      <div
        style={{
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "var(--text-3)",
          marginBottom: 14,
        }}
      >
        FX record · INN0019
      </div>
      <div className="fx-row">
        <span>Invoiced</span>
        <span className="fx-num">USD 4,234.00</span>
      </div>
      <div className="fx-row">
        <span>Received (after SWIFT)</span>
        <span className="fx-num">USD 4,205.00</span>
      </div>
      <div className="fx-row">
        <span>Mid-market rate</span>
        <span className="fx-num">₹{mid.toFixed(2)}</span>
      </div>
      <div className="fx-row">
        <span>Bank rate</span>
        <span className="fx-num">₹{bankRate.toFixed(2)}</span>
      </div>
      <div className="fx-row">
        <span>Bank spread</span>
        <span className="fx-num" style={{ color: "var(--accent-3)" }}>
          {spread}%
        </span>
      </div>
      <div className="fx-row loss">
        <span>FX loss</span>
        <span className="fx-num">−₹{fxLoss.toLocaleString("en-IN")}</span>
      </div>
      <div className="fx-row loss">
        <span>Intermediary fee</span>
        <span className="fx-num">−₹2,420</span>
      </div>
      <div
        className="fx-row highlight"
        style={{ borderBottom: "none", paddingTop: 18, fontSize: 14 }}
      >
        <span style={{ fontWeight: 500 }}>Total loss</span>
        <span className="fx-num" style={{ color: "var(--accent-3)", fontWeight: 500 }}>
          −₹{totalLoss.toLocaleString("en-IN")}
        </span>
      </div>
      <div
        style={{
          marginTop: 16,
          padding: 12,
          borderRadius: 10,
          background: "rgba(176,157,255,0.08)",
          border: "1px solid rgba(176,157,255,0.2)",
          fontSize: 12,
          color: "var(--text-2)",
        }}
      >
        <span style={{ color: "var(--accent)" }}>Wise would have saved</span> ≈₹1,980 on this transfer.
      </div>
    </div>
  );
}

function ComplianceVisual() {
  const countries = [
    { flag: "🇮🇳", code: "IN", name: "India Pvt Ltd / OPC", reqs: ["GSTIN", "FIRC/FIRA", "LUT", "SAC 998312"] },
    { flag: "🇺🇸", code: "US", name: "United States", reqs: ["EIN", "1099-MISC"] },
    { flag: "🇬🇧", code: "GB", name: "United Kingdom", reqs: ["VAT", "Co. Number"] },
    { flag: "🇩🇪", code: "DE", name: "Germany / EU", reqs: ["VAT", "Reverse-charge"] },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % countries.length), 1800);
    return () => clearInterval(id);
  }, [countries.length]);
  return (
    <div className="cpl-grid">
      {countries.map((c, i) => (
        <div
          key={c.code}
          className="cpl-card"
          style={{
            borderColor: i === active ? "var(--accent)" : "var(--border)",
            boxShadow: i === active ? "0 0 30px -10px var(--accent)" : "none",
            transition: "all 0.5s cubic-bezier(.2,.8,.2,1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 20 }}>{c.flag}</span>
            <span className="cpl-code">ISO · {c.code}</span>
          </div>
          <div className="cpl-name">{c.name}</div>
          <div className="cpl-reqs">
            {c.reqs.map((r) => (
              <span key={r}>{r}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function KeyboardVisual() {
  const steps = [
    { keys: ["⌘", "N"], label: "Open new invoice" },
    { keys: ["1"], label: "Pick Nethermind" },
    { keys: ["⌘", "D"], label: "Duplicate last invoice" },
    { keys: ["Tab"], label: "Update hours" },
    { keys: ["⌘", "↵"], label: "Save and send" },
  ];
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % steps.length), 1400);
    return () => clearInterval(id);
  }, [steps.length]);
  return (
    <div
      style={{
        padding: 36,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: 8, marginBottom: 36 }}>
        {steps[step].keys.map((k, i) => (
          <div
            key={i}
            style={{
              padding: "14px 22px",
              background: "var(--surface)",
              border: "1px solid var(--border-strong)",
              borderRadius: 10,
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 18,
              fontWeight: 500,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3), inset 0 -2px 0 rgba(0,0,0,0.2)",
              color: "var(--text)",
              animation: "pulse 0.4s ease-out",
            }}
          >
            {k}
          </div>
        ))}
      </div>
      <div
        style={{
          fontSize: 14,
          color: "var(--text-2)",
          fontFamily: "var(--font-geist-mono), monospace",
        }}
      >
        {steps[step].label}
      </div>
      <div style={{ display: "flex", gap: 4, marginTop: 24 }}>
        {steps.map((_, i) => (
          <div
            key={i}
            style={{
              width: 20,
              height: 2,
              borderRadius: 2,
              background: i <= step ? "var(--accent)" : "var(--border)",
              transition: "background 0.4s",
            }}
          />
        ))}
      </div>
      <div
        style={{
          marginTop: 40,
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "var(--text-3)",
        }}
      >
        ~15 seconds, client-to-client
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <div className="features" id="features">
      <div className="container" style={{ marginBottom: 80 }}>
        <div className="reveal stagger">
          <div className="eyebrow">
            <span className="dot" /> The pipeline
          </div>
          <h2 style={{ marginTop: 22, maxWidth: 900 }}>
            Excel tracks amounts.
            <br />
            <span className="serif">Remit tracks the whole journey.</span>
          </h2>
          <p style={{ color: "var(--text-2)", fontSize: 17, marginTop: 18, maxWidth: 540 }}>
            Every cross-border invoice has a long tail. Remit maps each stage — and every
            currency you lose along the way.
          </p>
        </div>
      </div>

      <div className="container">
        <FeatureCard
          i={0}
          label="Pipeline"
          title="Seven stages, not one."
          desc="From draft to done, Remit tracks each transition with a timestamp. The active stage glows. Country-specific extensions like India's FIRC/FIRA drop in automatically."
        >
          <PipelineVisual />
        </FeatureCard>

        <FeatureCard
          i={1}
          label="FX tracking"
          title="Losses you can finally see."
          desc="Enter the bank credit, we compute the rest. Mid-market rate, bank spread, intermediary fees — in the invoice currency and your home currency. Over a year, it's rent."
        >
          <FXVisual />
        </FeatureCard>

        <FeatureCard
          i={2}
          label="Global compliance"
          title="India, UK, EU, US — one workflow."
          desc="Point Remit at any home country. Tax IDs, PDF layouts, and pipeline stages adapt. FIRC for India. VAT reverse-charge for the EU. EIN for the US. Same dashboard, correct fields."
        >
          <ComplianceVisual />
        </FeatureCard>

        <FeatureCard
          i={3}
          label="Keyboard-first"
          title="15 seconds to a signed invoice."
          desc="⌘N, pick client, ⌘D to duplicate last month, tab to update hours, ⌘↵ to send. Your monthly ritual compressed to the bone. Every common action has a keystroke."
        >
          <KeyboardVisual />
        </FeatureCard>
      </div>
    </div>
  );
}
