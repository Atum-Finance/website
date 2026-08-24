import type { Cta } from "@/types/content";
import { siteConfig } from "@/config/site";

export function resolveCtaHref(cta: Cta): string | undefined {
  if (cta.hrefKey === "hash") {
    return cta.hash;
  }

  if (cta.hrefKey === "app") {
    return siteConfig.links.app || undefined;
  }

  return siteConfig.links.docs || undefined;
}
