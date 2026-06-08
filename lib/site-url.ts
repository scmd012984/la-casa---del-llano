/** Canonical site URL for metadata, Open Graph, and JSON-LD. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://lacasadelallano.com";
