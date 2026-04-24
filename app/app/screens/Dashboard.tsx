"use client";

import { useState } from "react";
import { REMIT } from "../data";
import { Avatar, CountryFlag, Kbd, PipelineBar, Tile, type NavFn } from "../shared";

export default function Dashboard({
  nav,
  onOpenClient,
  onOpenInvoice,
}: {
  nav: NavFn;
  onOpenClient: (id: string) => void;
  onOpenInvoice: (id: string) => void;
}) {
  const [hoverClient, setHoverClient] = useState<string | null>(null);
  const [period] = useState("FY 2026-27");

  const clientAgg = REMIT.clients.map((c) => {
    const invs = REMIT.invoices.filter((i) => i.client === c.id);
    const billed = invs.reduce((s, i) => s + i.total, 0);
    const outstanding = invs
      .filter((i) => !["credited", "done"].includes(i.status))
      .reduce((s, i) => s + i.total, 0);
    return { ...c, billed, outstanding, count: invs.length };
  });

  return (
    <div className="screen">
      <div className="screen-hdr">
        <div>
          <div className="screen-crumb">Dashboard</div>
          <h1 className="screen-title">Good evening, Aayush.</h1>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button className="picker">{period} ▾</button>
          <button className="btn btn-accent" onClick={() => nav("create")}>
            + New invoice <Kbd k="⌘N" />
          </button>
        </div>
      </div>

      <div className="tiles-row">
        <Tile label="YTD billed" value="USD 19,032" sub="+18% vs last FY" tone="up" />
        <Tile label="In bank" value="INR 12,48,210" sub="after FX losses" tone="neutral" />
        <Tile label="In transit" value="USD 4,450" sub="2 invoices pending" tone="info" />
        <Tile label="FIRC pending" value="3" sub="oldest: 12 days" tone="warn" />
      </div>
      <div className="tiles-row">
        <Tile label="YTD FX loss" value="₹18,420" sub="~2.3% of total" tone="down" />
        <Tile label="Avg bank spread" value="2.14%" sub="Canara + Wise mix" tone="neutral" />
        <Tile label="Intermediary fees" value="₹9,180" sub="12 transactions" tone="down" />
        <Tile label="Mid-market shortfall" value="₹27,600" sub="vs interbank rates" tone="down" />
      </div>

      <div className="split-2-1">
        <div className="card">
          <div className="card-hdr">
            <span className="card-title">By client</span>
            <button className="link-btn" onClick={() => nav("clients")}>
              View all →
            </button>
          </div>
          <div className="clients-grid">
            {clientAgg.map((c) => (
              <div
                key={c.id}
                className="client-card"
                onClick={() => onOpenClient(c.id)}
                onMouseEnter={() => setHoverClient(c.id)}
                onMouseLeave={() => setHoverClient(null)}
                style={{ borderColor: hoverClient === c.id ? c.color : "var(--border)" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <Avatar initials={c.initials} color={c.color} size={26} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{c.display_name}</div>
                    <div className="country-badge">
                      <CountryFlag code={c.country} /> {c.country} · {c.count} invoices
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div className="micro-label">Billed</div>
                    <div className="micro-value mono">USD {c.billed.toLocaleString()}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="micro-label">Outstanding</div>
                    <div
                      className="micro-value mono"
                      style={{ color: c.outstanding > 0 ? "#f5c76a" : "var(--accent-2)" }}
                    >
                      {c.outstanding > 0 ? `$${c.outstanding.toLocaleString()}` : "✓ clear"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div
              className="client-card placeholder"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-3)",
                fontSize: 13,
                minHeight: 90,
              }}
            >
              + Add client
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-hdr">
            <span className="card-title">Recent</span>
            <button className="link-btn" onClick={() => nav("invoices")}>
              All invoices →
            </button>
          </div>
          <div className="inv-list">
            {REMIT.invoices.slice(0, 6).map((inv) => {
              const c = REMIT.clients.find((x) => x.id === inv.client)!;
              return (
                <div key={inv.id} className="inv-row" onClick={() => onOpenInvoice(inv.id)}>
                  <div className="inv-num mono">{inv.num}</div>
                  <Avatar initials={c.initials} color={c.color} size={18} />
                  <div className="inv-client">{c.display_name}</div>
                  <div className="inv-amt mono">${inv.total.toLocaleString()}</div>
                  <PipelineBar stage={inv.stage} status={inv.status} compact />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
