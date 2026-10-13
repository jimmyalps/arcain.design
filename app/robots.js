// Servi sur /robots.txt.
const SITE = "https://arcain.design";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
