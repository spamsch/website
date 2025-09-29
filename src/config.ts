// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Simon Pamies";
export const SITE_DESCRIPTION =
  "Cloud architect and product-minded CTO specializing in distributed systems, AI/ML, and venture building.";
export const TWITTER_HANDLE = "@spamies";
export const MY_NAME = "Simon Pamies";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
