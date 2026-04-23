"use client";

export default function Testimonials() {
  const cards = [
    {
      q: "I used to dread the last week of the month. Now I spend 4 minutes on invoicing and move on.",
      n: "Aayush J.",
      r: "Solo dev, India → crypto protocols",
      init: "AJ",
    },
    {
      q: "Finally saw my real SWIFT bill: ₹48,000 over 2025. Switched my receiving bank in the same breath.",
      n: "Priya M.",
      r: "Product designer, India → US",
      init: "PM",
    },
    {
      q: "The FIRC pipeline alone saves me an afternoon of emailing my bank every month.",
      n: "Kartik R.",
      r: "OPC founder, India → EU",
      init: "KR",
    },
    {
      q: "I'm based in Berlin invoicing in GBP. Remit figured out my VAT reverse-charge on day one.",
      n: "Ana L.",
      r: "Freelance engineer, DE → UK",
      init: "AL",
    },
    {
      q: "A real keyboard-first app. ⌘D is a love letter to monthly repeat billing.",
      n: "Theo K.",
      r: "Indie founder, US → EU",
      init: "TK",
    },
    {
      q: "My spreadsheet had 47 columns. Remit replaced it with a screen that tells me the two numbers I actually need.",
      n: "Sunita N.",
      r: "Consultant, India → GCC",
      init: "SN",
    },
  ];
  return (
    <section style={{ padding: "100px 32px" }}>
      <div className="container">
        <div className="reveal stagger">
          <div className="eyebrow">
            <span className="dot" /> Quiet conversions
          </div>
          <h2 style={{ marginTop: 22, maxWidth: 800 }}>
            Operators who <span className="serif">stopped using Excel.</span>
          </h2>
        </div>
        <div className="testi-grid reveal stagger" style={{ marginTop: 50 }}>
          {cards.map((c, i) => (
            <div key={i} className="testi-card" data-hover>
              <div className="testi-quote">&ldquo;{c.q}&rdquo;</div>
              <div className="testi-author">
                <div className="testi-ava">{c.init}</div>
                <div className="testi-meta">
                  <div className="n">{c.n}</div>
                  <div className="r">{c.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
