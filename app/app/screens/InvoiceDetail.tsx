"use client";

import { REMIT, stageColors, stageLabels } from "../data";
import { PipelineFull, StatusBadge, type NavFn } from "../shared";

export default function InvoiceDetail({
  invoiceId,
  nav,
  advanceStage,
  openFxModal,
}: {
  invoiceId: string;
  nav: NavFn;
  advanceStage: (id: string) => void;
  openFxModal: (id: string) => void;
}) {
  const inv = REMIT.invoices.find((i) => i.id === invoiceId);
  if (!inv) return <div className="screen">Invoice not found.</div>;
  const c = REMIT.clients.find((x) => x.id === inv.client)!;

  const nextActionLabel = () => {
    switch (inv.status) {
      case "draft":
        return "Mark as sent";
      case "sent":
        return "Mark as approved";
      case "approved":
        return "Mark as in transit";
      case "transit":
        return "Record credit";
      case "credited":
        return c.country === "IN" ? "Mark FIRC requested" : "Close out";
      case "firc_requested":
        return "Upload FIRC & close";
      default:
        return null;
    }
  };
  const nextLabel = nextActionLabel();

  const doAdvance = () => {
    if (inv.status === "transit") {
      openFxModal(inv.id);
      return;
    }
    advanceStage(inv.id);
  };

  return (
    <div className="screen">
      <div className="screen-hdr">
        <div>
          <div className="screen-crumb">
            <button
              className="link-btn"
              onClick={() => nav("invoices")}
              style={{ padding: 0 }}
            >
              ← Invoices
            </button>
          </div>
          <h1 className="screen-title">
            <span
              className="mono"
              style={{ color: "var(--text-2)", fontWeight: 400, marginRight: 10 }}
            >
              {inv.num}
            </span>
            {c.display_name}
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <StatusBadge status={inv.status} />
          <button className="btn btn-ghost">Download PDF ↓</button>
          <button className="btn btn-ghost">⋯</button>
        </div>
      </div>

      <div className="card">
        <div
          style={{
            padding: "14px 18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="card-title">Pipeline</div>
          {nextLabel && inv.status !== "done" && (
            <button className="btn btn-accent" onClick={doAdvance}>
              {nextLabel} →
            </button>
          )}
        </div>
        <PipelineFull stage={inv.stage} status={inv.status} />
      </div>

      <div className="split-2-1">
        <div className="card">
          <div className="card-hdr">
            <span className="card-title">Line items</span>
            <span className="badge-muted">
              {inv.lines.length} line{inv.lines.length === 1 ? "" : "s"}
            </span>
          </div>
          <div className="meta-grid">
            <div>
              <div className="micro-label">Issue date</div>
              <div className="micro-value mono">{inv.issue}</div>
            </div>
            <div>
              <div className="micro-label">Sale period</div>
              <div className="micro-value mono">{inv.period}</div>
            </div>
            <div>
              <div className="micro-label">Due</div>
              <div className="micro-value mono">+{c.terms}d</div>
            </div>
            <div>
              <div className="micro-label">Currency</div>
              <div className="micro-value mono">{inv.currency}</div>
            </div>
            <div>
              <div className="micro-label">SWIFT</div>
              <div className="micro-value mono" style={{ fontSize: 11 }}>
                {c.swift_model === "client_bears" ? "OUR" : "BEN"}
              </div>
            </div>
            <div>
              <div className="micro-label">Template</div>
              <div className="micro-value mono" style={{ fontSize: 11 }}>
                {c.template}
              </div>
            </div>
          </div>
          <div className="li-hdr">
            <div style={{ width: 24 }}>#</div>
            <div style={{ width: 120 }}>Code</div>
            <div style={{ flex: 1 }}>Description</div>
            <div style={{ width: 60 }}>SAC</div>
            <div style={{ width: 50, textAlign: "right" }}>Hrs</div>
            <div style={{ width: 50, textAlign: "right" }}>Rate</div>
            <div style={{ width: 80, textAlign: "right" }}>Amount</div>
          </div>
          {inv.lines.map((l, i) => (
            <div key={i} className={`li-row ${l.adj ? "adj" : ""}`}>
              <div style={{ width: 24, color: "var(--text-3)" }}>{i + 1}</div>
              <div
                style={{
                  width: 120,
                  fontFamily: "var(--mono)",
                  fontSize: 11.5,
                  color: l.code ? "var(--accent)" : "var(--text-3)",
                }}
              >
                {l.code || "—"}
              </div>
              <div style={{ flex: 1, whiteSpace: "pre-wrap", fontSize: 12.5 }}>{l.desc}</div>
              <div style={{ width: 60, fontFamily: "var(--mono)", fontSize: 11 }}>{l.sac}</div>
              <div style={{ width: 50, textAlign: "right", fontFamily: "var(--mono)" }}>
                {l.hours || "—"}
              </div>
              <div style={{ width: 50, textAlign: "right", fontFamily: "var(--mono)" }}>
                {l.rate ? `$${l.rate}` : "—"}
              </div>
              <div style={{ width: 80, textAlign: "right", fontFamily: "var(--mono)" }}>
                ${l.amount.toLocaleString()}
              </div>
            </div>
          ))}
          <div className="totals">
            <div>
              <span>Subtotal</span>
              <span className="mono">${inv.subtotal.toLocaleString()}</span>
            </div>
            <div>
              <span>CGST 0%</span>
              <span className="mono" style={{ color: "var(--text-3)" }}>
                —
              </span>
            </div>
            <div>
              <span>SGST 0%</span>
              <span className="mono" style={{ color: "var(--text-3)" }}>
                —
              </span>
            </div>
            {c.template === "detailed" && (
              <div>
                <span>R/OFF</span>
                <span className="mono">−0.30</span>
              </div>
            )}
            <div className="total">
              <span>Total</span>
              <span className="mono">USD {inv.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="col-gap">
          <div className="card">
            <div className="card-hdr">
              <span className="card-title">FX tracking</span>
              {inv.fx ? (
                <span className="badge-ok">Captured</span>
              ) : (
                <span className="badge-muted">Pending credit</span>
              )}
            </div>
            {inv.fx ? (
              <div className="fx-readout">
                <div className="fx-l">
                  <span>Invoiced</span>
                  <span className="mono">USD {inv.total.toLocaleString()}</span>
                </div>
                <div className="fx-l">
                  <span>Received</span>
                  <span className="mono">USD {inv.fx.received.toLocaleString()}</span>
                </div>
                <div className="fx-l muted">
                  <span>Intermediary fee</span>
                  <span className="mono">${inv.fx.intermediaryFee}</span>
                </div>
                <div className="fx-l">
                  <span>Mid-market rate</span>
                  <span className="mono">₹{inv.fx.mid}</span>
                </div>
                <div className="fx-l">
                  <span>Bank rate</span>
                  <span className="mono">₹{inv.fx.rate}</span>
                </div>
                <div className="fx-l">
                  <span>Bank spread</span>
                  <span className="mono" style={{ color: "var(--accent-3)" }}>
                    {inv.fx.spread}%
                  </span>
                </div>
                <div className="fx-l total">
                  <span>Total loss</span>
                  <span className="mono" style={{ color: "var(--accent-3)" }}>
                    −₹{inv.fx.loss.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ) : (
              <div style={{ padding: 16, fontSize: 12.5, color: "var(--text-3)" }}>
                FX data will be captured when this invoice is marked as credited.
              </div>
            )}
          </div>
          <div className="card">
            <div className="card-hdr">
              <span className="card-title">Documents</span>
            </div>
            <div className="docs">
              <div className="doc">
                <span style={{ color: "var(--accent)" }}>◧</span>
                <span style={{ flex: 1 }}>{inv.num}.pdf</span>
                <span className="badge-muted">generated</span>
              </div>
              {c.country === "IN" && inv.stage >= 6 && (
                <div className="doc">
                  <span style={{ color: "var(--accent-2)" }}>◧</span>
                  <span style={{ flex: 1 }}>FIRC_{inv.num}.pdf</span>
                  <span className="badge-muted">uploaded</span>
                </div>
              )}
            </div>
          </div>
          <div className="card">
            <div className="card-hdr">
              <span className="card-title">Activity</span>
            </div>
            <div className="activity">
              {(inv.history || []).slice().reverse().map((h, i) => (
                <div key={i} className="act">
                  <div
                    className="act-dot"
                    style={{ background: stageColors[h.to] || "var(--text-3)" }}
                  />
                  <div style={{ flex: 1 }}>
                    <div>
                      Moved to <b style={{ color: "var(--text)" }}>{stageLabels[h.to]}</b>
                    </div>
                    <div className="act-ts mono">
                      {new Date(h.at).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {!(inv.history || []).length && (
                <div style={{ color: "var(--text-3)", fontSize: 12 }}>No activity yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
