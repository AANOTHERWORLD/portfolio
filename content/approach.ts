import type { ApproachExample, ApproachStep } from "./types";

export const approachSteps: ApproachStep[] = [
  {
    id: "read-the-context",
    number: 1,
    title: "Read the Context",
    summary: "Understand people, culture, client ambition, and constraints before defining form.",
  },
  {
    id: "define-the-direction",
    number: 2,
    title: "Define the Direction",
    summary: "Establish a clear idea and decision criteria strong enough to guide or reject options.",
  },
  {
    id: "connect-the-scales",
    number: 3,
    title: "Connect the Scales",
    summary: "Translate the idea across architecture, interior environments, brand, behavior, and detail.",
  },
  {
    id: "guide-the-team",
    number: 4,
    title: "Guide the Team",
    summary: "Give specialists shared criteria and room to contribute.",
  },
  {
    id: "protect-the-intent",
    number: 5,
    title: "Protect the Intent",
    summary: "Navigate delivery pressures without losing the defining creative idea.",
  },
];

export const approachHeading = "Creative Direction as a Practice";
export const approachIntro = [
  "My practice connects understanding the brief with directing the work. I establish a clear idea, give teams criteria for developing it, and guide decisions as the project moves across disciplines and into delivery. Five practices shape that process.",
];
// Short statements shown under a step, keyed by step id.
export const approachStatements: Record<string, string> = {
  "guide-the-team": "Shared criteria give people the confidence and responsibility to make good decisions together.",
  "protect-the-intent": "A strong direction gives the team a basis for adapting to budget, schedule and technical constraints while preserving the intended experience.",
};

export const approachAi = {
  heading: "AI and design judgment",
  body: "I use AI-assisted visualization to explore alternatives and make early choices easier to discuss. The value lies in the design judgment around it: defining the question, selecting references, evaluating outputs, and translating promising directions into work the team can test and develop.",
  projectId: "watt-plaza",
};

export const approachExamples: ApproachExample[] = [
  {
    "step": "read-the-context",
    "projectId": "tinder-hq",
    "example": "Cultural discovery identified different ways people connect, giving the workplace a basis in behavior."
  },
  {
    "step": "read-the-context",
    "projectId": "intuit-turbotax-retail",
    "example": "For TurboTax, the experience of receiving help became a basis for design decisions: a visible welcome, thoughtful intake and protected conversations."
  },
  {
    "step": "define-the-direction",
    "projectId": "lsd-running",
    "example": "Five schemes were synthesized around shared criteria for curation, craft and expertise, and transparency."
  },
  {
    "step": "define-the-direction",
    "projectId": "watt-plaza",
    "example": "Distinct positions connected the property to neighborhood life, tenant hospitality or retail activity, giving the client alternatives to evaluate."
  },
  {
    "step": "connect-the-scales",
    "projectId": "google-gso-home-of-the-internet",
    "example": "One direction connects recruitment messaging, continued education, GSO's first learning space, and tools for operators and facilitators."
  },
  {
    "step": "connect-the-scales",
    "projectId": "google-room-98",
    "example": "Naming, architecture and program shape a visitor sequence from audience to participant."
  },
  {
    "step": "guide-the-team",
    "projectId": "openai",
    "example": "Shared hospitality criteria guided the team's response to client feedback while giving Bellevue and Tokyo distinct local expressions."
  },
  {
    "step": "guide-the-team",
    "projectId": "watt-plaza",
    "example": "Sketches and critique guided the NY and LA teams as a shared Weave workflow supported exploration."
  },
  {
    "step": "protect-the-intent",
    "projectId": "tinder-hq",
    "example": "When work became distributed, I led a redesign around team working styles while keeping connection as the organizing idea."
  },
  {
    "step": "protect-the-intent",
    "projectId": "kilroy-oyster-point",
    "example": "A coastal direction guided materials, furnishings and indoor-outdoor relationships through development and construction."
  }
];
