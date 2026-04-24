export type StageKey =
  | "draft"
  | "sent"
  | "approved"
  | "transit"
  | "credited"
  | "firc_requested"
  | "done";

export const stages: StageKey[] = [
  "draft",
  "sent",
  "approved",
  "transit",
  "credited",
  "firc_requested",
  "done",
];

export const stageLabels: Record<StageKey, string> = {
  draft: "Draft",
  sent: "Sent",
  approved: "Approved",
  transit: "In transit",
  credited: "Credited",
  firc_requested: "FIRC requested",
  done: "Done",
};

export const stageColors: Record<StageKey, string> = {
  draft: "#a0a0b0",
  sent: "#f5c76a",
  approved: "#6ab7f5",
  transit: "#6ab7f5",
  credited: "#7cf7d3",
  firc_requested: "#b09dff",
  done: "#7cf7d3",
};

export type ProjectCode = {
  id: string;
  code: string;
  desc: string;
  rate: number;
  active: boolean;
};
export type Recurring = { id: string; desc: string; amount: number; active: boolean };

export type Client = {
  id: string;
  display_name: string;
  legal_name: string;
  country: string;
  initials: string;
  color: string;
  rate: number;
  currency: string;
  sac: string;
  prefix: string;
  next: number;
  terms: number;
  swift_model: "client_bears" | "recipient_bears";
  typical_swift: number;
  bill_style: "company" | "person_with_company";
  contact: string | null;
  template: "detailed" | "simple";
  invoice_email: string;
  address: string;
  gstin?: string | null;
  pdf_template?: string;
  project_codes: ProjectCode[];
  recurring: Recurring[];
};

export type Line = {
  code: string | null;
  desc: string;
  sac: string;
  hours: number | string;
  rate: number | null;
  amount: number;
  adj?: boolean;
  adjDesc?: string;
  verify?: boolean;
};

export type FX = {
  received: number;
  credited: number;
  mid: number;
  rate: number;
  spread: number;
  intermediaryFee: number;
  loss: number;
};

export type HistoryEntry = { from: StageKey | null; to: StageKey; at: string };

export type Invoice = {
  id: string;
  num: string;
  client: string;
  issue: string;
  period: string;
  currency: string;
  subtotal: number;
  total: number;
  status: StageKey;
  stage: number;
  lines: Line[];
  fx?: FX;
  history?: HistoryEntry[];
};

export const clients: Client[] = [
  {
    id: "nm",
    display_name: "Nethermind",
    legal_name: "Demerzel Solutions Limited",
    country: "GB",
    initials: "NM",
    color: "#b09dff",
    rate: 19,
    currency: "USD",
    sac: "998312",
    prefix: "INN",
    next: 20,
    terms: 14,
    swift_model: "recipient_bears",
    typical_swift: 29,
    bill_style: "company",
    contact: null,
    template: "detailed",
    invoice_email: "aayush@nethermind.io",
    address: "75/77 Cornhill, London EC3V 3QQ, United Kingdom",
    gstin: null,
    project_codes: [
      { id: "p1", code: "STK-SDW-01", desc: "Starknet, software dev work", rate: 19, active: true },
      { id: "p2", code: "NMI-BDV-01", desc: "Nethermind internal, backend dev", rate: 19, active: true },
      { id: "p3", code: "STK-RES-02", desc: "Starknet research", rate: 22, active: true },
    ],
    recurring: [{ id: "r1", desc: "NMI-BDV-01, rate increase adjustment", amount: 985.3, active: true }],
  },
  {
    id: "dc",
    display_name: "Digichain",
    legal_name: "Digichain Holdings FZ-LLC",
    country: "AE",
    initials: "DC",
    color: "#7cf7d3",
    rate: 46,
    currency: "USD",
    sac: "998312",
    prefix: "DCI",
    next: 9,
    terms: 7,
    swift_model: "client_bears",
    typical_swift: 0,
    bill_style: "person_with_company",
    contact: "Sunita Nair",
    template: "simple",
    invoice_email: "aayush@digichain.holdings",
    address: "Office 12, A3 Tower, Dubai Silicon Oasis, UAE",
    gstin: null,
    project_codes: [],
    recurring: [],
  },
  {
    id: "st",
    display_name: "Starknet Found.",
    legal_name: "Starknet Foundation",
    country: "CH",
    initials: "SF",
    color: "#ff9ad5",
    rate: 28,
    currency: "USD",
    sac: "998312",
    prefix: "STK",
    next: 13,
    terms: 14,
    swift_model: "client_bears",
    typical_swift: 0,
    bill_style: "company",
    contact: null,
    template: "detailed",
    invoice_email: "aayush@starknet.io",
    address: "Gotthardstrasse 26, 6300 Zug, Switzerland",
    project_codes: [{ id: "sp1", code: "STK-DEV-03", desc: "Core protocol contribution", rate: 28, active: true }],
    recurring: [],
  },
  {
    id: "wb",
    display_name: "Wavebreak",
    legal_name: "Wavebreak Labs, Inc.",
    country: "US",
    initials: "WB",
    color: "#f5c76a",
    rate: 22,
    currency: "USD",
    sac: "998312",
    prefix: "WBR",
    next: 35,
    terms: 30,
    swift_model: "recipient_bears",
    typical_swift: 35,
    bill_style: "company",
    contact: null,
    template: "detailed",
    invoice_email: "aayush@wavebreak.io",
    address: "548 Market St, San Francisco CA 94104, USA",
    project_codes: [
      { id: "wp1", code: "WBR-ENG-01", desc: "Platform engineering", rate: 22, active: true },
      { id: "wp2", code: "WBR-ENG-02", desc: "Data pipeline migration", rate: 24, active: true },
    ],
    recurring: [],
  },
];

export const invoices: Invoice[] = [
  {
    id: "i19",
    num: "INN0019",
    client: "nm",
    issue: "2026-03-31",
    period: "Mar 2026",
    currency: "USD",
    subtotal: 4234.3,
    total: 4234.0,
    status: "credited",
    stage: 4,
    lines: [
      { code: "STK-SDW-01", desc: "Starknet, software dev work", sac: "998312", hours: 92, rate: 19, amount: 1748 },
      { code: "NMI-BDV-01", desc: "Nethermind internal, backend dev", sac: "998312", hours: 80, rate: 19, amount: 1520 },
      {
        code: "STK-RES-02",
        desc: "Starknet research",
        sac: "998312",
        hours: 0,
        rate: null,
        amount: 985.3,
        adj: true,
        adjDesc: "Rate increase adjustment",
      },
    ],
    fx: { received: 4205, credited: 349850, mid: 83.45, rate: 83.2, spread: 0.3, intermediaryFee: 29, loss: 2418 },
    history: [
      { from: null, to: "draft", at: "2026-03-29T10:22:00" },
      { from: "draft", to: "sent", at: "2026-03-31T18:04:00" },
      { from: "sent", to: "approved", at: "2026-04-02T09:12:00" },
      { from: "approved", to: "transit", at: "2026-04-05T11:30:00" },
      { from: "transit", to: "credited", at: "2026-04-09T14:50:00" },
    ],
  },
  {
    id: "i8",
    num: "DCI0008",
    client: "dc",
    issue: "2026-04-02",
    period: "Apr 2026",
    currency: "USD",
    subtotal: 3708,
    total: 3708,
    status: "transit",
    stage: 3,
    lines: [
      { code: null, desc: "PROGRAMMING APR 16, 2025 - APR 30, 2025\nWORKED ON BIMA", sac: "998312", hours: 80, rate: null, amount: 3708 },
    ],
    history: [
      { from: null, to: "draft", at: "2026-04-01T18:00:00" },
      { from: "draft", to: "sent", at: "2026-04-02T09:00:00" },
      { from: "sent", to: "approved", at: "2026-04-03T10:15:00" },
      { from: "approved", to: "transit", at: "2026-04-07T12:00:00" },
    ],
  },
  {
    id: "i12",
    num: "STK0012",
    client: "st",
    issue: "2026-04-01",
    period: "Mar 2026",
    currency: "USD",
    subtotal: 2190,
    total: 2190,
    status: "sent",
    stage: 1,
    lines: [{ code: "STK-DEV-03", desc: "Core protocol contribution", sac: "998312", hours: 78, rate: 28, amount: 2184 }],
    history: [
      { from: null, to: "draft", at: "2026-03-31T19:12:00" },
      { from: "draft", to: "sent", at: "2026-04-01T10:00:00" },
    ],
  },
  {
    id: "i34",
    num: "WBR0034",
    client: "wb",
    issue: "2026-04-04",
    period: "Mar 2026",
    currency: "USD",
    subtotal: 4450,
    total: 4450,
    status: "approved",
    stage: 2,
    lines: [
      { code: "WBR-ENG-01", desc: "Platform engineering", sac: "998312", hours: 160, rate: 22, amount: 3520 },
      { code: "WBR-ENG-02", desc: "Data pipeline migration", sac: "998312", hours: 38.7, rate: 24, amount: 930 },
    ],
    history: [
      { from: null, to: "draft", at: "2026-04-03T16:00:00" },
      { from: "draft", to: "sent", at: "2026-04-04T10:30:00" },
      { from: "sent", to: "approved", at: "2026-04-06T14:00:00" },
    ],
  },
  {
    id: "i18",
    num: "INN0018",
    client: "nm",
    issue: "2026-02-28",
    period: "Feb 2026",
    currency: "USD",
    subtotal: 4120,
    total: 4120,
    status: "done",
    stage: 6,
    lines: [
      { code: "STK-SDW-01", desc: "Starknet, software dev work", sac: "998312", hours: 88, rate: 19, amount: 1672 },
      { code: "NMI-BDV-01", desc: "Nethermind internal, backend dev", sac: "998312", hours: 76, rate: 19, amount: 1444 },
      { code: null, desc: "Rate increase adjustment", sac: "998312", hours: 0, rate: null, amount: 985.3, adj: true },
    ],
    fx: { received: 4091, credited: 340200, mid: 83.2, rate: 83.15, spread: 0.06, intermediaryFee: 29, loss: 1890 },
    history: [],
  },
  {
    id: "i33",
    num: "WBR0033",
    client: "wb",
    issue: "2026-03-05",
    period: "Feb 2026",
    currency: "USD",
    subtotal: 3960,
    total: 3960,
    status: "done",
    stage: 6,
    lines: [{ code: "WBR-ENG-01", desc: "Platform engineering", sac: "998312", hours: 180, rate: 22, amount: 3960 }],
    history: [],
  },
];

export type RemitData = {
  stages: StageKey[];
  stageLabels: Record<StageKey, string>;
  stageColors: Record<StageKey, string>;
  clients: Client[];
  invoices: Invoice[];
};

export const REMIT: RemitData = { stages, stageLabels, stageColors, clients, invoices };
