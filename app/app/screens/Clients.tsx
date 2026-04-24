"use client";

import { useState } from "react";
import { REMIT, type Client } from "../data";
import {
  Avatar,
  CountryFlag,
  PipelineBar,
  StatusBadge,
  Tile,
  type NavFn,
} from "../shared";

export function ClientList({
  nav,
  onOpenClient,
}: {
  nav: NavFn;
  onOpenClient: (id: string) => void;
}) {
  const data = REMIT.clients.map((c) => {
    const invs = REMIT.invoices.filter((i) => i.client === c.id);
    return {
      ...c,
      billed: invs.reduce((s, i) => s + i.total, 0),
      count: invs.length,
      last: invs[0]?.issue || "—",
    };
  });
  return (
    <div className="screen">
      <div className="screen-hdr">
        <div>
          <div className="screen-crumb">Clients</div>
          <h1 className="screen-title">All clients</h1>
        </div>
        <button className="btn btn-accent">+ New client</button>
      </div>
      <div className="table">
        <div className="table-hdr">
          <div style={{ flex: 1 }}>Client</div>
          <div style={{ width: 70 }}>Country</div>
          <div style={{ width: 120, textAlign: "right" }}>YTD billed</div>
          <div style={{ width: 80, textAlign: "right" }}>Invoices</div>
          <div style={{ width: 110 }}>Last invoice</div>
          <div style={{ width: 140 }}>Template</div>
          <div style={{ width: 60 }} />
        </div>
        {data.map((c) => (
          <div key={c.id} className="table-row" onClick={() => onOpenClient(c.id)}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar initials={c.initials} color={c.color} size={22} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{c.display_name}</div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-3)",
                    fontFamily: "var(--mono)",
                  }}
                >
                  {c.legal_name}
                </div>
              </div>
            </div>
            <div style={{ width: 70, fontFamily: "var(--mono)", fontSize: 12 }}>
              <CountryFlag code={c.country} /> {c.country}
            </div>
            <div style={{ width: 120, textAlign: "right", fontFamily: "var(--mono)" }}>
              USD {c.billed.toLocaleString()}
            </div>
            <div style={{ width: 80, textAlign: "right", fontFamily: "var(--mono)" }}>
              {c.count}
            </div>
            <div
              style={{
                width: 110,
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--text-3)",
              }}
            >
              {c.last}
            </div>
            <div
              style={{
                width: 140,
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--text-2)",
              }}
            >
              {c.template}
            </div>
            <div style={{ width: 60, textAlign: "right" }}>
              <button className="icon-btn" onClick={(e) => e.stopPropagation()}>
                ⋯
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClientSettings({ client }: { client: Client }) {
  return (
    <div className="col-gap">
      <div className="card">
        <div className="card-hdr">
          <span className="card-title">Identity</span>
        </div>
        <div className="form-grid">
          <div>
            <div className="micro-label">Display name</div>
            <input className="field" defaultValue={client.display_name} />
          </div>
          <div>
            <div className="micro-label">Legal name</div>
            <input className="field" defaultValue={client.legal_name} />
          </div>
          <div>
            <div className="micro-label">Country</div>
            <select className="field" defaultValue={client.country}>
              <option>GB</option>
              <option>US</option>
              <option>AE</option>
              <option>CH</option>
              <option>DE</option>
              <option>SG</option>
            </select>
          </div>
          <div>
            <div className="micro-label">Invoice contact email</div>
            <input className="field" defaultValue={client.invoice_email} />
          </div>
          <div className="span-2">
            <div className="micro-label">Bill-to address</div>
            <textarea className="field" rows={2} defaultValue={client.address} />
          </div>
          <div className="span-2">
            <div className="micro-label" style={{ marginBottom: 8 }}>
              Bill-to name style
            </div>
            <div className="radio-row">
              <label
                className={`radio-card ${client.bill_style === "company" ? "selected" : ""}`}
              >
                <input type="radio" name="bs" defaultChecked={client.bill_style === "company"} />
                <div>
                  <div style={{ fontSize: 13 }}>Company is the name</div>
                  <div style={{ fontSize: 11, color: "var(--text-3)" }}>
                    Legal name as NAME row
                  </div>
                </div>
              </label>
              <label
                className={`radio-card ${
                  client.bill_style === "person_with_company" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="bs"
                  defaultChecked={client.bill_style === "person_with_company"}
                />
                <div>
                  <div style={{ fontSize: 13 }}>Named person</div>
                  <div style={{ fontSize: 11, color: "var(--text-3)" }}>
                    Contact person as NAME, company in address
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-hdr">
          <span className="card-title">Invoicing defaults</span>
        </div>
        <div className="form-grid">
          <div>
            <div className="micro-label">Hourly rate</div>
            <input className="field mono" defaultValue={client.rate} />
          </div>
          <div>
            <div className="micro-label">Currency</div>
            <input className="field mono" defaultValue={client.currency} />
          </div>
          <div>
            <div className="micro-label">SAC code</div>
            <input className="field mono" defaultValue={client.sac} />
          </div>
          <div>
            <div className="micro-label">Invoice prefix</div>
            <input className="field mono" defaultValue={client.prefix} />
          </div>
          <div>
            <div className="micro-label">Next invoice number</div>
            <input className="field mono" defaultValue={client.next} />
          </div>
          <div>
            <div className="micro-label">Payment terms (days)</div>
            <input className="field mono" defaultValue={client.terms} />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-hdr">
          <span className="card-title">PDF template</span>
        </div>
        <div style={{ padding: 18 }}>
          <div className="radio-row">
            <label
              className={`radio-card ${client.template === "detailed" ? "selected" : ""}`}
              style={{ flexDirection: "column", alignItems: "stretch" }}
            >
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <input type="radio" name="tpl" defaultChecked={client.template === "detailed"} />
                <div>
                  <div style={{ fontSize: 13 }}>Detailed</div>
                  <div style={{ fontSize: 11, color: "var(--text-3)" }}>
                    Code · QTY · RATE · AMT · R/OFF
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: 10,
                  padding: 10,
                  background: "#fff",
                  borderRadius: 6,
                  display: "grid",
                  gridTemplateColumns: "32px 1fr 40px 40px 40px",
                  gap: 4,
                  fontFamily: "var(--mono)",
                  fontSize: 9,
                  color: "#222",
                }}
              >
                <div>Sl</div>
                <div>Desc</div>
                <div>QTY</div>
                <div>RATE</div>
                <div>AMT</div>
                <div>1</div>
                <div>STK-SDW-01</div>
                <div style={{ textAlign: "right" }}>92</div>
                <div style={{ textAlign: "right" }}>19</div>
                <div style={{ textAlign: "right" }}>1748</div>
              </div>
            </label>
            <label
              className={`radio-card ${client.template === "simple" ? "selected" : ""}`}
              style={{ flexDirection: "column", alignItems: "stretch" }}
            >
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <input type="radio" name="tpl" defaultChecked={client.template === "simple"} />
                <div>
                  <div style={{ fontSize: 13 }}>Simple</div>
                  <div style={{ fontSize: 11, color: "var(--text-3)" }}>
                    Free-form description · QTY · AMT
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: 10,
                  padding: 10,
                  background: "#fff",
                  borderRadius: 6,
                  display: "grid",
                  gridTemplateColumns: "32px 1fr 40px 40px",
                  gap: 4,
                  fontFamily: "var(--mono)",
                  fontSize: 9,
                  color: "#222",
                }}
              >
                <div>Sl</div>
                <div>Desc</div>
                <div>QTY</div>
                <div>AMT</div>
                <div>1</div>
                <div>PROGRAMMING APR 16–30</div>
                <div style={{ textAlign: "right" }}>80</div>
                <div style={{ textAlign: "right" }}>3708</div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-hdr">
          <span className="card-title">Project codes</span>
          <button className="link-btn">+ Add code</button>
        </div>
        {client.project_codes.length ? (
          client.project_codes.map((p) => (
            <div key={p.id} className="li-row">
              <div style={{ width: 120, fontFamily: "var(--mono)", color: "var(--accent)" }}>
                {p.code}
              </div>
              <div style={{ flex: 1 }}>{p.desc}</div>
              <div style={{ width: 80, fontFamily: "var(--mono)", textAlign: "right" }}>
                ${p.rate}/hr
              </div>
              <div style={{ width: 40, textAlign: "right", color: "var(--accent-2)" }}>●</div>
            </div>
          ))
        ) : (
          <div
            style={{
              padding: 20,
              color: "var(--text-3)",
              fontSize: 13,
              textAlign: "center",
            }}
          >
            No project codes — this client uses free-form line items.
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-hdr">
          <span className="card-title">SWIFT fee model</span>
        </div>
        <div style={{ padding: 18 }}>
          <div className="radio-row">
            <label
              className={`radio-card ${client.swift_model === "client_bears" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="sw"
                defaultChecked={client.swift_model === "client_bears"}
              />
              <div>
                <div style={{ fontSize: 13 }}>Client bears fees (OUR)</div>
                <div style={{ fontSize: 11, color: "var(--text-3)" }}>
                  I receive the full invoiced amount
                </div>
              </div>
            </label>
            <label
              className={`radio-card ${
                client.swift_model === "recipient_bears" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="sw"
                defaultChecked={client.swift_model === "recipient_bears"}
              />
              <div>
                <div style={{ fontSize: 13 }}>Recipient bears (BEN/SHA)</div>
                <div style={{ fontSize: 11, color: "var(--text-3)" }}>
                  Fees deducted; I receive less
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClientDetail({
  clientId,
  nav,
  onOpenInvoice,
}: {
  clientId: string;
  nav: NavFn;
  onOpenInvoice: (id: string) => void;
}) {
  const c = REMIT.clients.find((x) => x.id === clientId);
  const [tab, setTab] = useState<"overview" | "invoices" | "settings">("overview");
  if (!c) return <div className="screen">Client not found.</div>;
  const invs = REMIT.invoices.filter((i) => i.client === c.id);
  const billed = invs.reduce((s, i) => s + i.total, 0);
  const outstanding = invs
    .filter((i) => !["credited", "done"].includes(i.status))
    .reduce((s, i) => s + i.total, 0);

  return (
    <div className="screen">
      <div className="screen-hdr">
        <div>
          <div className="screen-crumb">
            <button
              className="link-btn"
              onClick={() => nav("clients")}
              style={{ padding: 0 }}
            >
              ← Clients
            </button>
          </div>
          <h1 className="screen-title" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar initials={c.initials} color={c.color} size={30} />
            {c.display_name}
            <span
              style={{
                fontSize: 12,
                color: "var(--text-3)",
                fontFamily: "var(--mono)",
                marginLeft: 8,
              }}
            >
              <CountryFlag code={c.country} /> {c.country}
            </span>
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost" onClick={() => setTab("settings")}>
            Settings
          </button>
          <button
            className="btn btn-accent"
            onClick={() => nav("create", { clientId: c.id })}
          >
            + New invoice
          </button>
        </div>
      </div>

      <div className="tabs">
        {(["overview", "invoices", "settings"] as const).map((t) => (
          <button
            key={t}
            className={`tab ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <>
          <div className="tiles-row">
            <Tile
              label="YTD billed"
              value={`USD ${billed.toLocaleString()}`}
              sub={`${invs.length} invoices`}
              tone="up"
            />
            <Tile
              label="Outstanding"
              value={`USD ${outstanding.toLocaleString()}`}
              sub={outstanding > 0 ? "awaiting credit" : "all settled"}
              tone={outstanding > 0 ? "warn" : "up"}
            />
            <Tile
              label="Payment terms"
              value={`${c.terms} days`}
              sub={
                c.swift_model === "client_bears" ? "Client bears SWIFT" : "Recipient bears"
              }
              tone="neutral"
            />
            <Tile
              label="Default rate"
              value={`$${c.rate}/hr`}
              sub={`SAC ${c.sac}`}
              tone="neutral"
            />
          </div>
          <div className="card">
            <div className="card-hdr">
              <span className="card-title">Recent invoices</span>
            </div>
            <div className="inv-list">
              {invs.map((inv) => (
                <div
                  key={inv.id}
                  className="inv-row"
                  onClick={() => onOpenInvoice(inv.id)}
                >
                  <div className="inv-num mono">{inv.num}</div>
                  <div
                    className="inv-client mono"
                    style={{ fontSize: 11, color: "var(--text-3)" }}
                  >
                    {inv.issue}
                  </div>
                  <div className="inv-amt mono">${inv.total.toLocaleString()}</div>
                  <StatusBadge status={inv.status} />
                  <PipelineBar stage={inv.stage} status={inv.status} compact />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === "invoices" && (
        <div className="card">
          <div className="inv-list">
            {invs.map((inv) => (
              <div key={inv.id} className="inv-row" onClick={() => onOpenInvoice(inv.id)}>
                <div className="inv-num mono">{inv.num}</div>
                <div className="inv-client">{inv.period}</div>
                <div className="inv-amt mono">${inv.total.toLocaleString()}</div>
                <StatusBadge status={inv.status} />
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "settings" && <ClientSettings client={c} />}
    </div>
  );
}
