import type { Metadata } from "next";
import RemitApp from "./RemitApp";

export const metadata: Metadata = {
  title: "Remit — App",
};

export default function AppPage() {
  return <RemitApp />;
}
