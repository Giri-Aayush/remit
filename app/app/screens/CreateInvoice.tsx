"use client";

import { useCallback, useEffect, useState } from "react";
import { REMIT, type Client, type Line } from "../data";
import { Avatar, CountryFlag, Kbd, type NavFn } from "../shared";

export default function CreateInvoice({
  nav,
  presetClient,
  onCreated,
}: {
  nav: NavFn;
  presetClient: Client | null;
  onCreated: (data: { status: string }) => void;
}) {
  const [client, setClient] = useState<Client | null>(presetClient);
  const [lines, setLines] = useState<Line[]>([]);
  const [hasVerify, setHasVerify] = useState(false);

  useEffect(() => {
    if (!client) return;
    const ls: Line[] = [];
    if (client.template === "detailed" && client.project_codes.length) {
      const first = client.project_codes[0];
      ls.push({
        code: first.code,
        desc: first.desc,
        sac: client.sac,
        hours: "",
        rate: client.rate,
        amount: 0,
      });
    } else {
      ls.push({
        code: null,
        desc: "",
        sac: client.sac,
        hours: "",
        rate: null,
        amount: 0,
      });
    }
    client.recurring.forEach((r) =>
      ls.push({
        code: null,
        desc: r.desc,
        sac: client.sac,
        hours: 0,
        rate: null,
        amount: r.amount,
        adj: true,
      })
    );
    setLines(ls);
    setHasVerify(false);
  }, [client]);

  const duplicateLast = useCallback(() => {
    if (!client) return;
    const last = REMIT.invoices.find((i) => i.client === client.id);
    if (!last) return;
    setLines(last.lines.map((l) => ({ ...l, verify: !l.adj })));
    setHasVerify(true);
  }, [client]);

  const save = useCallback(
    (status: "draft" | "sent") => {
      if (!client || !lines.length) return;
      onCreated({ status: status === "sent" ? "Sent" : "Draft" });
    },
    [client, lines, onCreated]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!client && /^[1-9]$/.test(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (REMIT.clients[idx]) setClient(REMIT.clients[idx]);
      }
      if (client && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "d") {
        e.preventDefault();
        duplicateLast();
      }
      if (client && (e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        save("sent");
      }
      if (client && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        save("draft");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [client, lines, duplicateLast, save]);

  const updateLine = (i: number, patch: Partial<Line>) => {
    setLines((ls) =>
      ls.map((l, idx) => {
        if (idx !== i) return l;
        const next: Line = { ...l, ...patch };
        if (!next.adj && next.hours != null && next.rate != null) {
          const h = parseFloat(String(next.hours)) || 0;
          const r = parseFloat(String(next.rate)) || 0;
          next.amount = Math.round(h * r * 100) / 100;
        }
        return next;
      })
    );
  };

  const addLine = () => {
    if (!client) return;
    setLines((ls) => [
      ...ls,
      {
        code: null,
        desc: "",
        sac: client.sac,
        hours: "",
        rate: client.template === "detailed" ? client.rate : null,
        amount: 0,
      },
    ]);
  };

  const removeLine = (i: number) => setLines((ls) => ls.filter((_, idx) => idx !== i));

  const subtotal = lines.reduce((s, l) => s + (parseFloat(String(l.amount)) || 0), 0);
  const roundOff = client?.template === "detailed" ? -0.3 : 0;
  const total = subtotal + roundOff;

  if (!client) {
    return (
      <div className="screen">
        <div className="screen-hdr">
          <div>
            <div className="screen-crumb">New invoice</div>
            <h1 className="screen-title">Who are we billing?</h1>
          </div>
          <button className="btn btn-ghost" onClick={() => nav("dashboard")}>
            Cancel <Kbd k="Esc" />
          </button>
        </div>
        <div className="card">
          <div className="card-hdr">
            <span className="card-title">Pick a client</span>
            <span className="badge-muted">Or press 1–{Math.min(9, REMIT.clients.length)}</span>
          </div>
          <div className="client-pick-grid">
            {REMIT.clients.map((c, i) => (
              <button key={c.id} className="client-pick" onClick={() => setClient(c)}>
                <span className="pick-key mono">{i + 1}</span>
                <Avatar initials={c.initials} color={c.color} size={36} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{c.display_name}</div>
                  <div className="country-badge">
                    <CountryFlag code={c.country} /> {c.country} · {c.currency} · {c.template}
                  </div>
                </div>
                <span
                  className="mono"
                  style={{ fontSize: 11, color: "var(--text-3)" }}
                >
                  {c.prefix}
                  {String(c.next).padStart(4, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const invoiceNumber = `${client.prefix}${String(client.next).padStart(4, "0")}`;

  return (
    <div className="screen">
      <div className="screen-hdr">
        <div>
          <div className="screen-crumb">
            <button
              className="link-btn"
              onClick={() => setClient(null)}
              style={{ padding: 0 }}
            >
              ← Change client
            </button>
          </div>
          <h1 className="screen-title">
            <span
              className="mono"
              style={{ color: "var(--text-2)", fontWeight: 400, marginRight: 10 }}
            >
              {invoiceNumber}
            </span>
            {client.display_name}
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button className="btn btn-ghost" onClick={duplicateLast}>
            Duplicate last <Kbd k="⌘D" />
          </button>
          <button className="btn btn-ghost" onClick={() => save("draft")}>
            Save draft <Kbd k="⌘S" />
          </button>
          <button className="btn btn-accent" onClick={() => save("sent")}>
            Save & send <Kbd k="⌘↵" />
          </button>
        </div>
      </div>

      {hasVerify && (
        <div
          style={{
            padding: "10px 14px",
            background: "rgba(245,199,106,0.08)",
            border: "1px solid rgba(245,199,106,0.25)",
            borderRadius: 9,
            fontSize: 12.5,
            color: "var(--text-2)",
          }}
        >
          <b style={{ color: "#f5c76a" }}>Verify highlighted rows</b> — hours copied from last invoice.
          Update them for the new period.
        </div>
      )}

      <div className="card">
        <div className="meta-grid">
          <div>
            <div className="micro-label">Invoice no.</div>
            <div className="micro-value mono" style={{ color: "var(--accent)" }}>
              {invoiceNumber}
            </div>
          </div>
          <div>
            <div className="micro-label">Issue date</div>
            <div className="micro-value mono">2026-04-15</div>
          </div>
          <div>
            <div className="micro-label">Sale period</div>
            <div className="micro-value mono">Mar 2026</div>
          </div>
          <div>
            <div className="micro-label">Due</div>
            <div className="micro-value mono">+{client.terms}d</div>
          </div>
          <div>
            <div className="micro-label">Currency</div>
            <div className="micro-value mono">{client.currency}</div>
          </div>
          <div>
            <div className="micro-label">Template</div>
            <div className="micro-value mono" style={{ fontSize: 11 }}>
              {client.template}
            </div>
          </div>
        </div>

        <div className="li-hdr">
          <div style={{ width: 24 }}>#</div>
          {client.template === "detailed" && <div style={{ width: 140 }}>Code</div>}
          <div style={{ flex: 1 }}>Description</div>
          <div style={{ width: 60, textAlign: "right" }}>Hrs</div>
          {client.template === "detailed" && (
            <div style={{ width: 60, textAlign: "right" }}>Rate</div>
          )}
          <div style={{ width: 90, textAlign: "right" }}>Amount</div>
          <div style={{ width: 28 }} />
        </div>

        {lines.map((l, i) => (
          <div
            key={i}
            className={`li-row editable ${l.adj ? "adj" : ""} ${l.verify ? "verify" : ""}`}
          >
            <div
              style={{
                width: 24,
                color: "var(--text-3)",
                display: "flex",
                alignItems: "center",
              }}
            >
              {i + 1}
            </div>
            {client.template === "detailed" && (
              <div style={{ width: 140 }}>
                {l.adj ? (
                  <span style={{ fontSize: 11, color: "var(--text-3)" }}>adjustment</span>
                ) : (
                  <select
                    className="li-input mono"
                    style={{ fontSize: 11 }}
                    value={l.code || ""}
                    onChange={(e) => {
                      const pc = client.project_codes.find((p) => p.code === e.target.value);
                      updateLine(i, {
                        code: e.target.value,
                        desc: pc?.desc || "",
                        rate: pc?.rate || client.rate,
                      });
                    }}
                  >
                    <option value="">—</option>
                    {client.project_codes.map((p) => (
                      <option key={p.id} value={p.code}>
                        {p.code}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}
            <div style={{ flex: 1 }}>
              <input
                className="li-input"
                value={l.desc}
                placeholder={
                  client.template === "simple"
                    ? "e.g. PROGRAMMING APR 16–30 / BIMA"
                    : ""
                }
                onChange={(e) => updateLine(i, { desc: e.target.value })}
              />
            </div>
            <div style={{ width: 60 }}>
              <input
                className="li-input mono text-right"
                value={l.hours}
                disabled={l.adj}
                onChange={(e) => updateLine(i, { hours: e.target.value, verify: false })}
              />
            </div>
            {client.template === "detailed" && (
              <div style={{ width: 60 }}>
                <input
                  className="li-input mono text-right"
                  value={l.rate || ""}
                  disabled={l.adj}
                  onChange={(e) => updateLine(i, { rate: e.target.value as unknown as number })}
                />
              </div>
            )}
            <div style={{ width: 90 }}>
              {l.adj ? (
                <input
                  className="li-input mono text-right"
                  value={l.amount}
                  onChange={(e) => updateLine(i, { amount: parseFloat(e.target.value) || 0 })}
                />
              ) : (
                <div className="mono text-right" style={{ padding: "4px 8px" }}>
                  ${(l.amount || 0).toFixed(2)}
                </div>
              )}
            </div>
            <div style={{ width: 28, textAlign: "right" }}>
              <button className="icon-btn" onClick={() => removeLine(i)}>
                ×
              </button>
            </div>
          </div>
        ))}

        <button className="add-line" onClick={addLine}>
          + Add line <Kbd k="Tab" />
        </button>

        <div className="totals">
          <div>
            <span>Subtotal</span>
            <span className="mono">${subtotal.toFixed(2)}</span>
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
          {client.template === "detailed" && (
            <div>
              <span>R/OFF</span>
              <span className="mono">{roundOff.toFixed(2)}</span>
            </div>
          )}
          <div className="total">
            <span>Total</span>
            <span className="mono">USD {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
