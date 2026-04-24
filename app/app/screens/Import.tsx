"use client";

import { useState } from "react";
import type { NavFn } from "../shared";

export default function Import({ nav }: { nav: NavFn }) {
  const [step, setStep] = useState(0);
  const parsed = [
    { num: "INN0016", client: "Nethermind", date: "2025-12-31", amount: 4180, ok: true },
    { num: "INN0017", client: "Nethermind", date: "2026-01-31", amount: 4020, ok: true },
    { num: "INN0018", client: "Nethermind", date: "2026-02-28", amount: 4120, ok: true },
    { num: "DCI0006", client: "Digichain", date: "2026-02-01", amount: 3450, ok: true },
    {
      num: "DCI0007",
      client: "Digichain",
      date: "2026-03-02",
      amount: 3600,
      ok: false,
      warn: "Line item description parse warning",
    },
  ] as const;

  return (
    <div className="screen">
      <div className="screen-hdr">
        <div>
          <div className="screen-crumb">Tools</div>
          <h1 className="screen-title">Import historical invoices</h1>
        </div>
      </div>
      <div className="card">
        <div className="import-steps">
          {["Upload PDFs", "Review", "Confirm import"].map((s, i) => (
            <div
              key={i}
              className={`imp-step ${i === step ? "active" : i < step ? "done" : ""}`}
            >
              <div className="imp-dot">{i < step ? "✓" : i + 1}</div>
              <span>{s}</span>
            </div>
          ))}
        </div>
        {step === 0 && (
          <div style={{ padding: 24 }}>
            <div className="dropzone" onClick={() => setStep(1)}>
              <div style={{ fontSize: 36, color: "var(--text-3)", marginBottom: 10 }}>↓</div>
              <div style={{ fontSize: 15, marginBottom: 6 }}>
                Drop PDFs here, or click to browse
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-3)",
                  fontFamily: "var(--mono)",
                }}
              >
                Parser extracts client, invoice number, dates, line items
              </div>
            </div>
          </div>
        )}
        {step === 1 && (
          <div style={{ padding: 18 }}>
            <div style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 14 }}>
              Parsed {parsed.length} PDFs. Review and correct any warnings before import.
            </div>
            <div className="confirm-grid">
              {parsed.map((p, i) => (
                <div key={i} className="confirm-card">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <span className="mono" style={{ color: "var(--accent)" }}>
                      {p.num}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: p.ok ? "var(--accent-2)" : "#f5c76a",
                      }}
                    >
                      {p.ok ? "✓ ok" : "⚠ check"}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, marginBottom: 4 }}>{p.client}</div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-3)",
                      fontFamily: "var(--mono)",
                      marginBottom: 6,
                    }}
                  >
                    {p.date} · ${p.amount.toLocaleString()}
                  </div>
                  {"warn" in p && p.warn && (
                    <div
                      style={{
                        fontSize: 11,
                        color: "#f5c76a",
                        fontFamily: "var(--mono)",
                      }}
                    >
                      {p.warn}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 20 }}
            >
              <button className="btn btn-ghost" onClick={() => setStep(0)}>
                ← Back
              </button>
              <button className="btn btn-accent" onClick={() => setStep(2)}>
                Confirm & import →
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div style={{ padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 42, color: "var(--accent-2)", marginBottom: 14 }}>✓</div>
            <div style={{ fontSize: 17, marginBottom: 8 }}>{parsed.length} invoices imported</div>
            <div
              style={{
                fontSize: 13,
                color: "var(--text-3)",
                marginBottom: 20,
                fontFamily: "var(--mono)",
              }}
            >
              Next invoice number auto-recalibrated for each client
            </div>
            <button className="btn btn-accent" onClick={() => nav("invoices")}>
              View invoices →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
