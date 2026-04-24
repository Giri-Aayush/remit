"use client";

import { useState } from "react";
import { REMIT, stageLabels, type StageKey } from "../data";
import { Avatar, PipelineBar, StatusBadge, type NavFn } from "../shared";

export default function InvoiceList({
  nav,
  onOpenInvoice,
}: {
  nav: NavFn;
  onOpenInvoice: (id: string) => void;
}) {
  const [filter, setFilter] = useState<string>("all");
  const [clientFilter, setClientFilter] = useState<string>("all");
  const [selected, setSelected] = useState<string[]>([]);

  let rows = REMIT.invoices;
  if (filter !== "all")
    rows = rows.filter(
      (i) => i.status === filter || (filter === "open" && !(["done"] as StageKey[]).includes(i.status))
    );
  if (clientFilter !== "all") rows = rows.filter((i) => i.client === clientFilter);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const filters: string[] = ["all", "open", "sent", "approved", "transit", "credited", "done"];

  return (
    <div className="screen">
      <div className="screen-hdr">
        <div>
          <div className="screen-crumb">Invoices</div>
          <h1 className="screen-title">All invoices</h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {selected.length > 0 && (
            <>
              <button className="btn btn-ghost">Download ZIP ({selected.length})</button>
              <button className="btn btn-ghost">Export CSV</button>
            </>
          )}
          <button className="btn btn-accent" onClick={() => nav("create")}>
            + New invoice
          </button>
        </div>
      </div>

      <div className="filter-bar">
        <div style={{ display: "flex", gap: 6, flex: 1 }}>
          {filters.map((f) => (
            <button
              key={f}
              className={`chip ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : stageLabels[f as StageKey] || f}
            </button>
          ))}
        </div>
        <select
          className="chip"
          style={{ cursor: "pointer" }}
          value={clientFilter}
          onChange={(e) => setClientFilter(e.target.value)}
        >
          <option value="all">All clients</option>
          {REMIT.clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.display_name}
            </option>
          ))}
        </select>
      </div>

      <div className="table">
        <div className="table-hdr">
          <div style={{ width: 18 }} />
          <div style={{ width: 80 }}>Number</div>
          <div style={{ flex: 1 }}>Client</div>
          <div style={{ width: 100 }}>Issued</div>
          <div style={{ width: 100, textAlign: "right" }}>Amount</div>
          <div style={{ width: 120 }}>Status</div>
          <div style={{ width: 100 }}>Pipeline</div>
          <div style={{ width: 60 }} />
        </div>
        {rows.map((inv) => {
          const c = REMIT.clients.find((x) => x.id === inv.client)!;
          const isSel = selected.includes(inv.id);
          return (
            <div
              key={inv.id}
              className={`table-row ${isSel ? "selected" : ""}`}
              onClick={() => onOpenInvoice(inv.id)}
            >
              <div
                style={{ width: 18 }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(inv.id);
                }}
              >
                <input
                  type="checkbox"
                  checked={isSel}
                  onChange={() => {}}
                  style={{ accentColor: "var(--accent)" }}
                />
              </div>
              <div className="mono" style={{ width: 80, color: "var(--text-2)" }}>
                {inv.num}
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
                <Avatar initials={c.initials} color={c.color} size={18} />
                {c.display_name}
              </div>
              <div
                className="mono"
                style={{ width: 100, color: "var(--text-3)", fontSize: 12 }}
              >
                {inv.issue}
              </div>
              <div className="mono" style={{ width: 100, textAlign: "right" }}>
                ${inv.total.toLocaleString()}
              </div>
              <div style={{ width: 120 }}>
                <StatusBadge status={inv.status} />
              </div>
              <div style={{ width: 100 }}>
                <PipelineBar stage={inv.stage} status={inv.status} />
              </div>
              <div style={{ width: 60, textAlign: "right" }}>
                <button className="icon-btn" onClick={(e) => e.stopPropagation()}>
                  ⋯
                </button>
              </div>
            </div>
          );
        })}
        {!rows.length && (
          <div style={{ padding: 40, textAlign: "center", color: "var(--text-3)", fontSize: 13 }}>
            No invoices match this filter.
          </div>
        )}
      </div>
    </div>
  );
}
