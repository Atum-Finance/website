export const siteConfig = {
  name: "Atum Finance",
  shortName: "Atum",
  tagline: "The Protection Layer for Digital Assets.",
  description:
    "Atum turns sophisticated hedging into simple protection for crypto holders.",
  philosophy: "Options are infrastructure. Protection is the product.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? "",
  links: {
    app: process.env.NEXT_PUBLIC_APP_URL?.trim() ?? "",
    docs: process.env.NEXT_PUBLIC_DOCS_URL?.trim() ?? "",
    github: process.env.NEXT_PUBLIC_GITHUB_URL?.trim() ?? "",
    x: process.env.NEXT_PUBLIC_X_URL?.trim() ?? "",
    discord: process.env.NEXT_PUBLIC_DISCORD_URL?.trim() ?? "",
    telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL?.trim() ?? "",
    terms: process.env.NEXT_PUBLIC_TERMS_URL?.trim() ?? "",
    privacy: process.env.NEXT_PUBLIC_PRIVACY_URL?.trim() ?? "",
    governance: process.env.NEXT_PUBLIC_GOVERNANCE_URL?.trim() ?? "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
export type SiteLinkKey = keyof typeof siteConfig.links;
