"use client";

import { useEffect, useRef } from "react";
import Magnetic from "./Magnetic";

type Plan = {
  tag: string;
  hot: boolean;
  name: string;
  desc: string;
  price: string;
  per: string;
  feats: string[];
  cta: string;
};

function PriceCard({ tag, hot, name, desc, price, per, feats, cta }: Plan) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const rx = ((e.clientY - cy) / r.height) * -6;
      const ry = ((e.clientX - cx) / r.width) * 6;
      el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return (
    <div ref={ref} className={`price-card ${hot ? "featured" : ""}`} data-hover>
      <div className={`price-tag ${hot ? "hot" : ""}`}>{tag}</div>
      <div className="price-name">{name}</div>
      <div className="price-desc">{desc}</div>
      <div className="price-amt">
        <span className="num">{price}</span>
        <span className="per">{per}</span>
      </div>
      <Magnetic strength={0.15}>
        <button className={`btn ${hot ? "btn-accent" : "btn-primary"} price-btn`} data-hover>
          {cta} →
        </button>
      </Magnetic>
      <ul className="price-feats">
        {feats.map((f, i) => (
          <li key={i}>
            <span className="check">✓</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Pricing() {
  const plans: Plan[] = [
    {
      tag: "Starter",
      hot: false,
      name: "Solo",
      desc: "For one freelancer with a single client relationship.",
      price: "Free",
      per: "forever",
      feats: [
        "1 client",
        "Unlimited invoices",
        "PDF generation",
        "Full FX tracking",
        "Import historical PDFs",
      ],
      cta: "Get started",
    },
    {
      tag: "Most operators",
      hot: true,
      name: "Professional",
      desc: "For solo companies billing multiple foreign clients.",
      price: "$12",
      per: "/ month",
      feats: [
        "Unlimited clients",
        "All of Solo",
        "Compliance pipelines (FIRC, VAT)",
        "Cmd+D duplicate",
        "Keyboard shortcuts",
        "Priority support",
      ],
      cta: "Start 30-day trial",
    },
    {
      tag: "For CAs & accountants",
      hot: false,
      name: "Firm",
      desc: "Manage multiple operator accounts under one CA login.",
      price: "$8",
      per: "/ op. / month",
      feats: [
        "Up to 25 operators",
        "Bulk invoice export",
        "Shared compliance view",
        "Tax-time zip bundles",
        "Dedicated onboarding",
      ],
      cta: "Talk to sales",
    },
  ];
  return (
    <section style={{ padding: "100px 32px" }} id="pricing">
      <div className="container">
        <div className="reveal stagger" style={{ textAlign: "center" }}>
          <div className="eyebrow">
            <span className="dot" /> Pricing
          </div>
          <h2 style={{ marginTop: 22 }}>
            Cheap, <span className="serif">because you&apos;re one person.</span>
          </h2>
          <p
            style={{
              color: "var(--text-2)",
              fontSize: 17,
              marginTop: 18,
              maxWidth: 500,
              margin: "18px auto 0",
            }}
          >
            No seats. No &ldquo;talk to sales&rdquo; gates on real features. Pay per operator, not per invoice.
          </p>
        </div>
        <div className="price-grid reveal stagger" style={{ marginTop: 50 }}>
          {plans.map((p, i) => (
            <PriceCard key={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
