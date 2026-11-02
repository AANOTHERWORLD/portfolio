import type { Metadata } from "next";
import Link from "next/link";
import { approachSteps, getApproachExamples, getProjectById, lenses } from "@/lib/content";
import { approachAi, approachHeading, approachIntro } from "@/content/approach";
import { getAsset } from "@/lib/content";
import Picture from "@/components/Picture";
import { lensHeading, lensIntro } from "@/content/lenses";

export const metadata: Metadata = {
  title: "Approach",
  description: "A recurring method: read the context, define the direction, connect the scales, guide the team, protect the intent.",
};

export default function ApproachPage() {
  return (
    <div className="wrap">
      <section className="page-head" aria-labelledby="approach-title">
        <p className="tag">Approach</p>
        <h1 id="approach-title" className="page-head__title">{approachHeading}</h1>
        <div className="prose">{approachIntro.map((p, i) => <p key={i} className={i === 0 ? "lede" : undefined}>{p}</p>)}</div>
      </section>

      <section className="section" aria-label="The five steps">
        <div className="steps">
          {approachSteps.map((step) => {
            const examples = getApproachExamples(step.id);
            const evidence: Record<string, [string, string]> = {
              "read-the-context": ["lsd-running", "lsd-workshop"],
              "define-the-direction": ["lsd-running", "lsd-final-axon"],
              "connect-the-scales": ["google-gso-home-of-the-internet", "gso-university-prompt-cards"],
              "guide-the-team": ["watt-plaza", "watt-extension-markup"],
              "protect-the-intent": ["kilroy-oyster-point", "kilroy-photo-atrium"],
            };
            const [projectId, assetId] = evidence[step.id];
            const lead = getProjectById(projectId);
            const leadImage = lead ? getAsset(lead, assetId) : null;
            return (
              <div className="step" key={step.id} id={step.id}>
                <div>
                  <p className="step__number">{String(step.number).padStart(2, "0")}</p>
                  <h2 className="step__title">{step.title}</h2>
                </div>
                <div>
                  <p className="step__summary">{step.summary}</p>
                  {leadImage && lead && (
                    <Link href={`/work/${lead.project.slug}/`} className="step__image">
                      <Picture asset={leadImage} showCaption={false} sizes="(min-width: 900px) 40vw, 100vw" />
                      <span className="tag">See it in {lead.project.title}</span>
                    </Link>
                  )}
                  {examples.length > 0 && (
                    <ul className="step__examples">
                      {examples.map(({ example, project }) => (
                        <li key={`${step.id}-${project.project.id}`}>
                          {example.example}
                          <Link href={`/work/${project.project.slug}/`}>{project.project.title}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section" aria-labelledby="ai-title">
        <div className="grid-2">
          <div><p className="tag">Tools</p><h2 id="ai-title" className="section__title">{approachAi.heading}</h2></div>
          <div className="prose">
            <p>{approachAi.body}</p>
            {getProjectById(approachAi.projectId) && (
              <p><Link href={`/work/${getProjectById(approachAi.projectId)!.project.slug}/`} className="text-link" data-sweep>See the Watt Plaza study</Link></p>
            )}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="lenses-title">
        <p className="tag">The four lenses</p>
        <h2 id="lenses-title" className="section__title">{lensHeading}</h2>
        <p className="lede">{lensIntro}</p>
        <div className="lens-framework">
          {lenses.map((lens) => (
            <div className="lens-framework__item" key={lens.id}>
              <h3><span className="lens-key__dot" aria-hidden="true" />{lens.name}</h3>
              <p>{lens.role}</p>
              <p className="tag">{lens.question}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
