"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Magnetic from "./Magnetic";

function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let t = 0;
    const dpr = window.devicePixelRatio || 1;
    let W = 0;
    let H = 0;
    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    const onResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
    };
    window.addEventListener("resize", onResize);

    const mouse = { x: W / 2, y: H / 2 };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const theme = document.documentElement.getAttribute("data-theme");
      const dark = theme !== "light";
      const base = dark ? "rgba(255,255,255," : "rgba(10,10,20,";
      const accent = dark ? "176,157,255" : "107,77,255";

      const spacing = 60;
      const cols = Math.ceil(W / spacing) + 2;
      const rows = Math.ceil(H / spacing) + 2;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const wave = Math.sin((x + y) * 0.01 + t * 0.015) * 8;
          const pull = Math.max(0, 1 - dist / 300);
          const ox = wave + pull * -dx * 0.1;
          const oy = wave + pull * -dy * 0.1;
          const size = 1 + pull * 2;
          const opacity = 0.07 + pull * 0.4;
          ctx.beginPath();
          if (pull > 0.2) {
            ctx.fillStyle = `rgba(${accent},${opacity})`;
          } else {
            ctx.fillStyle = `${base}${opacity})`;
          }
          ctx.arc(x + ox, y + oy, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return <canvas ref={ref} className="hero-canvas" />;
}

function DriftPill({
  children,
  top,
  left,
  delay,
  amp = 20,
}: {
  children: ReactNode;
  top: string;
  left: string;
  delay: number;
  amp?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const start = Date.now() + delay;
    const tick = () => {
      const t = (Date.now() - start) / 1000;
      if (ref.current) {
        ref.current.style.transform = `translate(${Math.sin(t * 0.8) * amp}px, ${
          Math.cos(t * 0.6) * amp * 0.7
        }px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [delay, amp]);
  return (
    <div ref={ref} className="drift" style={{ top, left }}>
      {children}
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const y = window.scrollY;
      const el = ref.current.querySelector<HTMLElement>(".hero-content");
      const cv = ref.current.querySelector<HTMLElement>(".hero-canvas");
      if (el) el.style.transform = `translateY(${y * 0.2}px)`;
      if (cv) cv.style.transform = `translateY(${y * 0.4}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero noise" ref={ref}>
      <HeroCanvas />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <DriftPill top="20%" left="5%" delay={0} amp={14}>
        <span className="ccy">USD</span> 4,557.00 <span className="up">→ INR</span>
      </DriftPill>
      <DriftPill top="30%" left="82%" delay={700} amp={18}>
        <span style={{ color: "var(--accent-2)" }}>●</span> Credited · Mar 31
      </DriftPill>
      <DriftPill top="65%" left="8%" delay={1400} amp={12}>
        FX loss <span className="down">−₹2,418</span>
      </DriftPill>
      <DriftPill top="70%" left="78%" delay={2100} amp={16}>
        <span className="ccy">FIRC</span> Pending <span className="up">●</span>
      </DriftPill>

      <div className="container hero-content">
        <div className="reveal stagger">
          <div className="eyebrow">
            <span className="dot" /> Built for the cross-border freelancer · v1.0
          </div>
          <h1 className="hero-headline" style={{ marginTop: 22 }}>
            Invoices that cross <em>borders</em>.<br />
            Cash that <em>lands</em>.
          </h1>
          <p className="hero-sub">
            Remit is the invoice dashboard for one-person companies billing foreign clients.
            Track every stage from draft to settled — and expose the FX losses and SWIFT fees
            the spreadsheet never saw.
          </p>
          <div className="hero-ctas">
            <Magnetic>
              <button className="btn btn-accent" data-hover>
                Start free — it&apos;s just you →
              </button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <button className="btn" data-hover>
                Watch a 90-second tour
              </button>
            </Magnetic>
          </div>
          <div className="hero-meta">
            <div>
              <div className="k">Invoices tracked</div>
              <div className="v">128,430</div>
            </div>
            <div>
              <div className="k">Avg. creation time</div>
              <div className="v">18s</div>
            </div>
            <div>
              <div className="k">FX loss surfaced</div>
              <div className="v">₹4.2 Cr</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
