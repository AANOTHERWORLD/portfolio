import { pathToFileURL } from 'node:url';

export const applications = Object.freeze({
  dwp: { source: 'dwp', campaign: 'dwp_creative_director' },
  asc: { source: 'asc', campaign: 'asc_creative_design_director' },
});

// Tag external entry links only. GA4 retains session attribution on internal navigation.
export function applicationLink(key, destination = 'https://jamelwilliams.com/') {
  const application = applications[key];
  if (!application) throw new Error(`Unknown application: ${key}. Use dwp or asc.`);
  const url = new URL(destination);
  if (url.origin !== 'https://jamelwilliams.com') {
    throw new Error('Application links must use https://jamelwilliams.com');
  }
  for (const name of [...url.searchParams.keys()]) {
    if (name.startsWith('utm_') || ['gclid', 'dclid', 'gbraid', 'wbraid'].includes(name)) {
      url.searchParams.delete(name);
    }
  }
  url.searchParams.set('utm_source', application.source);
  url.searchParams.set('utm_medium', 'application');
  url.searchParams.set('utm_campaign', application.campaign);
  return url.href;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const key = process.argv[2];
  if (key) console.log(applicationLink(key, process.argv[3]));
  else for (const name of Object.keys(applications)) console.log(`${name}: ${applicationLink(name)}`);
}
