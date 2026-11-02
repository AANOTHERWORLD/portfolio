import Link from "next/link";
import type { ProjectBundle } from "@/content/types";
import { getIndexAsset } from "@/lib/content";
import { editorial } from "@/content/editorial";
import Picture from "./Picture";
import { STATUS_LABEL } from "./WorkCard";
export default function WorkTile({ bundle, index }: { bundle: ProjectBundle; index: number }) {
  const { project } = bundle;
  const asset = getIndexAsset(bundle);
  return <article className="curated-tile"><Link href={`/work/${project.slug}/`}>
    <div className="curated-tile__media">{asset && <Picture asset={asset} showCaption={false} fit="cover" sizes="(min-width: 1100px) 33vw, (min-width: 720px) 50vw, 100vw" priority={index < 3} />}</div>
    <div className="curated-tile__copy"><p className="tag">{editorial[project.id].fields.join(" / ")}</p><h3>{project.title}</h3><p>{project.thesis}</p><p className="curated-tile__role">{project.role} · {STATUS_LABEL[project.status]}</p></div>
  </Link></article>;
}
