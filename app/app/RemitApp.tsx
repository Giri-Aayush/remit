"use client";

import { useCallback, useEffect, useState } from "react";
import "./app.css";

import { REMIT, stages, stageLabels, type StageKey } from "./data";
import { useToasts, type NavFn } from "./shared";
import Sidebar from "./Sidebar";
import CommandPalette from "./CommandPalette";
import FxCreditModal, { type FxPayload } from "./FxCreditModal";
import Dashboard from "./screens/Dashboard";
import InvoiceList from "./screens/InvoiceList";
import InvoiceDetail from "./screens/InvoiceDetail";
import CreateInvoice from "./screens/CreateInvoice";
import { ClientList, ClientDetail } from "./screens/Clients";
import Import from "./screens/Import";
import Settings from "./screens/Settings";

type Route =
  | "dashboard"
  | "invoices"
  | "invoice"
  | "create"
  | "clients"
  | "client"
  | "import"
  | "settings";

export default function RemitApp() {
  const [route, setRoute] = useState<Route>("dashboard");
  const [params, setParams] = useState<{ id?: string; clientId?: string }>({});
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [fxInvoice, setFxInvoice] = useState<string | null>(null);
  const [, forceRefresh] = useState(0);
  const { push: pushToast, ToastHost } = useToasts();

  const nav: NavFn = useCallback((r, p = {}) => {
    setRoute(r as Route);
    setParams(p as { id?: string; clientId?: string });
  }, []);
  const onOpenInvoice = useCallback((id: string) => {
    setRoute("invoice");
    setParams({ id });
  }, []);
  const onOpenClient = useCallback((id: string) => {
    setRoute("client");
    setParams({ id });
  }, []);
  const openFx = useCallback((id: string) => setFxInvoice(id), []);

  const advanceStage = useCallback(
    (invId: string) => {
      const inv = REMIT.invoices.find((i) => i.id === invId);
      if (!inv) return;
      inv.stage = Math.min(6, inv.stage + 1);
      inv.status = stages[inv.stage] as StageKey;
      pushToast(`${inv.num} → ${stageLabels[inv.status]}`, { icon: "✓" });
      forceRefresh((x) => x + 1);
    },
    [pushToast]
  );

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "n") {
        e.preventDefault();
        nav("create");
      }
      if (e.key === "g" && !e.metaKey && !e.ctrlKey) {
        const h = (e2: KeyboardEvent) => {
          if (e2.key === "d") nav("dashboard");
          if (e2.key === "i") nav("invoices");
          if (e2.key === "c") nav("clients");
          if (e2.key === "s") nav("settings");
          window.removeEventListener("keydown", h);
        };
        setTimeout(() => window.addEventListener("keydown", h, { once: true }), 0);
      }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [nav]);

  const onFxConfirm = useCallback(
    (data: FxPayload) => {
      const inv = REMIT.invoices.find((i) => i.id === fxInvoice);
      if (inv) {
        inv.fx = {
          received: parseFloat(data.received),
          credited: parseFloat(data.credited),
          mid: 83.45,
          rate: parseFloat(data.rate),
          spread: parseFloat(data.spread),
          loss: Math.round(data.loss),
          intermediaryFee: 0,
        };
        inv.stage = 4;
        inv.status = "credited";
      }
      pushToast("Credit recorded · FX captured", { icon: "✓" });
      setFxInvoice(null);
      forceRefresh((x) => x + 1);
    },
    [fxInvoice, pushToast]
  );

  let screen = null;
  if (route === "dashboard")
    screen = <Dashboard nav={nav} onOpenClient={onOpenClient} onOpenInvoice={onOpenInvoice} />;
  else if (route === "invoices")
    screen = <InvoiceList nav={nav} onOpenInvoice={onOpenInvoice} />;
  else if (route === "invoice" && params.id)
    screen = (
      <InvoiceDetail
        invoiceId={params.id}
        nav={nav}
        advanceStage={advanceStage}
        openFxModal={openFx}
      />
    );
  else if (route === "create")
    screen = (
      <CreateInvoice
        nav={nav}
        presetClient={
          params.clientId
            ? REMIT.clients.find((c) => c.id === params.clientId) || null
            : null
        }
        onCreated={(data) => {
          pushToast(`Saved as ${data.status}`, {
            icon: "✓",
            action: { label: "Undo", onClick: () => {} },
          });
          nav("invoices");
        }}
      />
    );
  else if (route === "clients")
    screen = <ClientList nav={nav} onOpenClient={onOpenClient} />;
  else if (route === "client" && params.id)
    screen = (
      <ClientDetail clientId={params.id} nav={nav} onOpenInvoice={onOpenInvoice} />
    );
  else if (route === "import") screen = <Import nav={nav} />;
  else if (route === "settings") screen = <Settings />;

  return (
    <div className="remit-app">
      <div className="app-shell">
        <Sidebar route={route} nav={nav} openPalette={() => setPaletteOpen(true)} />
        <main className="app-main">{screen}</main>
      </div>
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        nav={nav}
        onOpenInvoice={onOpenInvoice}
        onOpenClient={onOpenClient}
      />
      <FxCreditModal
        open={!!fxInvoice}
        invoiceId={fxInvoice}
        onClose={() => setFxInvoice(null)}
        onConfirm={onFxConfirm}
      />
      <ToastHost />
    </div>
  );
}
