"use client";

export default function Settings() {
  return (
    <div className="screen">
      <div className="screen-hdr">
        <div>
          <div className="screen-crumb">Settings</div>
          <h1 className="screen-title">Issuer configuration</h1>
        </div>
        <button className="btn btn-accent">Save changes</button>
      </div>

      <div className="card">
        <div className="card-hdr">
          <span className="card-title">Business identity</span>
        </div>
        <div className="form-grid">
          <div className="span-2">
            <div className="micro-label">Legal name</div>
            <input className="field" defaultValue="Jino Labs (OPC) Private Limited" />
          </div>
          <div>
            <div className="micro-label">Country</div>
            <select className="field" defaultValue="IN">
              <option>IN</option>
              <option>US</option>
              <option>GB</option>
              <option>DE</option>
            </select>
          </div>
          <div>
            <div className="micro-label">Home currency</div>
            <select className="field mono" defaultValue="INR">
              <option>INR</option>
              <option>USD</option>
              <option>GBP</option>
              <option>EUR</option>
            </select>
          </div>
          <div>
            <div className="micro-label">GSTIN</div>
            <input className="field mono" defaultValue="29ABCDE1234F1Z5" />
          </div>
          <div>
            <div className="micro-label">PAN</div>
            <input className="field mono" defaultValue="ABCDE1234F" />
          </div>
          <div>
            <div className="micro-label">CIN</div>
            <input className="field mono" defaultValue="U74999KA2023OPC123456" />
          </div>
          <div>
            <div className="micro-label">Tax treatment</div>
            <select className="field">
              <option>Zero-rated export (LUT)</option>
              <option>VAT reverse-charge</option>
              <option>None</option>
            </select>
          </div>
          <div className="span-2">
            <div className="micro-label">Registered address</div>
            <textarea
              className="field"
              rows={2}
              defaultValue="42/3, Koramangala 4th Block, Bengaluru 560034, Karnataka, India"
            />
          </div>
          <div>
            <div className="micro-label">Mobile</div>
            <input className="field mono" defaultValue="+91 98765 43210" />
          </div>
          <div>
            <div className="micro-label">Email (default)</div>
            <input className="field" defaultValue="aayush@jinolabs.com" />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-hdr">
          <span className="card-title">Banking</span>
        </div>
        <div className="form-grid">
          <div>
            <div className="micro-label">Bank name</div>
            <input className="field" defaultValue="Canara Bank" />
          </div>
          <div>
            <div className="micro-label">Branch</div>
            <input className="field" defaultValue="Koramangala, Bengaluru" />
          </div>
          <div>
            <div className="micro-label">Account number</div>
            <input className="field mono" defaultValue="0634201000456789" />
          </div>
          <div>
            <div className="micro-label">IFSC</div>
            <input className="field mono" defaultValue="CNRB0000634" />
          </div>
          <div>
            <div className="micro-label">SWIFT</div>
            <input className="field mono" defaultValue="CNRBINBBBFD" />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-hdr">
          <span className="card-title">Compliance pipelines</span>
        </div>
        <div style={{ padding: 18 }}>
          <label className="radio-card selected" style={{ alignItems: "center", marginBottom: 8 }}>
            <input type="checkbox" defaultChecked style={{ accentColor: "var(--accent)" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13 }}>
                FIRC / FIRA tracking{" "}
                <span className="badge-muted" style={{ marginLeft: 6 }}>
                  India
                </span>
              </div>
              <div style={{ fontSize: 11, color: "var(--text-3)" }}>
                Adds a pipeline stage after Credited for tracking RBI FIRC issuance
              </div>
            </div>
          </label>
          <label className="radio-card" style={{ alignItems: "center" }}>
            <input type="checkbox" style={{ accentColor: "var(--accent)" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13 }}>
                VAT reverse-charge{" "}
                <span className="badge-muted" style={{ marginLeft: 6 }}>
                  EU
                </span>
              </div>
              <div style={{ fontSize: 11, color: "var(--text-3)" }}>
                Enable only if selling services to EU business customers
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="card">
        <div className="card-hdr">
          <span className="card-title">Signature & stamp</span>
        </div>
        <div
          style={{
            padding: 18,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
          }}
        >
          <div>
            <div className="micro-label" style={{ marginBottom: 8 }}>
              Signature
            </div>
            <div className="sig-zone">
              <div
                style={{
                  width: 120,
                  height: 60,
                  background: "var(--surface-2)",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-instrument-serif), serif",
                  fontStyle: "italic",
                  fontSize: 22,
                  color: "var(--text-2)",
                }}
              >
                A. Jindal
              </div>
              <div>
                <button className="btn btn-ghost">Replace</button>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-3)",
                    marginTop: 6,
                    fontFamily: "var(--mono)",
                  }}
                >
                  Embedded on every PDF
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="micro-label" style={{ marginBottom: 8 }}>
              Stamp
            </div>
            <div className="sig-zone">
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  border: "2px solid var(--text-2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9,
                  color: "var(--text-2)",
                  textAlign: "center",
                  lineHeight: 1.1,
                  fontFamily: "var(--mono)",
                }}
              >
                JINO
                <br />
                LABS
              </div>
              <div>
                <button className="btn btn-ghost">Replace</button>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-3)",
                    marginTop: 6,
                    fontFamily: "var(--mono)",
                  }}
                >
                  Optional
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
