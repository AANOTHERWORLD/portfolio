// Curated public sequences. Original project records retain the complete asset archive.
export type Field = "Brand" | "Spatial" | "Experiential" | "Hospitality";
export interface Chapter { title: string; paragraphs: string[]; assets: string[] }
export interface Editorial {
  thesis: string;
  fields: Field[];
  hero?: string;
  banner?: boolean;
  index?: string;
  intro: string;
  chapters: Chapter[];
  outcome?: string;
  status?: string;
  related?: { slug: string; text: string };
}
const chapter = (title: string, paragraphs: string[], assets: string[]): Chapter => ({ title, paragraphs, assets });
export const editorial: Record<string, Editorial> = {
  "metropolis": {
  "thesis": "A workplace for what comes next",
  "fields": [
    "Spatial",
    "Hospitality"
  ],
  "hero": "metropolis-002",
  "index": "metropolis-002",
  "intro": "Metropolis’s Santa Monica workplace translates an evolving technology company into a welcoming, tangible experience. Hospitality, social space and quieter settings give employees and guests different ways to engage with the company and one another.",
  "chapters": [
    {
      "title": "Make a changing company tangible",
      "paragraphs": [
        "The brief called for a workplace that could express Metropolis’s expansion beyond parking while conveying the confidence of an established organization. Discovery explored how a fixed environment could support a business still evolving, bringing technological ambition together with human comfort."
      ],
      "assets": [
        "metropolis-011",
        "metropolis-030"
      ]
    },
    {
      "title": "Give people a reason to gather",
      "paragraphs": [
        "The design direction developed toward a hospitality-led workplace, with settings that allow people to choose how they work and connect. In the completed shared spaces, lounge seating, communal tables and banquettes create a range of scales for conversation, framed by daylight and views toward the coast."
      ],
      "assets": [
        "metropolis-023",
        "metropolis-019",
        "metropolis-026"
      ]
    },
    {
      "title": "Make room for discovery",
      "paragraphs": [
        "A more intimate speakeasy introduces a distinct social setting within the workplace. Curved seating, warm color and concealed lighting shift the atmosphere from the open, daylit commons. Together, these environments express the project’s ambition through the experience of moving between spaces."
      ],
      "assets": [
        "metropolis-027",
        "metropolis-017"
      ]
    }
  ]
},
  "lsd-running": {
    thesis: "A running brand expressed through identity, a first store and product imagery.",
    fields: ["Brand", "Spatial"], hero: "lsd-photo-bench-wide", index: "lsd-product-run-1",
    intro: "LSD Running's first store in Echo Park needed to sell technical products, conceal a substantial shoe inventory and make room for a running community. An on-site workshop established three criteria for the work: curation, craft and expertise, and transparency.",
    chapters: [
      chapter("One language, from the mark to the image", ["The identity, store and product imagery developed together. Metal, stone and the precision of technical equipment gave the brand a physical vocabulary that could also frame a shoe or a runner."], ["lsd-video-30s-wordmark", "lsd-product-boulder"]),
      chapter("Synthesize the strongest answers", ["I led the workshop and a five-scheme exploration with the Rapt team. The final direction combined concealed perimeter storage from Functional, convertible modules from Communal, landscape from Experiential and the restraint of Minimal.", "The axonometric records the proposed organization. Built photographs show the executed metal wall, slatted platform and curved bench; the concept studies are not presented as photographs of the completed store."], ["lsd-workshop", "lsd-final-axon", "lsd-photo-bench-arc"]),
      chapter("Let the space direct the imagery", ["Stone supports and metal surfaces became settings for art-directed product and lifestyle photography. The same language carries from a place to sit or test a shoe into images seen beyond the store."], ["lsd-product-run-1", "lsd-product-grid-1", "lsd-video-06s-interior"]),
    ],
  },
  "google-gso-home-of-the-internet": {
    thesis: "A shared platform for the people who power the internet.", fields: ["Brand", "Spatial", "Experiential"], hero: "gso-steam-lab", index: "gso-steam-lab",
    intro: "Google Global Server Operations needed a clearer voice for prospective employees and a shared foundation for continued learning. I led creative direction with the Rapt team across recruitment, education, the organization's first physical learning space, and tools for operators and facilitators.",
    chapters: [
      chapter("Recruit: make the opportunity visible", ["Home of the Internet connects global infrastructure with the communities and people behind it. A common graphic language carries employer messaging across campaigns, recruitment materials and digital applications."], ["gso-campaign-home", "gso-campaign-careers", "gso-recruitment-brochure", "gso-recruitment-phone", "gso-website-walkthrough"]),
      chapter("Learn: give the strategy a place", ["The education strategy connects recruitment, onboarding, professional development and advancement. At GSO University, arrival, group learning, workshops and breaks become a spatial sequence, with places to gather between sessions."], ["gso-university-space", "gso-audience-journey", "gso-university-shared-journey", "gso-university-space-documentation"]),
      chapter("Facilitate: put the direction in people's hands", ["Prompt cards and shared resources help teams host the experience. Their graphic language belongs to the same system as the communications and environment. Field of Dreams, the proposed STEAM Lab kit and a data center on wheels demonstration vehicle extend the learning work into other settings."], ["gso-university-prompt-cards", "gso-field-of-dreams", "gso-data-center-on-wheels"]),
    ],
    outcome: "The brand platform was delivered, with applications across recruitment collateral, careers content, learning environments and internal playbooks. Further program and environment work continued through 2026. Photographs document the learning space; proposed applications remain labeled as concepts.",
  },
  "tinder-hq": {
    thesis: "A headquarters organized around the ways people connect.", fields: ["Spatial", "Brand"], hero: "tinder-social-film", banner: true,
    intro: "Interviews and workshops established a gradient of connection, from casual encounters to more focused conversation. Familiar settings from city life gave each form of connection a place within the headquarters, while a restrained workplace framework left room for employees' own expression.",
    chapters: [
      chapter("Give connection different settings", ["A cafe supports people watching, an arcade invites play, a gallery makes sharing work visible and a speakeasy offers a more intimate setting. The Library's communal table supports quiet company. Each setting translates the same idea into a different social behavior."], ["tinder-07", "tinder-11", "tinder-20", "tinder-24"]),
      chapter("Adapt the plan as work changes", ["When Tinder moved toward a distributed workforce in 2020, I led a redesign around team working styles. The team tested six new space typologies and added four collaboration spaces. Mobile furniture and a pared-back work-floor framework kept the workplace open to change."], ["tinder-06", "tinder-15"]),
      chapter("Direct how the place is seen", ["I also authored the photography direction: familiar, populated spaces and details that reinforce the project story. People, shared activities and recognizable brand moments make the experience legible beyond the building."], ["tinder-13", "tinder-29", "tinder-26"]),
    ], outcome: "Completed in 2022. The work spans discovery, concept, interiors and environmental graphics, the distributed-work redesign, and photography direction.",
  },
  "google-room-98": {
    thesis: "An executive briefing becomes a working session.", fields: ["Experiential", "Spatial", "Brand"],
    intro: "Google's 4,000-square-foot Los Angeles center brings naming, architecture and program into one visitor journey. Theater provides the organizing idea: guests begin as an audience, then cross the stage to become participants.",
    chapters: [
      chapter("Establish a destination and a sequence", ["The Room 98 identity marks the threshold. Presentation, Collaboration and Deliberation spaces follow a program arc from disorientation to exploration and adaptation. Naming and program guidelines developed alongside the architecture."], ["room98-photo-logo-wall", "room98-plan-floor", "room98-photo-presentation-audience"]),
      chapter("Turn the stage into a threshold", ["The presentation screen splits open to reveal the space beyond. Guests pass through what had been the stage, shifting from receiving information to working through it together."], ["room98-motion-presentation", "room98-photo-screen-reveal"]),
      chapter("Let people investigate together", ["Interactive tables support small-group exploration. In the Deliberation Room, projection brings information to the floor while participants remain oriented toward one another. Swiveling seats, adjustable tables and changing light support different working postures."], ["room98-photo-collaboration-table", "room98-photo-table-touch", "room98-photo-deliberation-floor", "room98-photo-deliberation-conversation"]),
    ],
  },
  "intuit-turbotax-retail": {
    thesis: "Make help feel human.", fields: ["Spatial", "Experiential", "Brand"],
    intro: "TurboTax's physical environments aim to make asking for financial help feel comfortable. I led the Rapt team's experience direction, retail environment designs and Store Bible structure, connecting repeatable formats with flagship concepts. The examples here focus on Chicago and Santa Monica within the wider flagship engagement.",
    chapters: [
      chapter("1. Make care consistent across formats", ["Wave 1 findings identified acoustic crossover, difficult intake, obscured concierge sightlines and insufficient staff support space. Wave 2 responds with a visible welcome, seated intake, protected documents and increasing privacy.", "The smallest format prioritizes service flow over a separate small-business lounge. Discovery becomes a distributed merchandising function. Back-of-house and overflow planning respond to peak occupancy, while shared screens give customer and expert a common focus."], ["intuit-hero-grid", "intuit-retail-plan", "intuit-consultation-room"]),
      chapter("2. Chicago: draw people toward a shared Forum", ["At Tribune Tower, the existing interior, historic facade and plaza framed the visitor journey. Sketches tested scale, planting and shared seating before the Forum and consultation plan developed. Limited daylight and ceiling constraints made overhead treatment central to the room's atmosphere."], ["intuit-chicago-existing", "intuit-chicago-early-sketch", "intuit-chicago-forum", "intuit-chicago-plan"]),
      chapter("3. Santa Monica: extend the life of the Promenade", ["Hospitality, learning and consultation share the flagship environment. Open settings offer ways to engage before a formal appointment, while protected rooms support personal conversations.", "A discovery interaction explores how physical controls, a printed takeaway and phone sharing could connect an encounter in the space with the next step beyond it."], ["intuit-concierge-deck", "intuit-sm-bar", "intuit-discovery-storyboard", "intuit-sm-filing"]),
    ],
  },
  "kilroy-oyster-point": {
    thesis: "A coastal food hall and shared amenities for everyday campus life.", fields: ["Spatial", "Hospitality"], hero: "kilroy-photo-amphitheatre-overhead", index: "kilroy-photo-amphitheatre-overhead",
    intro: "A waterfront life-science campus needed shared places for dining, gathering and retreat. I directed Rapt's interiors and furnishings through development and construction. This selection focuses on the food hall and its adjacent hospitality settings within the broader amenity scope.",
    chapters: [
      chapter("Connect the campus walk with the interior", ["The bay, marina and shoreline ecology informed a common direction across the interiors and landscape. Tall glazing connects the food hall to the amphitheater and outdoor dining. DGA designed the buildings; Field Operations designed the landscape."], ["kilroy-photo-campus-terrace", "kilroy-photo-dining-display", "kilroy-photo-atrium"]),
      chapter("Make room for dining and retreat", ["The cafe, private dining room and mezzanine lounge provide distinct settings across the day. A suspended fireplace and quieter seating give the upper level a different pace from the food hall below."], ["kilroy-photo-cafe", "kilroy-photo-dining-room", "kilroy-photo-mezzanine-lounge"]),
      chapter("Carry the coastal direction into the details", ["Oak and hand-cut tile establish a durable base. Upholstery, art and figured timber bring a more intimate scale to the shared campus spaces."], ["kilroy-photo-atrium-material", "kilroy-photo-art-seating"]),
    ],
  },
  "openai": {
    thesis: "One hospitality approach, interpreted for Bellevue and Tokyo.", fields: ["Spatial", "Hospitality"],
    intro: "Bellevue supports the Applied team in the Pacific Northwest; Tokyo hosts a team with a strong client-facing role. I developed the early concept with August Petersen and David Michon, then guided the Rapt team through client feedback and design development. The wider team and local partners carried the work into later phases.",
    status: "Bellevue: floors 16 and 17 built; floors 15 and 18 in development. Tokyo: completed.",
    chapters: [
      chapter("Bellevue: develop atmosphere alongside the plan", ["Materials, furniture, art and planting entered the design conversation early. Pacific Northwest forests and coastline informed a layered workplace with settings for focused work, gathering and retreat. Developing these elements together gave the team a shared reference as the plan evolved."], ["openai-bellevue-reception", "openai-bellevue-cafe-people", "openai-bellevue-brown-couch", "openai-bellevue-library", "openai-bellevue-teamroom"]),
      chapter("Tokyo: concentrate change where people experience it", ["The interim office retained much of its existing fit-out and systems within an accelerated twelve-month schedule. Furniture, finishes and targeted architectural changes focused the effort on how people arrive, meet and work.", "The anticipation of omotenashi meets Californian ease through a restrained welcome, informal hosting spaces, a library and shared pantry. These settings translate the common hospitality approach into a different local expression."], ["openai-tokyo-1666", "openai-tokyo-1661", "openai-tokyo-1627", "openai-tokyo-1733", "openai-tokyo-1717"]),
    ],
  },
  "watt-plaza": {
    thesis: "Three possible futures for a Century City office address.", fields: ["Spatial"],
    intro: "A plaza upgrade expanded into a question about the property's future. I led concept and design strategy with the New York and Los Angeles teams, developing alternatives for client discussion before committing to a single direction. All views are unbuilt studies.",
    chapters: [
      chapter("Compare relationships with the city", ["Departure proposes an outward, civic address with landscape connections and shared public life. Extension concentrates on tenant hospitality and a vertical sequence of amenities. Expansion tests retail and dining at the base with tenant amenities above."], ["watt-extension-aerial", "watt-expansion-aerial", "watt-departure-arrival"]),
      chapter("Keep drawing in the loop", ["Sketches and site information guided the shared Weave workflow. On the Extension study, redlines locate the arrival, accessible ramp, landscape and glass atrium. The markups make design feedback specific; generated views remain concept visualizations rather than construction evidence."], ["watt-early-sketches", "watt-extension-markup", "watt-extension-arrival"]),
      chapter("Test the scope of intervention", ["Reduced-scope studies connect the larger ideas back to access, amenities and daily use. The alternatives make different levels of change available for discussion."], ["watt-earlier-plan", "watt-extension-reduced"]),
    ],
  },
  "google-tokyo-partner-plex": {
    thesis: "A transition from Shibuya's energy to a place for exchange.", fields: ["Experiential", "Spatial", "Hospitality"], hero: "ppx-03", index: "ppx-03",
    intro: "Above Shibuya, Google's Partner Plex hosts business partners through immersive environments, hospitality and curated content. The water concept gives arrival, interiors and environmental graphics a shared language of transition.",
    chapters: [
      chapter("Stage the arrival", ["Timber doors and a curved, compressed corridor prepare guests for the host lobby reveal. Suspended forms and a still pool establish a different pace from the crossing below."], ["ppx-01", "ppx-02", "ppx-10", "ppx-04"]),
      chapter("Carry the concept into rooms and wayfinding", ["Clouds, ripples and deltas informed different spatial settings. Room names such as Aurora, Midnight, High Noon and Lakeshore draw on a broader landscape, sky and time vocabulary, carried in relief signage. Immersive light gives another room its own atmosphere."], ["ppx-16", "ppx-23", "ppx-09"]),
    ], outcome: "Completed partner experience center. My contribution covered the experience concept and its expression in interiors and graphics, from early development through delivery with the Rapt team.",
  },
  "lightspark": {
    thesis: "A workplace identity built into spaces for focus and exchange.", fields: ["Spatial", "Brand"],
    intro: "Beneath exposed timber trusses, shared tables, a library alcove, lounge settings and a kitchen give everyday activities distinct places. I led the design with the Rapt Studio team across workplace interiors and brand expression.",
    chapters: [chapter("Identity in daily use", ["Collected objects, the illuminated company mark and a typographic light fixture bring identity into the settings people use. Dark millwork and the stair organize the larger floor while smaller spaces offer places to pause or meet."], ["lightspark-02", "lightspark-06", "lightspark-03", "lightspark-05", "lightspark-04"])],
    outcome: "Completed workplace interiors and brand expression, 2025.",
  },
  "mama-rouge": {
    thesis: "A restaurant interior unified by red lacquer, pattern and warm light.", fields: ["Spatial", "Hospitality"],
    intro: "Mama Rouge connects dining rooms, bar and circulation through color, pattern and light. I contributed to the restaurant design as a Designer at Collective Architecture.",
    chapters: [chapter("Carry the atmosphere beyond the table", ["Patterned banquettes and warm timber balance the red lacquer. A golden fiber chandelier focuses the dining room, while ornamental screens, a mirrored bar and colored corridor lighting extend its character."], ["mama-rouge-02", "mama-rouge-05", "mama-rouge-06", "mama-rouge-10"])],
    outcome: "Completed restaurant interiors, 2016.",
  },
  "april-jean": {
    thesis: "A neighborhood bar identity, from the street sign to the last round.", fields: ["Brand", "Hospitality"], hero: "april-jean-01", index: "april-jean-01",
    intro: "A flowing script, rust red and deep green palette, and cocktail collages connect April Jean's street presence with its menus and digital communication. I led the Rapt team's design across the identity and its applications.",
    chapters: [chapter("One graphic language across the visit", ["The wordmark and illustration establish the identity. Projecting signage introduces it at the street; printed menus carry it to the table. Social applications extend the same language beyond the bar."], ["april-jean-02", "april-jean-05", "april-jean-09", "april-jean-03", "april-jean-07"])],
    outcome: "Completed brand identity, signage, menus and digital applications, 2024.",
  },
  "the-mark": {
    thesis: "A continuous light installation connects the lobby's arrival spaces.", fields: ["Spatial"],
    intro: "A looping line of light carries across black stone, vertical timber and pale terrazzo. The installation creates visual continuity between arrival, reception and seating, with a quieter material palette extending onto the terrace.",
    chapters: [chapter("From arrival to detail", ["The reception desk and seating sit within the larger light composition. The terrace shifts to pale paving, planting and small tables. An installation photograph records how the continuous line meets the wall surface."], ["the-mark-02", "the-mark-03", "the-mark-01"])],
    outcome: "Completed lobby and terrace, 2021. I developed concepts and design strategy with the Rapt team from early development through delivery.",
  },
  "club-gemini": {
    thesis: "An evening lounge within the Napa Leadership Retreat.", fields: ["Experiential", "Hospitality"], hero: "club-gemini-02", index: "club-gemini-02",
    intro: "Club Gemini was the evening lounge within the 2024 Napa Leadership Retreat. Violet light, velvet curtains and low seating establish a more intimate setting for gathering within the wider retreat program.",
    chapters: [chapter("Bring the room's atmosphere to the table", ["Dark florals, candlelight and printed menu cards carry the color direction into the details closest to guests. I led the design with the Rapt Studio team."], ["club-gemini-03", "club-gemini-01"])],
    outcome: "Completed evening lounge for the Napa Leadership Retreat, 2024.",
    related: {slug: "napa-retreat", text: "Explore the wider Napa Leadership Retreat"},
  },
  "napa-retreat": {
    thesis: "A Napa retreat expressed through textiles, print and the shared table.", fields: ["Experiential", "Hospitality"], hero: "napa-retreat-04", index: "napa-retreat-04",
    intro: "A multi-day leadership retreat in Napa Valley brought environments and printed materials into one gathering. Cream textiles, warm light, plants and seasonal table arrangements established the daytime setting. Club Gemini provided the evening lounge.",
    chapters: [chapter("Connect room and table", ["Draped fabric and planted plinths frame the rooms. Menus and printed materials extend the direction into the program, while botanical centerpieces give the shared table a distinct character."], ["napa-retreat-05", "napa-retreat-02", "napa-retreat-01"])],
    outcome: "Retreat environments, experience design and printed materials delivered in Napa Valley, 2024. My role was Senior Designer with the Rapt team.",
    related: {slug: "club-gemini", text: "See Club Gemini, the retreat's evening lounge"},
  },
  "place-at-table": {
    thesis: "A dinner shaped by what guests bring, share and do together.", fields: ["Experiential", "Hospitality"], hero: "place-at-table-07", index: "place-at-table-08",
    intro: "A long table creates a shared setting for a dinner. Carrying chairs, passing dishes and gathering around a cake become part of its character. I led the dinner concept and experience design with the Rapt Studio team.",
    chapters: [chapter("Leave room for the gathering to unfold", ["Patterned plates, green glassware, candles and small flowers give the table a consistent character. The sequence follows the guests, from taking a place to sharing the meal and the traces left afterward."], ["place-at-table-03", "place-at-table-08", "place-at-table-06", "place-at-table-01", "place-at-table-09"])],
    outcome: "Dinner experience delivered in 2024.",
  },
  "google-wsp": {
    thesis: "A former mall reimagined as 40-person team neighborhoods.", fields: ["Spatial"], status: "Unbuilt concept · concluded 2021",
    intro: "The proposed reuse of Westside Pavilion asked how a 540,000-square-foot workplace could feel personal. Team neighborhoods offered recognizable home bases within the large floor plate. The project concluded in 2021 after Google changed direction during the pandemic.",
    chapters: [
      chapter("Give the large floor plate a human scale", ["The existing mall and Nordstrom buildings framed the planning problem. Forty-person neighborhoods provide a repeatable structure, with components intended to adapt as team needs change."], ["wsp-building", "wsp-planning"]),
      chapter("Connect focus with shared activity", ["Distinct public and secure zones support different levels of access. A central activity floor and indoor-outdoor amenities connect individual neighborhoods with the wider campus, while concentrating noisier shared uses away from focused work."], ["wsp-anchor-cafe", "wsp-rideshare"]),
    ],
  },
};
