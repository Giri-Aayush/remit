"use client";

import { useRef } from "react";

export default function Logos() {
  const logos = [
    { s: "WB", n: "Wavebreak" },
    { s: "NM", n: "Nethermind" },
    { s: "DC", n: "Digichain" },
    { s: "ST", n: "Starknet" },
    { s: "SK", n: "Skydo" },
    { s: "CR", n: "Canara" },
    { s: "WS", n: "Wise" },
    { s: "FR", n: "Frankfurter" },
    { s: "OP", n: "OpenPayd" },
    { s: "BM", n: "Bima" },
  ];
  const loop = [...logos, ...logos];
  const trackRef = useRef<HTMLDivElement>(null);
  return (
    <div className="logos-wrap">
      <div
        style={{
          textAlign: "center",
          marginBottom: 36,
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "var(--text-3)",
          fontFamily: "var(--font-geist-mono), monospace",
        }}
      >
        Trusted by solo operators billing clients in 47 countries
      </div>
      <div
        className="logos-track"
        ref={trackRef}
        onMouseEnter={() => trackRef.current?.classList.add("paused")}
        onMouseLeave={() => trackRef.current?.classList.remove("paused")}
      >
        {loop.map((l, i) => (
          <div key={i} className="logo-item" data-hover>
            <span className="logo-symbol">{l.s}</span>
            {l.n}
          </div>
        ))}
      </div>
    </div>
  );
}
