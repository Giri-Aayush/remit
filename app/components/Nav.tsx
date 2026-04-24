"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`top ${scrolled ? "scrolled" : ""}`}>
      <a href="#" className="logo">
        <span className="logo-mark" />
        Remit
      </a>
      <a href="#features" className="hide-sm">
        Features
      </a>
      <a href="#demo" className="hide-sm">
        Product
      </a>
      <a href="#pricing" className="hide-sm">
        Pricing
      </a>
      <a href="#faq" className="hide-sm">
        FAQ
      </a>
      <Link
        href="/app"
        className="btn btn-accent"
        data-hover
        style={{ padding: "8px 16px", fontSize: 13, textDecoration: "none" }}
      >
        Open app
        <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, opacity: 0.7 }}>↗</span>
      </Link>
    </nav>
  );
}
