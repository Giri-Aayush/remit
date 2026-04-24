"use client";

import { useEffect, useState } from "react";
import { REMIT } from "./data";
import { Kbd } from "./shared";

export type FxPayload = {
  received: string;
  credited: string;
  date: string;
  rate: string;
  spread: string;
  loss: number;
};

export default function FxCreditModal({
  open,
  invoiceId,
  onClose,
  onConfirm,
}: {
  open: boolean;
  invoiceId: string | null;
  onClose: () => void;
  onConfirm: (data: FxPayload) => void;
}) {
  const inv = invoiceId ? REMIT.invoices.find((i) => i.id === invoiceId) : null;
  const c = inv ? REMIT.clients.find((x) => x.id === inv.client) : null;
  const [received, setReceived] = useState("");
  const [credited, setCredited] = useState("");
  const [date, setDate] = useState("2026-04-09");
  const mid = 83.45;

  useEffect(() => {
    if (inv && c) {
      const expected =
        c.swift_model === "client_bears" ? inv.total : inv.total - c.typical_swift;
      setReceived(expected.toFixed(2));
      setCredited((expected * mid).toFixed(0));
    }
  }, [invoiceId, inv, c]);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, onClose]);

  if (!open || !inv || !c) return null;
  const r = parseFloat(received) || 0;
  const cr = parseFloat(credited) || 0;
  const bankRate = r > 0 ? cr / r : 0;
  const spread = ((mid - bankRate) / mid) * 100;
  const fxLoss = r * mid - cr;
  const intermediaryFee = inv.total - r;
  const intermediaryLoss = intermediaryFee * mid;
  const totalLoss = fxLoss + intermediaryLoss;
  const expected =
    c.swift_model === "client_bears" ? inv.total : inv.total - c.typical_swift;
  const isAnomalous =
    Math.abs(r - expected) > (c.swift_model === "client_bears" ? 1 : 10);

  return (
    <div className="remit-app-modal-backdrop" onClick={onClose}>
      <div
        className="remit-app-modal"
        style={{ width: 520 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-hdr">
          <div>
            <div className="screen-crumb" style={{ marginBottom: 6 }}>
              Record credit
            </div>
            <div style={{ fontSize: 17, fontWeight: 500 }}>
              <span className="mono" style={{ color: "var(--text-2)", marginRight: 10 }}>
                {inv.num}
              </span>
              {c.display_name}
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="fx-form">
          <div className="fx-form-row">
            <div>
              <div className="micro-label">Amount received</div>
              <span className="hint">
                Expected ≈ ${expected.toLocaleString()} (
                {c.swift_model === "client_bears" ? "OUR" : "BEN"})
              </span>
            </div>
            <div className="input-group">
              <span className="prefix mono">{inv.currency}</span>
              <input
                className="field mono"
                value={received}
                onChange={(e) => setReceived(e.target.value)}
              />
            </div>
          </div>

          <div className="fx-form-row">
            <div>
              <div className="micro-label">Amount credited to bank</div>
              <span className="hint">Full INR amount after FX</span>
            </div>
            <div className="input-group">
              <span className="prefix mono">INR</span>
              <input
                className="field mono"
                value={credited}
                onChange={(e) => setCredited(e.target.value)}
              />
            </div>
          </div>

          <div className="fx-form-row">
            <div className="micro-label">Credit date</div>
            <input
              type="date"
              className="field mono"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="fx-readout-live">
            <div
              style={{
                fontSize: 10,
                color: "var(--text-3)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontFamily: "var(--mono)",
                marginBottom: 10,
              }}
            >
              Live preview
            </div>
            <div className="fx-l">
              <span>Intermediary fee</span>
              <span className="mono">
                {intermediaryFee >= 0
                  ? `$${intermediaryFee.toFixed(2)}`
                  : `+$${Math.abs(intermediaryFee).toFixed(2)}`}
              </span>
            </div>
            <div className="fx-l">
              <span>Mid-market rate (auto)</span>
              <span className="mono">₹{mid}</span>
            </div>
            <div className="fx-l">
              <span>Your bank rate</span>
              <span className="mono">₹{bankRate.toFixed(2)}</span>
            </div>
            <div className="fx-l">
              <span>Bank spread</span>
              <span
                className="mono"
                style={{ color: spread > 1 ? "var(--accent-3)" : "var(--text)" }}
              >
                {spread.toFixed(2)}%
              </span>
            </div>
            <div className="fx-l">
              <span>FX loss</span>
              <span className="mono">
                ₹{Math.round(fxLoss).toLocaleString("en-IN")}
              </span>
            </div>
            <div className="fx-l total">
              <span>Total loss</span>
              <span className="mono" style={{ color: "var(--accent-3)" }}>
                −₹{Math.round(totalLoss).toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {isAnomalous && c.swift_model === "client_bears" && (
            <div className="fx-warn">
              <b>Unexpected gap.</b> This client is marked &ldquo;client bears SWIFT fees&rdquo; —
              you should receive the full invoiced amount. They may have silently switched
              charge codes.
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel <Kbd k="Esc" />
          </button>
          <button
            className="btn btn-accent"
            onClick={() =>
              onConfirm({
                received,
                credited,
                date,
                rate: bankRate.toFixed(2),
                spread: spread.toFixed(2),
                loss: totalLoss,
              })
            }
          >
            Save credit
          </button>
        </div>
      </div>
    </div>
  );
}
