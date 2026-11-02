"use client";
export default function CookieSettings() {
  return <button className="footer-link cookie-settings" type="button" onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}>Cookie settings</button>;
}
