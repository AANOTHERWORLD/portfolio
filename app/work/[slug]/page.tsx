import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProject, getWorkOrder, getAsset, getHeroAsset, getIndexAsset, getClaims } from "@/lib/content";
import { editorial } from "@/content/editorial";
import Picture from "@/components/Picture";
import DraftBadge from "@/components/DraftBadge";
import { STATUS_LABEL } from "@/components/WorkCard";

export const dynamicParams = false;
export function generateStaticParams() { return getAllProjectSlugs().map((slug) => ({ slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const bundle = getProject((await params).slug);
  return bundle ? { title: bundle.project.title, description: bundle.project.thesis } : {};
}

export default async function ProjectPage({ params }: Props) {
  const bundle = getProject((await params).slug);
  if (!bundle) notFound();
  const { project, narrative } = bundle;
  const edit = editorial[project.id];
  if (!edit) throw new Error(`Missing editorial sequence: ${project.id}`);
  const hero = getHeroAsset(bundle);
  const status = edit.status ?? `${STATUS_LABEL[project.status]}${project.statusNote ? `. ${project.statusNote}` : ""}`;
  const list = getWorkOrder();
  const position = list.findIndex((b) => b.project.id === project.id);
  const next = list[(position + 1) % list.length];
  const nextAsset = getIndexAsset(next);
  const publication = narrative.featuredPublication;
  const claims = ["context", "leadership", "outcome", "credits"].flatMap((placement) => getClaims(bundle, placement as "context" | "leadership" | "outcome" | "credits"));
  const used = new Set([project.heroAssetId]);
  for (const section of edit.chapters) for (const id of section.assets) {
    if (used.has(id)) throw new Error(`${project.id}: repeated curated image ${id}`);
    if (!bundle.assets.some((a) => a.id === id)) throw new Error(`${project.id}: missing curated image ${id}`);
    used.add(id);
  }
  return (
    <article className="wrap editorial-project">
      <header className={`editorial-opening${edit.banner ? " editorial-opening--banner" : ""}`}>
        <div className="editorial-opening__text">
          <p className="tag editorial-meta"><span>{project.typeLabel}</span><span>{project.years}</span></p>
          {project.permission === "pending" && <DraftBadge note={project.permissionNote} />}
          <h1 className="project-hero__title">{project.title}</h1>
          <p className="project-hero__thesis">{edit.thesis}</p>
          <dl className="project-opening__facts">
            <div><dt>Role</dt><dd>{project.role}</dd></div>
            <div><dt>Status</dt><dd>{status}</dd></div>
          </dl>
        </div>
        <div className="editorial-opening__media">{hero && <Picture asset={hero} priority sizes={edit.banner ? "100vw" : "(min-width: 900px) 52vw, 100vw"} />}</div>
      </header>
      <section className="editorial-brief" aria-labelledby="brief">
        <h2 id="brief" className="tag">The brief</h2>
        <p className="lede">{edit.intro}</p>
        <nav className="chapter-nav" aria-label="Project chapters">
          {edit.chapters.map((chapter, i) => <a key={chapter.title} href={`#chapter-${i + 1}`}>{chapter.title}</a>)}
        </nav>
      </section>
      {edit.chapters.map((chapter, i) => (
        <section className="editorial-chapter" id={`chapter-${i + 1}`} aria-labelledby={`chapter-heading-${i + 1}`} key={chapter.title}>
          <div className="editorial-chapter__intro">
            <h2 id={`chapter-heading-${i + 1}`} className="section__title">{chapter.title}</h2>
            <div className="prose">{chapter.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
          </div>
          <div className="editorial-gallery">
            {chapter.assets.map((id) => {
              const asset = getAsset(bundle, id);
              return asset ? <Picture key={id} asset={asset} sizes="(min-width: 800px) 50vw, 100vw" /> : null;
            })}
          </div>
        </section>
      ))}
      {edit.related && <p className="editorial-related"><Link href={`/work/${edit.related.slug}/`} className="text-link">{edit.related.text}</Link></p>}
      <section className="editorial-contribution" aria-labelledby="contribution">
        <div>
          <h2 id="contribution" className="section__title">Contribution and outcome</h2>
          <div className="prose"><p>{narrative.involvement}</p>{edit.outcome ? <p>{edit.outcome}</p> : narrative.outcome.map((p) => <p key={p}>{p}</p>)}</div>
          {claims.length > 0 && <ul className="claims">{claims.map((claim) => <li key={claim.id}>{claim.wording}{claim.status === "awaiting" && <span className="draft-marker">Awaiting verification</span>}</li>)}</ul>}
          {publication && <p className="editorial-press"><span className="tag">Selected press</span><a href={publication.url} className="text-link">{publication.title}</a></p>}
        </div>
        <dl className="credits editorial-credits">
          {project.location && <div><dt>Location</dt><dd>{project.location}</dd></div>}
          <div><dt>Practice</dt><dd>{project.practice}</dd></div>
          {project.scope && <div><dt>Scope</dt><dd>{project.scope}</dd></div>}
          {project.team.length > 0 && <div><dt>Team</dt><dd>{project.team.join(", ")}</dd></div>}
          {project.collaborators.length > 0 && <div><dt>Collaborators</dt><dd>{project.collaborators.join("; ")}</dd></div>}
          {(narrative.photographyCredit || narrative.imageCredit) && <div><dt>Imagery</dt><dd>{[narrative.photographyCredit, narrative.imageCredit].filter(Boolean).join(" ")}</dd></div>}
        </dl>
      </section>
      <nav className="editorial-next" aria-label="More projects">
        <Link href={`/work/${next.project.slug}/`}>
          {nextAsset && <Picture asset={nextAsset} showCaption={false} sizes="(min-width: 800px) 30vw, 100vw" />}
          <span className="tag">Next project</span><h2 className="section__title">{next.project.title}</h2><p>{next.project.thesis}</p>
        </Link>
        <Link href="/work/" className="text-link">All work</Link>
      </nav>
    </article>
  );
}
