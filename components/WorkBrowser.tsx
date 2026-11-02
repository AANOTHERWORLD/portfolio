"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import type { Field } from "@/content/editorial";

type Entry = { id: string; selected: boolean; fields: Field[]; card: ReactNode };
const fields: Field[] = ["Brand", "Spatial", "Experiential", "Hospitality"];

export default function WorkBrowser({ entries }: { entries: Entry[] }) {
  const [active, setActive] = useState<Field | "All">("All");
  const visible = entries.filter((entry) => active === "All" || entry.fields.includes(active));
  return <>
    <div className="field-filter" aria-label="Explore work by discipline">
      {(["All", ...fields] as const).map((field) => <button key={field} type="button" aria-pressed={active === field} onClick={() => setActive(field)}>{field}</button>)}
    </div>
    <p className="tag" role="status" aria-live="polite">{visible.length} {visible.length === 1 ? "project" : "projects"}{active !== "All" ? ` in ${active.toLowerCase()}` : " across disciplines"}</p>
    {[true, false].map((selected) => {
      const group = visible.filter((entry) => entry.selected === selected);
      if (!group.length) return null;
      const heading = selected ? "Selected projects" : "Further work";
      return <section key={heading} aria-label={heading}><h2 className="work-group__title">{heading}</h2><ol className="work-grid">{group.map((entry) => <li key={entry.id}>{entry.card}</li>)}</ol></section>;
    })}
  </>;
}
