const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
  const { applications, applicationLink } = await import('./application-links.mjs');
  for (const key of Object.keys(applications)) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const events = [];
    // Inspect real Google tag payloads without sending test visits to the property.
    await context.route(/https:\/\/[^/]*google-analytics\.com\//, async route => {
      const request = route.request();
      const url = new URL(request.url());
      for (const line of (request.postData() || '').split('\n')) {
        const params = new URLSearchParams(url.search);
        for (const [key, value] of new URLSearchParams(line)) params.set(key, value);
        if (params.get('en')) events.push(Object.fromEntries(params));
      }
      await route.fulfill({status: 204});
    });
    const link = applicationLink(key);
    for (const entry of [link.replace('https:', 'http:'), link.replace('://jamel', '://www.jamel'), link.replace('/?', '/work?')]) {
      const response = await context.request.get(entry);
      assert.equal(response.status(), 200);
      assert.equal(new URL(response.url()).origin, 'https://jamelwilliams.com');
      assert.equal(new URL(response.url()).search, new URL(link).search);
      assert.ok(new URL(response.url()).pathname.endsWith('/'));
      console.log(JSON.stringify({application: key, stage: 'redirect', entry, finalUrl: response.url()}));
    }
    const report = stage => console.log(JSON.stringify({application: key, stage, finalUrl: page.url(),
      pageViews: events.filter(e => e.en === 'page_view').map(e => ({measurementId: e.tid, location: e.dl, referrer: e.dr}))}));
    await page.goto(link, {waitUntil: 'domcontentloaded', timeout: 60000});
    await page.waitForTimeout(6500);
    report('landing');
    assert.equal(new URL(page.url()).search, new URL(link).search);
    assert.equal(events.filter(e => e.en === 'page_view').length, 1);
    assert.equal(events.find(e => e.en === 'page_view').tid, 'G-Q5GJ7YP773');
    assert.equal(new URL(events.find(e => e.en === 'page_view').dl).search, new URL(link).search);
    await page.locator('main a[href="/work/"]').first().click();
    await page.waitForTimeout(6500);
    report('navigation');
    assert.equal(new URL(page.url()).pathname, '/work/');
    assert.equal(events.filter(e => e.en === 'page_view').length, 2);
    await page.goBack();
    await page.waitForTimeout(6500);
    assert.equal(events.filter(e => e.en === 'page_view').length, 3);
    assert.equal(new URL(page.url()).search, new URL(link).search);
    const views = events.filter(e => e.en === 'page_view');
    assert.equal(new Set(views.map(e => e.sid)).size, 1, 'navigation must keep the same session');
    assert.equal(views[1].dr, link);
    assert.equal(views[1].dl, 'https://jamelwilliams.com/work/');
    report('back');
    await context.close();
  }
  } finally {
    await browser.close();
  }
})().catch(error => {console.error(error); process.exit(1);});
