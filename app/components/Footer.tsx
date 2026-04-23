"use client";

export default function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="footer-marq">
        <span>Cross‑border invoicing</span>
        <span className="dot" />
        <span>No more Excel</span>
        <span className="dot" />
        <span>Cross‑border invoicing</span>
        <span className="dot" />
        <span>No more Excel</span>
        <span className="dot" />
      </div>
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <div className="footer-cols">
          <div>
            <a
              href="#"
              className="logo"
              style={{
                color: "var(--text)",
                textDecoration: "none",
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span className="logo-mark" />
              Remit
            </a>
            <p
              style={{
                color: "var(--text-2)",
                fontSize: 14,
                marginTop: 16,
                maxWidth: 280,
                lineHeight: 1.5,
              }}
            >
              Cross-border invoicing for the one-person company. Built for solo operators who bill
              in currencies other than their home one.
            </p>
          </div>
          <div>
            <h5>Product</h5>
            <ul>
              <li>
                <a href="#features">Pipeline</a>
              </li>
              <li>
                <a href="#features">FX tracking</a>
              </li>
              <li>
                <a href="#features">Compliance</a>
              </li>
              <li>
                <a href="#demo">Dashboard</a>
              </li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Changelog</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h5>Resources</h5>
            <ul>
              <li>
                <a href="#">Docs</a>
              </li>
              <li>
                <a href="#">SWIFT fee guide</a>
              </li>
              <li>
                <a href="#">FIRC primer</a>
              </li>
              <li>
                <a href="#">Currency API</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-small">
          <div>© 2026 Remit Labs · Cloudflare Workers edge</div>
          <div>v1.0 · last deploy 3 minutes ago</div>
        </div>
      </div>
    </footer>
  );
}
