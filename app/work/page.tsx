import type { Metadata } from "next";
import { getWorkGroups } from "@/lib/content";
import { editorial } from "@/content/editorial";
import WorkTile from "@/components/WorkTile";
import WorkBrowser from "@/components/WorkBrowser";
export const metadata: Metadata = { title: "Work", description: "Selected work across brand, spatial, experiential and hospitality design." };
export default function WorkPage() {
  const { selected, further } = getWorkGroups();
  const entries = [...selected, ...further].map((bundle, index) => ({ id: bundle.project.id, selected: index < selected.length, fields: editorial[bundle.project.id].fields, card: <WorkTile bundle={bundle} index={index} /> }));
  return <div className="wrap"><header className="page-head work-page-head"><p className="tag">Portfolio</p><h1 className="page-head__title">Work</h1><p className="lede">Spaces, identities and experiences shaped by a shared creative direction.</p></header><WorkBrowser entries={entries} /></div>;
}
