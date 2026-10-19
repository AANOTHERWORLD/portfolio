# Application attribution

The production Google tag is `G-Q5GJ7YP773`, configured once in `app/layout.tsx`.
GA4 already reads standard UTM parameters; no custom dimensions, second tag,
route listener, cookies, or attribution storage are required for these links.

## Links to paste into applications

| Application | Exact destination |
| --- | --- |
| DWP Creative Director | https://jamelwilliams.com/?utm_source=dwp&utm_medium=application&utm_campaign=dwp_creative_director |
| ASC Creative Design Director | https://jamelwilliams.com/?utm_source=asc&utm_medium=application&utm_campaign=asc_creative_design_director |

Use each complete URL as the hyperlink destination in the relevant application,
email, resume, or PDF. Visible link text can remain `jamelwilliams.com`.
These links identify the application, not an individual viewer. Forwarded links
retain the same campaign. No recipient names or email addresses belong in UTMs.

Generate the links with `node scripts/application-links.mjs`. To link an
application to an existing project instead, supply its canonical trailing-slash URL:

```sh
node scripts/application-links.mjs dwp https://jamelwilliams.com/work/
node --test scripts/application-links.test.mjs
```

## Redirects and navigation

Use the HTTPS, non-www, trailing-slash destination. GitHub Pages handles HTTP,
www, and slash normalization and preserves the query string. Do not introduce a
JavaScript redirect or strip UTMs before the Google tag reads the entry URL.

Internal Next.js links deliberately remain untagged. The entry page carries the
campaign; GA4 keeps session attribution as visitors browse clean URLs. Browser
Back restores the original tagged URL. Do not copy UTMs onto every internal link,
persist them across unrelated visits, or add manual `page_view` events alongside
Enhanced Measurement. The existing tag emits the initial page view; Enhanced
Measurement emits history-navigation page views.

Keep GA4 Admin > Data streams > Web stream > Enhanced measurement > Page views >
Page changes based on browser history events enabled. If switching to manual SPA
measurement in the future, disable automatic history measurement too:
`send_page_view: false` alone does not disable those automatic events.

## View attribution in GA4

1. Select the property containing web stream `G-Q5GJ7YP773`.
2. Open Reports > Acquisition > Traffic acquisition (navigation may be customized).
3. Change the table's primary dimension to **Session campaign** and select a date
   range including the application visits.
4. Search `dwp_creative_director` or `asc_creative_design_director`. Add
   **Session source / medium** to see `dwp / application` or `asc / application`.
5. Compare Sessions, Engaged sessions, and Average engagement time per session.

The custom medium `application` can appear in the default **Unassigned** channel;
use campaign/source/medium dimensions instead of the default channel group.
Use session dimensions rather than First user dimensions when checking a returning
visitor's application visit. Separate tests of different applications need fresh
browser sessions; another campaign click does not necessarily start a new session.
Allow time for standard reports to process visits. Realtime can check receipt sooner.
Ad blockers, consent restrictions, and stripped links can prevent attribution.

## Verification

The live-browser audit uses the real Google tag but intercepts analytics collection
and returns 204 locally, so it does not add QA visits to this property. It verifies
the entry URL, measurement ID, page-view counts, internal navigation, and Back.
Run with Playwright available and Microsoft Edge installed:

```sh
node scripts/audit-live-tracking.cjs
```

If Playwright is installed outside this checkout, set `PLAYWRIGHT_MODULE` to its
absolute package directory. This is an optional browser audit, not a production
dependency. Collection inspection proves browser-side behavior, not processed
data in the GA4 account; confirm the first real application visit in the report.

Official references:
- https://support.google.com/analytics/answer/12923437
- https://support.google.com/analytics/answer/11242870
- https://developers.google.com/analytics/devguides/collection/ga4/views
