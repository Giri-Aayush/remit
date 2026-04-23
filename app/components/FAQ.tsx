"use client";

import { useState } from "react";

export default function FAQ() {
  const items = [
    {
      q: "Does Remit actually move money?",
      a: "No. Remit never touches payments. It records them. We integrate read-only with bank statement exports to help you reconcile faster, but we don't send or receive funds.",
    },
    {
      q: "I'm not in India. Will this work for me?",
      a: "Yes. Remit is architected country-first. Set your home country and home currency, and the app adapts: tax ID fields, PDF layout, and compliance pipeline all change. India just happens to have the most complex case, so we built it first.",
    },
    {
      q: "Do you file taxes or generate GST returns?",
      a: "No. Remit exports clean CSV and zipped PDF bundles your CA can import. Tax filing is explicitly out of scope — we'd rather do one thing precisely than ten things vaguely.",
    },
    {
      q: "What happens to my existing historical invoices?",
      a: "Drag and drop your old PDFs onto the Import page. Remit parses them, matches them to clients, and backfills your dashboard. Historical FX data can be added invoice-by-invoice or skipped.",
    },
    {
      q: "Is it really just me? No team features?",
      a: "Correct. One operator per account. No seats, no roles, no client portals. We believe solo finance tools should feel like Superhuman, not Slack.",
    },
    {
      q: "How do I get my invoices out in case I stop using Remit?",
      a: "Every invoice PDF is one click away. Bulk download as a timestamped zip anytime. Your data is yours — no export fees, no \"business plan only\" gates.",
    },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section style={{ padding: "100px 32px" }} id="faq">
      <div className="container">
        <div className="reveal stagger" style={{ textAlign: "center" }}>
          <div className="eyebrow">
            <span className="dot" /> Questions
          </div>
          <h2 style={{ marginTop: 22 }}>Answered.</h2>
        </div>
        <div className="faq-list">
          {items.map((it, i) => (
            <div
              key={i}
              className={`faq-item ${open === i ? "open" : ""}`}
              onClick={() => setOpen(open === i ? -1 : i)}
              data-hover
            >
              <div className="faq-q">
                <span>{it.q}</span>
                <span className="faq-icon" />
              </div>
              <div className="faq-a">{it.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
